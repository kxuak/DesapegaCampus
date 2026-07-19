export interface ProductRecord {
  id: string;
  title: string;
  description: string;
  category: string;
  condition: string | null;
  price: number | null;
  is_donation: 0 | 1;
  image: string | null;
  seller_name: string;
  contact: string | null;
  owner_id: string;
  created_at: string;
}