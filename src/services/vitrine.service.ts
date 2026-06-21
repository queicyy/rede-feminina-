import { collection, getDocs, addDoc, deleteDoc, updateDoc, doc, orderBy, query } from "firebase/firestore";
import { firestore } from "../firebase/firebase";
import { IVitrineItem } from "../types/vitrine.types";

export const vitrineService = {
  getItems: async (): Promise<IVitrineItem[]> => {
    try {
      const vitrineCollection = collection(firestore, "vitrine");
      const q = query(vitrineCollection, orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);
      const items: IVitrineItem[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as IVitrineItem[];
      return items;
    } catch (error) {
      console.error("Erro ao buscar itens da vitrine:", error);
      throw new Error("Falha ao buscar itens da vitrine");
    }
  },

  createItem: async (item: IVitrineItem): Promise<IVitrineItem> => {
    try {
      const vitrineCollection = collection(firestore, "vitrine");
      const docRef = await addDoc(vitrineCollection, {
        ...item,
        createdAt: new Date().toISOString(),
      });
      return { id: docRef.id, ...item };
    } catch (error) {
      console.error("Erro ao criar item da vitrine:", error);
      throw new Error("Falha ao criar item da vitrine");
    }
  },

  updateItem: async (id: string, item: Partial<IVitrineItem>): Promise<void> => {
    try {
      const itemDoc = doc(firestore, "vitrine", id);
      const { id: _ignoreId, ...dataToUpdate } = item as IVitrineItem;
      await updateDoc(itemDoc, { ...dataToUpdate });
    } catch (error) {
      console.error("Erro ao atualizar item da vitrine:", error);
      throw new Error("Falha ao atualizar item da vitrine");
    }
  },

  deleteItem: async (id: string): Promise<void> => {
    try {
      const itemDoc = doc(firestore, "vitrine", id);
      await deleteDoc(itemDoc);
    } catch (error) {
      console.error("Erro ao deletar item da vitrine:", error);
      throw new Error("Falha ao deletar item da vitrine");
    }
  },
};