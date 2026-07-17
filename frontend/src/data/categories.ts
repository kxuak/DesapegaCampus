export interface Category {
  id: string;
  label: string;
  icon: string;
  color: string;
}

export const CATEGORIES: Category[] = [
  { id: "livros", label: "Livros", icon: "/book-2.svg", color: "var(--cat-livros)" },
  { id: "engenharia", label: "Engenharia", icon: "/tool.svg", color: "var(--cat-engenharia)" },
  { id: "computacao", label: "Computação", icon: "/cpu.svg", color: "var(--cat-computacao)" },
  { id: "eletronicos", label: "Eletrônicos", icon: "/device-mobile.svg", color: "var(--cat-eletronicos)" },
  { id: "mobiliario", label: "Mobiliário", icon: "/armchair.svg", color: "var(--cat-mobiliario)" },
  { id: "vestuario", label: "Vestuário", icon: "/shirt.svg", color: "var(--cat-vestuario)" },
  { id: "outros", label: "Outros", icon: "/box.svg", color: "var(--cat-outros)" },
];

export const getCategory = (id: string): Category =>
  CATEGORIES.find((c) => c.id === id) ?? CATEGORIES[CATEGORIES.length - 1];
