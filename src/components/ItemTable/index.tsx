import { CartItem, Item } from "../../models/item.model";

import './styles.css';

interface ItemTableProps {
  cartItems: CartItem[];
}

export function ItemTable({ cartItems } : ItemTableProps) {

  return (
    <table className="w-full">
      <thead className="bg-black text-white">
        <tr className="p-4">
          <td>Imagem</td>
          <td>Nome do item</td>
          <td>Preço</td>
          <td>Qtd.</td>
          <td>Espaço ocupado</td>
        </tr>
      </thead>

      <tbody>
        {
          cartItems.map((cart, index) => (
            <tr key={cart.item.id} className={`mt-4 ${index % 2 === 0 ? 'bg-gray-400' : 'bg-gray-200'}`}>
              <td><img className="w-24" src={cart.item.image} alt={cart.item.name} /></td>
              <td>{cart.item.name}</td>
              <td>{cart.item.price} PTAS</td>
              <td>{cart.quantity}</td>
              <td>{cart.item.area.width} x {cart.item.area.height}</td>
            </tr>
          ))
        }
      </tbody>
    </table>
  );
}