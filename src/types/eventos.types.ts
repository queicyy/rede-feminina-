export interface IEvento {
  id?: string;
  titulo: string;
  data: string;
  horario: string;
  local: string;
  endereco: string;
  preco?: string;
  descricao: string;
  imageUrl?: string;
  createdAt?: string;
}
