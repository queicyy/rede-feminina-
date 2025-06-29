import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../firebase/firebase";
import { INews } from "../types/noticias.types";

export const noticiesService = {
  getNoticies: async (): Promise<INews[]> => {
    try {
      const newsCollection = collection(firestore, "noticias");
      const newsSnapshot = await getDocs(newsCollection);
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
};
