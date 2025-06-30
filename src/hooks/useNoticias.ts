import { noticiesService } from "../services/noticies.service";

const useNoticias = () => {
  const allNews = async () => {
    const response = await noticiesService.getNoticies();
    return response;
  };

  return {
    allNews,
  };
};

export default useNoticias;
