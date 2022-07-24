export interface Item {
  id: number;
  name: string;
  price: number;
  area: {
    width: number;
    height: number;
  };
  image: string;
}

export interface CartItem {
  item: Item;
  quantity: number;
}