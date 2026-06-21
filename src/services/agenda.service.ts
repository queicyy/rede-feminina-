import { collection, getDocs, addDoc, deleteDoc, updateDoc, doc, orderBy, query } from "firebase/firestore";
import { firestore } from "../firebase/firebase";
import { IAgendaItem } from "../types/agenda.types";

export const agendaService = {
  getItems: async (): Promise<IAgendaItem[]> => {
    try {
      const agendaCollection = collection(firestore, "agenda");
      const q = query(agendaCollection, orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);
      const items: IAgendaItem[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as IAgendaItem[];
      return items;
    } catch (error) {
      console.error("Erro ao buscar itens da agenda:", error);
      throw new Error("Falha ao buscar itens da agenda");
    }
  },

  createItem: async (item: IAgendaItem): Promise<IAgendaItem> => {
    try {
      const agendaCollection = collection(firestore, "agenda");
      const docRef = await addDoc(agendaCollection, {
        ...item,
        createdAt: new Date().toISOString(),
      });
      return { id: docRef.id, ...item };
    } catch (error) {
      console.error("Erro ao criar item da agenda:", error);
      throw new Error("Falha ao criar item da agenda");
    }
  },

  updateItem: async (id: string, item: Partial<IAgendaItem>): Promise<void> => {
    try {
      const itemDoc = doc(firestore, "agenda", id);
      const { id: _ignoreId, ...dataToUpdate } = item as IAgendaItem;
      await updateDoc(itemDoc, { ...dataToUpdate });
    } catch (error) {
      console.error("Erro ao atualizar item da agenda:", error);
      throw new Error("Falha ao atualizar item da agenda");
    }
  },

  deleteItem: async (id: string): Promise<void> => {
    try {
      const itemDoc = doc(firestore, "agenda", id);
      await deleteDoc(itemDoc);
    } catch (error) {
      console.error("Erro ao deletar item da agenda:", error);
      throw new Error("Falha ao deletar item da agenda");
    }
  },
};