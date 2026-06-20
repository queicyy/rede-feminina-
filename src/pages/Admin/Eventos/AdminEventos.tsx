import React, { useEffect, useState } from "react";
import styled from "styled-components";
import AppLayout from "../../../components/appLayout";
import { useHistory } from "react-router-dom";
import useEventos from "../../../hooks/useEventos";
import { IEvento } from "../../../types/eventos.types";

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
  min-height: 80px;
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
  &:hover {
    background: #c2185b;
  }
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const EventoCard = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  margin-bottom: 12px;
`;

const EventoImage = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 8px;
  object-fit: cover;
  background: #ffcbdb;
  flex-shrink: 0;
`;

const EventoInfo = styled.div`
  flex: 1;
`;

const EventoTitulo = styled.h3`
  font-size: 14px;
  font-weight: 700;
  color: #222;
  margin: 0 0 4px 0;
`;

const EventoMeta = styled.p`
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

const AdminEventos: React.FC = () => {
  const history = useHistory();
  const { getAllEventos, createEvento, updateEvento, deleteEvento } = useEventos();

  const [eventos, setEventos] = useState<IEvento[]>([]);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ msg: string; success: boolean } | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);

  const emptyForm: IEvento = {
    titulo: "",
    data: "",
    horario: "",
    local: "",
    endereco: "",
    preco: "",
    descricao: "",
    imageUrl: "",
  };

  const [form, setForm] = useState<IEvento>(emptyForm);

  useEffect(() => {
    fetchEventos();
  }, []);

  const fetchEventos = async () => {
    try {
      const data = await getAllEventos();
      setEventos(data);
    } catch {
      showToast("Erro ao carregar eventos", false);
    }
  };

  const showToast = (msg: string, success: boolean) => {
    setToast({ msg, success });
    setTimeout(() => setToast(null), 3000);
  };

  const handleChange = (field: keyof IEvento, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleEditClick = (evento: IEvento) => {
    setEditingId(evento.id!);
    setForm({
      titulo: evento.titulo || "",
      data: evento.data || "",
      horario: evento.horario || "",
      local: evento.local || "",
      endereco: evento.endereco || "",
      preco: evento.preco || "",
      descricao: evento.descricao || "",
      imageUrl: evento.imageUrl || "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setForm(emptyForm);
  };

  const handleSave = async () => {
    if (!form.titulo || !form.data || !form.local) {
      showToast("Preencha título, data e local!", false);
      return;
    }
    setLoading(true);
    try {
      if (editingId) {
        await updateEvento(editingId, form);
        showToast("Evento atualizado com sucesso!", true);
      } else {
        await createEvento(form);
        showToast("Evento criado com sucesso!", true);
      }
      setEditingId(null);
      setForm(emptyForm);
      fetchEventos();
    } catch {
      showToast(editingId ? "Erro ao atualizar evento" : "Erro ao criar evento", false);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Tem certeza que deseja excluir este evento?")) return;
    try {
      await deleteEvento(id);
      showToast("Evento excluído!", true);
      if (editingId === id) handleCancelEdit();
      fetchEventos();
    } catch {
      showToast("Erro ao excluir evento", false);
    }
  };

  return (
    <AppLayout title="Admin — Eventos" history={history}>
      <Container>
        <Title>{editingId ? "Editar Evento" : "Gerenciar Eventos"}</Title>
        <Form>
          <Input placeholder="Título do evento *" value={form.titulo} onChange={(e) => handleChange("titulo", e.target.value)} />
          <Input placeholder="Data * (ex: 23 de Maio de 2026)" value={form.data} onChange={(e) => handleChange("data", e.target.value)} />
          <Input placeholder="Horário (ex: 15h30)" value={form.horario} onChange={(e) => handleChange("horario", e.target.value)} />
          <Input placeholder="Local *" value={form.local} onChange={(e) => handleChange("local", e.target.value)} />
          <Input placeholder="Endereço" value={form.endereco} onChange={(e) => handleChange("endereco", e.target.value)} />
          <Input placeholder="Preço (ex: R$ 120,00)" value={form.preco} onChange={(e) => handleChange("preco", e.target.value)} />
          <Input placeholder="URL da imagem" value={form.imageUrl} onChange={(e) => handleChange("imageUrl", e.target.value)} />
          <Textarea placeholder="Descrição do evento" value={form.descricao} onChange={(e) => handleChange("descricao", e.target.value)} />
          <Button onClick={handleSave} disabled={loading}>
            {loading ? "Salvando..." : editingId ? "Atualizar Evento" : "Salvar Evento"}
          </Button>
          {editingId && (
            <Button type="button" onClick={handleCancelEdit} style={{ background: "#999" }}>
              Cancelar Edição
            </Button>
          )}
        </Form>
        <Divider />
        <SectionTitle>Eventos Cadastrados ({eventos.length})</SectionTitle>
        {eventos.length === 0 ? (
          <p style={{ color: "#999", fontSize: "14px" }}>Nenhum evento cadastrado ainda.</p>
        ) : (
          eventos.map((evento) => (
            <EventoCard key={evento.id}>
              <EventoImage src={evento.imageUrl || "/assets/images/logo_rfcc.png"} alt={evento.titulo} onError={(e) => { (e.target as HTMLImageElement).src = "/assets/images/logo_rfcc.png"; }} />
              <EventoInfo>
                <EventoTitulo>{evento.titulo}</EventoTitulo>
                <EventoMeta>{evento.data} {evento.horario && `• ${evento.horario}`}</EventoMeta>
                <EventoMeta>{evento.local}</EventoMeta>
                {evento.preco && <EventoMeta style={{ color: "#d81b60", fontWeight: 600 }}>{evento.preco}</EventoMeta>}
              </EventoInfo>
              <EditButton onClick={() => handleEditClick(evento)}>✏️</EditButton>
              <DeleteButton onClick={() => handleDelete(evento.id!)}>🗑️</DeleteButton>
            </EventoCard>
          ))
        )}
      </Container>
      {toast && <Toast success={toast.success}>{toast.msg}</Toast>}
    </AppLayout>
  );
};

export default AdminEventos;