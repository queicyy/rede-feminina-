import React, { useEffect, useState } from "react";
import styled from "styled-components";
import AppLayout from "../../../components/appLayout";
import { useHistory } from "react-router-dom";
import { collection, addDoc, deleteDoc, doc, getDocs, orderBy, query } from "firebase/firestore";
import { firestore } from "../../../firebase/firebase";
import { INews } from "../../../types/noticias.types";

/* ── Styled Components ── */
const Container = styled.div`
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
`;

const Title = styled.h2`
  font-size: 20px;
  font-weight: 700;
  color: #b8005c;
  margin-bottom: 24px;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 32px;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #ddd;
  border-radius: 10px;
  font-size: 14px;
  outline: none;
  box-sizing: border-box;
  &:focus {
    border-color: #d81b60;
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #ddd;
  border-radius: 10px;
  font-size: 14px;
  outline: none;
  resize: vertical;
  min-height: 100px;
  box-sizing: border-box;
  font-family: inherit;
  &:focus {
    border-color: #d81b60;
  }
`;

const Button = styled.button`
  background: #d81b60;
  color: white;
  border: none;
  padding: 14px;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  transition: 0.2s;
  &:hover { background: #c2185b; }
  &:disabled { opacity: 0.6; cursor: not-allowed; }
`;

const NewsCard = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 14px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  margin-bottom: 12px;
`;

const NewsInfo = styled.div`
  flex: 1;
`;

const NewsTitulo = styled.h3`
  font-size: 14px;
  font-weight: 700;
  color: #222;
  margin: 0 0 4px 0;
`;

const NewsMeta = styled.p`
  font-size: 12px;
  color: #666;
  margin: 0;
`;

const DeleteButton = styled.button`
  background: none;
  border: none;
  color: #d81b60;
  font-size: 20px;
  cursor: pointer;
  padding: 4px;
`;

const Toast = styled.div<{ success?: boolean }>`
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background: ${(p) => (p.success ? "#4caf50" : "#d81b60")};
  color: white;
  padding: 12px 24px;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
  z-index: 999;
`;

const SectionTitle = styled.h3`
  font-size: 16px;
  font-weight: 700;
  color: #333;
  margin-bottom: 12px;
`;

const Divider = styled.div`
  height: 1px;
  background: #eee;
  margin: 24px 0;
`;

/* ── Componente ── */
const AdminNoticias: React.FC = () => {
  const history = useHistory();
  const [noticias, setNoticias] = useState<INews[]>([]);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ msg: string; success: boolean } | null>(null);

  const [form, setForm] = useState({
    title: "",
    date: "",
    content: "",
    imageUrl: "",
  });

  useEffect(() => {
    fetchNoticias();
  }, []);

  const fetchNoticias = async () => {
    try {
      const noticiasCollection = collection(firestore, "noticias");
      const snapshot = await getDocs(noticiasCollection);
      const data: INews[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as INews[];
      setNoticias(data);
    } catch {
      showToast("Erro ao carregar notícias", false);
    }
  };

  const showToast = (msg: string, success: boolean) => {
    setToast({ msg, success });
    setTimeout(() => setToast(null), 3000);
  };

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    if (!form.title || !form.date || !form.content) {
      showToast("Preencha título, data e conteúdo!", false);
      return;
    }
    setLoading(true);
    try {
      await addDoc(collection(firestore, "noticias"), {
        ...form,
        createdAt: new Date().toISOString(),
      });
      showToast("Notícia criada com sucesso!", true);
      setForm({ title: "", date: "", content: "", imageUrl: "" });
      fetchNoticias();
    } catch {
      showToast("Erro ao criar notícia", false);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Tem certeza que deseja excluir esta notícia?")) return;
    try {
      await deleteDoc(doc(firestore, "noticias", id));
      showToast("Notícia excluída!", true);
      fetchNoticias();
    } catch {
      showToast("Erro ao excluir notícia", false);
    }
  };

  return (
    <AppLayout title="Admin — Notícias" history={history}>
      <Container>
        <Title>Gerenciar Notícias</Title>

        <Form>
          <Input
            placeholder="Título da notícia *"
            value={form.title}
            onChange={(e) => handleChange("title", e.target.value)}
          />
          <Input
            placeholder="Data * (ex: 08 de Junho de 2025)"
            value={form.date}
            onChange={(e) => handleChange("date", e.target.value)}
          />
          <Input
            placeholder="URL da imagem (opcional)"
            value={form.imageUrl}
            onChange={(e) => handleChange("imageUrl", e.target.value)}
          />
          <Textarea
            placeholder="Conteúdo da notícia *"
            value={form.content}
            onChange={(e) => handleChange("content", e.target.value)}
          />
          <Button onClick={handleSave} disabled={loading}>
            {loading ? "Salvando..." : "Salvar Notícia"}
          </Button>
        </Form>

        <Divider />

        <SectionTitle>Notícias Cadastradas ({noticias.length})</SectionTitle>

        {noticias.length === 0 ? (
          <p style={{ color: "#999", fontSize: "14px" }}>Nenhuma notícia cadastrada ainda.</p>
        ) : (
          noticias.map((noticia) => (
            <NewsCard key={noticia.id}>
              <NewsInfo>
                <NewsTitulo>{noticia.title}</NewsTitulo>
                <NewsMeta>{noticia.date}</NewsMeta>
              </NewsInfo>
              <DeleteButton onClick={() => handleDelete(noticia.id!)}>🗑️</DeleteButton>
            </NewsCard>
          ))
        )}
      </Container>

      {toast && <Toast success={toast.success}>{toast.msg}</Toast>}
    </AppLayout>
  );
};

export default AdminNoticias;