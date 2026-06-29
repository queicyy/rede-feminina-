import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import AppLayout from "../../../components/appLayout";
import { useHistory } from "react-router-dom";
import useNoticias from "../../../hooks/useNoticias";
import { imgbbService } from "../../../services/imgbb.service";
import MarkdownEditor from "../../../components/common/MarkdownEditor";
import { INews } from "../../../types/noticias.types";

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

const PhotoPicker = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  padding: 24px;
  border: 2px dashed #d81b60;
  border-radius: 10px;
  background: #fdeef4;
  color: #b8005c;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const PhotoPreview = styled.img`
  width: 100%;
  max-height: 220px;
  object-fit: contain;
  background: #f4f4f4;
  border-radius: 10px;
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
  align-items: center;
  gap: 12px;
  padding: 14px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  margin-bottom: 12px;
`;

const NewsImage = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 8px;
  object-fit: cover;
  background: #ffcbdb;
  flex-shrink: 0;
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

const EditButton = styled.button`
  background: none;
  border: none;
  color: #555;
  font-size: 18px;
  cursor: pointer;
  padding: 4px;
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

const AdminNoticias: React.FC = () => {
  const history = useHistory();
  const { allNews, createNoticia, updateNoticia, deleteNoticia } = useNoticias();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [noticias, setNoticias] = useState<INews[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [toast, setToast] = useState<{ msg: string; success: boolean } | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string>("");

  const emptyForm: INews = {
    title: "",
    date: "",
    content: "",
    imageUrl: "",
  };

  const [form, setForm] = useState<INews>(emptyForm);

  useEffect(() => {
    fetchNoticias();
  }, []);

  const fetchNoticias = async () => {
    try {
      const data = await allNews();
      setNoticias(data);
    } catch {
      showToast("Erro ao carregar notícias", false);
    }
  };

  const showToast = (msg: string, success: boolean) => {
    setToast({ msg, success });
    setTimeout(() => setToast(null), 3000);
  };

  const handleChange = (field: keyof INews, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handlePhotoSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setPhotoPreview(URL.createObjectURL(file));
    setUploadingPhoto(true);
    try {
      const url = await imgbbService.uploadImage(file);
      setForm((prev) => ({ ...prev, imageUrl: url }));
      showToast("Foto enviada com sucesso!", true);
    } catch {
      showToast("Erro ao enviar a foto. Tente novamente.", false);
      setPhotoPreview("");
    } finally {
      setUploadingPhoto(false);
    }
  };

  const handleEditClick = (noticia: INews) => {
    setEditingId(noticia.id!);
    setForm({
      title: noticia.title || "",
      date: noticia.date || "",
      content: noticia.content || "",
      imageUrl: noticia.imageUrl || "",
    });
    setPhotoPreview(noticia.imageUrl || "");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setForm(emptyForm);
    setPhotoPreview("");
  };

  const handleSave = async () => {
    if (!form.title || !form.date || !form.content) {
      showToast("Preencha título, data e conteúdo!", false);
      return;
    }
    setLoading(true);
    try {
      if (editingId) {
        await updateNoticia(editingId, form);
        showToast("Notícia atualizada com sucesso!", true);
      } else {
        await createNoticia(form);
        showToast("Notícia criada com sucesso!", true);
      }
      setEditingId(null);
      setForm(emptyForm);
      setPhotoPreview("");
      fetchNoticias();
    } catch {
      showToast(editingId ? "Erro ao atualizar notícia" : "Erro ao criar notícia", false);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Tem certeza que deseja excluir esta notícia?")) return;
    try {
      await deleteNoticia(id);
      showToast("Notícia excluída!", true);
      if (editingId === id) handleCancelEdit();
      fetchNoticias();
    } catch {
      showToast("Erro ao excluir notícia", false);
    }
  };

  return (
    <AppLayout title="Admin — Notícias" history={history}>
      <Container>
        <Title>{editingId ? "Editar Notícia" : "Gerenciar Notícias"}</Title>

        <Form>
          <Input
            placeholder="Título da notícia *"
            value={form.title}
            onChange={(e) => handleChange("title", e.target.value)}
          />
          <Input
            placeholder="Data * (ex: 08 de Junho de 2026)"
            value={form.date}
            onChange={(e) => handleChange("date", e.target.value)}
          />

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            style={{
              position: "absolute",
              width: "1px",
              height: "1px",
              opacity: 0,
              overflow: "hidden",
              zIndex: -1
            }}
            onChange={handlePhotoSelect}
          />

          {photoPreview ? <PhotoPreview src={photoPreview} alt="Pré-visualização" /> : null}

          <PhotoPicker type="button" onClick={() => fileInputRef.current?.click()} disabled={uploadingPhoto}>
            {uploadingPhoto ? "Enviando foto..." : photoPreview ? "Trocar foto" : "Selecionar foto (opcional)"}
          </PhotoPicker>

          <MarkdownEditor
            value={form.content}
            onChange={(value) => handleChange("content", value)}
            placeholder="Conteúdo da notícia *"
          />

          <Button onClick={handleSave} disabled={loading || uploadingPhoto}>
            {loading ? "Salvando..." : editingId ? "Atualizar Notícia" : "Salvar Notícia"}
          </Button>
          {editingId && (
            <Button type="button" onClick={handleCancelEdit} style={{ background: "#999" }}>
              Cancelar Edição
            </Button>
          )}
        </Form>

        <Divider />

        <SectionTitle>Notícias Cadastradas ({noticias.length})</SectionTitle>

        {noticias.length === 0 ? (
          <p style={{ color: "#999", fontSize: "14px" }}>Nenhuma notícia cadastrada ainda.</p>
        ) : (
          noticias.map((noticia) => (
            <NewsCard key={noticia.id}>
              <NewsImage
                src={noticia.imageUrl || "/assets/images/logo_rfcc.png"}
                alt={noticia.title}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/assets/images/logo_rfcc.png";
                }}
              />
              <NewsInfo>
                <NewsTitulo>{noticia.title}</NewsTitulo>
                <NewsMeta>{noticia.date}</NewsMeta>
              </NewsInfo>
              <EditButton onClick={() => handleEditClick(noticia)}>✏️</EditButton>
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