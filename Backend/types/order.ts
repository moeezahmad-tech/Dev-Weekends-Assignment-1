type OrderItem = {
  productImage?: string;
  productName?: string;
  productDescription?: string;
  price?: number | string;
  quantity?: number;
};

type Order = {
  items: OrderItem[];
  total?: number;
  status?: string;
  created_at?: string;
};

export type { Order, OrderItem };
