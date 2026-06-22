import { collection, getDocs, addDoc, deleteDoc, updateDoc, doc, orderBy, query } from "firebase/firestore";
import { firestore } from "../firebase/firebase";
import { INews } from "../types/noticias.types";

export const noticiesService = {
  getNoticies: async (): Promise<INews[]> => {
    try {
      const newsCollection = collection(firestore, "noticias");
      const q = query(newsCollection, orderBy("createdAt", "desc"));
      const newsSnapshot = await getDocs(q);
      const newsList: INews[] = newsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as INews[];
      return newsList;
    } catch (error) {
      console.error("Error fetching news:", error);
      throw new Error("Failed to fetch news");
    }
  },

  createNoticia: async (noticia: INews): Promise<INews> => {
    try {
      const newsCollection = collection(firestore, "noticias");
      const docRef = await addDoc(newsCollection, {
        ...noticia,
        createdAt: new Date().toISOString(),
      });
      return { id: docRef.id, ...noticia };
    } catch (error) {
      console.error("Erro ao criar notícia:", error);
      throw new Error("Falha ao criar notícia");
    }
  },

  updateNoticia: async (id: string, noticia: Partial<INews>): Promise<void> => {
    try {
      const newsDoc = doc(firestore, "noticias", id);
      const { id: _ignoreId, ...dataToUpdate } = noticia as INews;
      await updateDoc(newsDoc, { ...dataToUpdate });
    } catch (error) {
      console.error("Erro ao atualizar notícia:", error);
      throw new Error("Falha ao atualizar notícia");
    }
  },

  deleteNoticia: async (id: string): Promise<void> => {
    try {
      const newsDoc = doc(firestore, "noticias", id);
      await deleteDoc(newsDoc);
    } catch (error) {
      console.error("Erro ao deletar notícia:", error);
      throw new Error("Falha ao deletar notícia");
    }
  },
};