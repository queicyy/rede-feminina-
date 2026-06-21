import { vitrineService } from "../services/vitrine.service";
import { IVitrineItem } from "../types/vitrine.types";

const useVitrine = () => {
  const getAllItems = async () => {
    const response = await vitrineService.getItems();
    return response;
  };

  const createItem = async (item: IVitrineItem) => {
    const response = await vitrineService.createItem(item);
    return response;
  };

  const updateItem = async (id: string, item: Partial<IVitrineItem>) => {
    await vitrineService.updateItem(id, item);
  };

  const deleteItem = async (id: string) => {
    await vitrineService.deleteItem(id);
  };

  return {
    getAllItems,
    createItem,
    updateItem,
    deleteItem,
  };
};

export default useVitrine;