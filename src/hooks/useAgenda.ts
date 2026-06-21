import { agendaService } from "../services/agenda.service";
import { IAgendaItem } from "../types/agenda.types";

const useAgenda = () => {
  const getAllItems = async () => {
    const response = await agendaService.getItems();
    return response;
  };

  const createItem = async (item: IAgendaItem) => {
    const response = await agendaService.createItem(item);
    return response;
  };

  const updateItem = async (id: string, item: Partial<IAgendaItem>) => {
    await agendaService.updateItem(id, item);
  };

  const deleteItem = async (id: string) => {
    await agendaService.deleteItem(id);
  };

  return {
    getAllItems,
    createItem,
    updateItem,
    deleteItem,
  };
};

export default useAgenda;