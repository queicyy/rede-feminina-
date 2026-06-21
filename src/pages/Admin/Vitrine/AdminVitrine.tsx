import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import AppLayout from "../../../components/appLayout";
import { useHistory } from "react-router-dom";
import useVitrine from "../../../hooks/useVitrine";
import { imgbbService } from "../../../services/imgbb.service";
import { IVitrineItem, VitrineCategory } from "../../../types/vitrine.types";

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

const Select = styled.select`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #ddd;
  border-radius: 10px;
  font-size: 14px;
  outline: none;
  box-sizing: border-box;
  background: white;
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
  &:hover {
    background: #c2185b;
  }
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const Tabs = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
`;

const Tab = styled.button<{ active: boolean }>`
  flex: 1;
  padding: 10px;
  border-radius: 10px;
  border: 1px solid #d81b60;
  background: ${(p) => (p.active ? "#d81b60" : "white")};
  color: ${(p) => (p.active ? "white" : "#d81b60")};
  font-weight: 700;
  font-size: 13px;
  cursor: pointer;
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

const ItemImage = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 8px;
  object-fit: cover;
  background: #ffcbdb;
  flex-shrink: 0;
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

const categoryLabel: Record<VitrineCategory, string> = {
  bazar: "Bazar Chic",
  artesanato: "Artesanato",
};
const AdminVitrine: React.FC = () => {
    const history = useHistory();
    const { getAllItems, createItem, updateItem, deleteItem } = useVitrine();
    const fileInputRef = useRef<HTMLInputElement>(null);
  
    const [items, setItems] = useState<IVitrineItem[]>([]);
    const [loading, setLoading] = useState(false);
    const [uploadingPhoto, setUploadingPhoto] = useState(false);
    const [toast, setToast] = useState<{ msg: string; success: boolean } | null>(null);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<VitrineCategory>("bazar");
    const [photoPreview, setPhotoPreview] = useState<string>("");
  
    const emptyForm: IVitrineItem = {
      title: "",
      description: "",
      price: 0,
      imageUrl: "",
      category: "bazar",
    };
  
    const [form, setForm] = useState<IVitrineItem>(emptyForm);
  
    useEffect(() => {
      fetchItems();
    }, []);
  
    const fetchItems = async () => {
      try {
        const data = await getAllItems();
        setItems(data);
      } catch {
        showToast("Erro ao carregar itens", false);
      }
    };
  
    const showToast = (msg: string, success: boolean) => {
      setToast({ msg, success });
      setTimeout(() => setToast(null), 3000);
    };
  
    const handleChange = (field: keyof IVitrineItem, value: string | number) => {
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
  
    const handleEditClick = (item: IVitrineItem) => {
      setEditingId(item.id!);
      setForm({
        title: item.title || "",
        description: item.description || "",
        price: item.price || 0,
        imageUrl: item.imageUrl || "",
        category: item.category || "bazar",
      });
      setPhotoPreview(item.imageUrl || "");
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
  
    const handleCancelEdit = () => {
      setEditingId(null);
      setForm(emptyForm);
      setPhotoPreview("");
    };
  
    const handleSave = async () => {
      if (!form.title || !form.price || !form.imageUrl) {
        showToast("Preencha título, preço e selecione uma foto!", false);
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
        setPhotoPreview("");
        fetchItems();
      } catch {
        showToast(editingId ? "Erro ao atualizar item" : "Erro ao criar item", false);
      } finally {
        setLoading(false);
      }
    };
  
    const handleDelete = async (id: string) => {
      if (!window.confirm("Tem certeza que deseja excluir este item?")) return;
      try {
        await deleteItem(id);
        showToast("Item excluído!", true);
        if (editingId === id) handleCancelEdit();
        fetchItems();
      } catch {
        showToast("Erro ao excluir item", false);
      }
    };
  
    const filteredItems = items.filter((item) => item.category === activeTab);
    return (
        <AppLayout title="Admin — Bazar Chic e Artesanato" history={history}>
          <Container>
            <Title>{editingId ? "Editar Item" : "Gerenciar Bazar Chic e Artesanato"}</Title>
            <Form>
              <Select value={form.category} onChange={(e) => handleChange("category", e.target.value as VitrineCategory)}>
                <option value="bazar">Bazar Chic</option>
                <option value="artesanato">Artesanato</option>
              </Select>
    
              <Input placeholder="Título do item *" value={form.title} onChange={(e) => handleChange("title", e.target.value)} />
              <Input
                placeholder="Preço (ex: 45.00) *"
                type="number"
                step="0.01"
                value={form.price || ""}
                onChange={(e) => handleChange("price", parseFloat(e.target.value) || 0)}
              />
              <Textarea
                placeholder="Descrição do item"
                value={form.description}
                onChange={(e) => handleChange("description", e.target.value)}
              />
    
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handlePhotoSelect}
              />
    
              {photoPreview ? (
                <PhotoPreview src={photoPreview} alt="Pré-visualização" />
              ) : null}
    
              <PhotoPicker type="button" onClick={() => fileInputRef.current?.click()} disabled={uploadingPhoto}>
                {uploadingPhoto ? "Enviando foto..." : photoPreview ? "Trocar foto" : "Selecionar foto *"}
              </PhotoPicker>
    
              <Button onClick={handleSave} disabled={loading || uploadingPhoto}>
                {loading ? "Salvando..." : editingId ? "Atualizar Item" : "Salvar Item"}
              </Button>
              {editingId && (
                <Button type="button" onClick={handleCancelEdit} style={{ background: "#999" }}>
                  Cancelar Edição
                </Button>
              )}
            </Form>
    
            <Divider />
    
            <Tabs>
              <Tab active={activeTab === "bazar"} onClick={() => setActiveTab("bazar")}>
                Bazar Chic ({items.filter((i) => i.category === "bazar").length})
              </Tab>
              <Tab active={activeTab === "artesanato"} onClick={() => setActiveTab("artesanato")}>
                Artesanato ({items.filter((i) => i.category === "artesanato").length})
              </Tab>
            </Tabs>
    
            <SectionTitle>{categoryLabel[activeTab]} cadastrados</SectionTitle>
            {filteredItems.length === 0 ? (
              <p style={{ color: "#999", fontSize: "14px" }}>Nenhum item cadastrado nessa categoria ainda.</p>
            ) : (
              filteredItems.map((item) => (
                <ItemCard key={item.id}>
                  <ItemImage src={item.imageUrl} alt={item.title} />
                  <ItemInfo>
                    <ItemTitulo>{item.title}</ItemTitulo>
                    <ItemMeta style={{ color: "#d81b60", fontWeight: 600 }}>
                      R$ {item.price.toFixed(2).replace(".", ",")}
                    </ItemMeta>
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
    
    export default AdminVitrine;