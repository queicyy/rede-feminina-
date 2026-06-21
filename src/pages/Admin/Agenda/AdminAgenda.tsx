import React, { useEffect, useState } from "react";
import styled from "styled-components";
import AppLayout from "../../../components/appLayout";
import { useHistory } from "react-router-dom";
import useAgenda from "../../../hooks/useAgenda";
import { IAgendaItem } from "../../../types/agenda.types";

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

const ItemCard = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  margin-bottom: 12px;
`;

const ItemInfo = styled.div`
  flex: 1;
`;

const ItemTitulo = styled.h3`
  font-size: 14px;
  font-weight: 700;
  color: #222;
  margin: 0 0 4px 0;
`;

const ItemMeta = styled.p`
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
const AdminAgenda: React.FC = () => {
    const history = useHistory();
    const { getAllItems, createItem, updateItem, deleteItem } = useAgenda();
  
    const [items, setItems] = useState<IAgendaItem[]>([]);
    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState<{ msg: string; success: boolean } | null>(null);
    const [editingId, setEditingId] = useState<string | null>(null);
  
    const emptyForm: IAgendaItem = {
      titulo: "",
      data: "",
      horario: "",
      local: "",
      descricao: "",
    };
  
    const [form, setForm] = useState<IAgendaItem>(emptyForm);
  
    useEffect(() => {
      fetchItems();
    }, []);
  
    const fetchItems = async () => {
      try {
        const data = await getAllItems();
        setItems(data);
      } catch {
        showToast("Erro ao carregar a agenda", false);
      }
    };
  
    const showToast = (msg: string, success: boolean) => {
      setToast({ msg, success });
      setTimeout(() => setToast(null), 3000);
    };
  
    const handleChange = (field: keyof IAgendaItem, value: string) => {
      setForm((prev) => ({ ...prev, [field]: value }));
    };
  
    const handleEditClick = (item: IAgendaItem) => {
      setEditingId(item.id!);
      setForm({
        titulo: item.titulo || "",
        data: item.data || "",
        horario: item.horario || "",
        local: item.local || "",
        descricao: item.descricao || "",
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
          await updateItem(editingId, form);
          showToast("Item atualizado com sucesso!", true);
        } else {
          await createItem(form);
          showToast("Item criado com sucesso!", true);
        }
        setEditingId(null);
        setForm(emptyForm);
        fetchItems();
      } catch {
        showToast(editingId ? "Erro ao atualizar item" : "Erro ao criar item", false);
      } finally {
        setLoading(false);
      }
    };
  
    const handleDelete = async (id: string) => {
      if (!window.confirm("Tem certeza que deseja excluir este item da agenda?")) return;
      try {
        await deleteItem(id);
        showToast("Item excluído!", true);
        if (editingId === id) handleCancelEdit();
        fetchItems();
      } catch {
        showToast("Erro ao excluir item", false);
      }
    };
  
    return (
      <AppLayout title="Admin — Agenda da Rede" history={history}>
        <Container>
          <Title>{editingId ? "Editar Item da Agenda" : "Gerenciar Agenda da Rede"}</Title>
          <Form>
            <Input placeholder="Título *" value={form.titulo} onChange={(e) => handleChange("titulo", e.target.value)} />
            <Input placeholder="Data * (ex: Sábado, 13 de Junho)" value={form.data} onChange={(e) => handleChange("data", e.target.value)} />
            <Input placeholder="Horário (ex: 09h às 14h)" value={form.horario} onChange={(e) => handleChange("horario", e.target.value)} />
            <Input placeholder="Local *" value={form.local} onChange={(e) => handleChange("local", e.target.value)} />
            <Textarea placeholder="Descrição" value={form.descricao} onChange={(e) => handleChange("descricao", e.target.value)} />
            <Button onClick={handleSave} disabled={loading}>
              {loading ? "Salvando..." : editingId ? "Atualizar Item" : "Salvar Item"}
            </Button>
            {editingId && (
              <Button type="button" onClick={handleCancelEdit} style={{ background: "#999" }}>
                Cancelar Edição
              </Button>
            )}
          </Form>
          <Divider />
          <SectionTitle>Itens da Agenda ({items.length})</SectionTitle>
          {items.length === 0 ? (
            <p style={{ color: "#999", fontSize: "14px" }}>Nenhum item cadastrado ainda.</p>
          ) : (
            items.map((item) => (
              <ItemCard key={item.id}>
                <ItemInfo>
                  <ItemTitulo>{item.titulo}</ItemTitulo>
                  <ItemMeta>{item.data} {item.horario && `• ${item.horario}`}</ItemMeta>
                  <ItemMeta>{item.local}</ItemMeta>
                </ItemInfo>
                <EditButton onClick={() => handleEditClick(item)}>✏️</EditButton>
                <DeleteButton onClick={() => handleDelete(item.id!)}>🗑️</DeleteButton>
              </ItemCard>
            ))
          )}
        </Container>
        {toast && <Toast success={toast.success}>{toast.msg}</Toast>}
      </AppLayout>
    );
  };
  
  export default AdminAgenda;