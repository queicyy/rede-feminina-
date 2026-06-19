import { eventosService } from "../services/eventos.service";

const useEventos = () => {
  const getAllEventos = async () => {
    const response = await eventosService.getEventos();
    return response;
  };

  const createEvento = async (evento: any) => {
    const response = await eventosService.createEvento(evento);
    return response;
  };

  const deleteEvento = async (id: string) => {
    await eventosService.deleteEvento(id);
  };

  return {
    getAllEventos,
    createEvento,
    deleteEvento,
  };
};

export default useEventos;