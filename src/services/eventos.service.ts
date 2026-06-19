import { collection, getDocs, addDoc, deleteDoc, doc, orderBy, query } from "firebase/firestore";
import { firestore } from "../firebase/firebase";
import { IEvento } from "../types/eventos.types";

export const eventosService = {
  getEventos: async (): Promise<IEvento[]> => {
    try {
      const eventosCollection = collection(firestore, "eventos");
      const q = query(eventosCollection, orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);
      const eventos: IEvento[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as IEvento[];
      return eventos;
    } catch (error) {
      console.error("Erro ao buscar eventos:", error);
      throw new Error("Falha ao buscar eventos");
    }
  },

  createEvento: async (evento: IEvento): Promise<IEvento> => {
    try {
      const eventosCollection = collection(firestore, "eventos");
      const docRef = await addDoc(eventosCollection, {
        ...evento,
        createdAt: new Date().toISOString(),
      });
      return { id: docRef.id, ...evento };
    } catch (error) {
      console.error("Erro ao criar evento:", error);
      throw new Error("Falha ao criar evento");
    }
  },

  deleteEvento: async (id: string): Promise<void> => {
    try {
      const eventoDoc = doc(firestore, "eventos", id);
      await deleteDoc(eventoDoc);
    } catch (error) {
      console.error("Erro ao deletar evento:", error);
      throw new Error("Falha ao deletar evento");
    }
  },
};
