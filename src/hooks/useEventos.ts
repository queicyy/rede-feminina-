import { eventosService } from "../services/eventos.service";
import { IEvento } from "../types/eventos.types";

const useEventos = () => {
  const getAllEventos = async () => {
    const response = await eventosService.getEventos();
    return response;
  };

  const createEvento = async (evento: any) => {
    const response = await eventosService.createEvento(evento);
    return response;
  };

  const updateEvento = async (id: string, evento: Partial<IEvento>) => {
    await eventosService.updateEvento(id, evento);
  };

  const deleteEvento = async (id: string) => {
    await eventosService.deleteEvento(id);
  };

  return {
    getAllEventos,
    createEvento,
    updateEvento,
    deleteEvento,
  };
};

export default useEventos;