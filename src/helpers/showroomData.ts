export interface ShowroomItem {
  id: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
}

export const showroomItems: ShowroomItem[] = [
  {
    id: "art-1",
    title: "Bolsa de Crochê",
    description:
      "Bolsa artesanal confeccionada manualmente pelas voluntárias da Rede Feminina. Ideal para uso diário e para presentear.",
    price: 45.0,
    imageUrl: "/assets/Vitrine virtual/bolsa-croche.jpeg",
  },
  {
    id: "art-2",
    title: "Boneca de Pano",
    description: "Boneca de pano produzida artesanalmente, com acabamento delicado e exclusiva da Rede Feminina.",
    price: 35.0,
    imageUrl: "/assets/Vitrine virtual/boneca-pano.jpeg",
  },
  {
    id: "art-3",
    title: "Capa para Bebedouro",
    description: "Capa decorativa para bebedouro confeccionada manualmente, trazendo charme e proteção ao ambiente.",
    price: 30.0,
    imageUrl: "/assets/Vitrine virtual/capa-bebedouro.jpeg",
  },
  {
    id: "art-4",
    title: "Corta Vento Nike",
    description: "Peça disponível no bazar solidário da Rede Feminina. Produto em ótimo estado de conservação.",
    price: 50.0,
    imageUrl: "/assets/Vitrine virtual/corta-vento-nike.jpeg",
  },
  {
    id: "art-5",
    title: "Kit Cozinha",
    description:
      "Kit de cozinha artesanal com peças produzidas pelas voluntárias, ideal para uso doméstico ou presente.",
    price: 40.0,
    imageUrl: "/assets/Vitrine virtual/kit-cozinha.jpeg",
  },
  {
    id: "art-6",
    title: "Camisa Zara",
    description: "Peça disponível no bazar beneficente da Rede Feminina. Produto em excelente estado.",
    price: 45.0,
    imageUrl: "/assets/Vitrine virtual/camisa-zara.jpeg",
  },
];
