import { noticiesService } from "../services/noticies.service";
import { INews } from "../types/noticias.types";

const useNoticias = () => {
  const allNews = async () => {
    const response = await noticiesService.getNoticies();
    return response;
  };

  const createNoticia = async (noticia: INews) => {
    const response = await noticiesService.createNoticia(noticia);
    return response;
  };

  const updateNoticia = async (id: string, noticia: Partial<INews>) => {
    await noticiesService.updateNoticia(id, noticia);
  };

  const deleteNoticia = async (id: string) => {
    await noticiesService.deleteNoticia(id);
  };

  return {
    allNews,
    createNoticia,
    updateNoticia,
    deleteNoticia,
  };
};

export default useNoticias;