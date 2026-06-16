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
    title: "Bolsa de Patchwork",
    description: "Linda bolsa artesanal feita com retalhos aproveitados e técnica de patchwork. Ideal para o dia a dia, espaçosa e sustentável.",
    price: 45.0,
    imageUrl: "https://images.unsplash.com/photo-1584346133934-a3afd2a33c4c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
  },
  {
    id: "art-2",
    title: "Tapete de Crochê Redondo",
    description: "Tapete feito 100% à mão em crochê com barbante cru de alta qualidade. Perfeito para decorar a sala ou quarto.",
    price: 80.0,
    imageUrl: "https://images.unsplash.com/photo-1584346133934-a3afd2a33c4c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
  },
  {
    id: "art-3",
    title: "Toalha de Mesa Bordada",
    description: "Toalha de mesa de algodão com bordados florais delicados feitos pelas nossas voluntárias.",
    price: 65.0,
    imageUrl: "https://images.unsplash.com/photo-1584346133934-a3afd2a33c4c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
  },
  {
    id: "art-4",
    title: "Amigurumi Ursinho",
    description: "Boneco de crochê (amigurumi) no formato de ursinho. Perfeito para presentear crianças recém-nascidas. Fio antialérgico.",
    price: 35.0,
    imageUrl: "https://images.unsplash.com/photo-1584346133934-a3afd2a33c4c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
  },
  {
    id: "art-5",
    title: "Conjunto de Pano de Prato",
    description: "Conjunto com 3 panos de prato de alta absorção, com acabamento em crochê e pinturas exclusivas feitas à mão.",
    price: 30.0,
    imageUrl: "https://images.unsplash.com/photo-1584346133934-a3afd2a33c4c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
  },
  {
    id: "art-6",
    title: "Almofada de Tricô",
    description: "Capa de almofada super macia feita em tricô com lã antialérgica. Cobre almofadas padrão 40x40cm.",
    price: 40.0,
    imageUrl: "https://images.unsplash.com/photo-1584346133934-a3afd2a33c4c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
  }
];
