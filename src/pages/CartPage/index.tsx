import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useSound from 'use-sound';
import { ItemTable } from '../../components/ItemTable';
import { CartItem } from '../../models/item.model';
import { KnapsackService } from '../../services/knapsack.service';
import { LocalStorageService } from '../../services/local-storage.service';
import { items as data } from '../../utils/data';

import welcomeAudio from '../../assets/audio/welcome.mp3';

import './styles.css';

export function CartPage() {
  const [items] = useState(data);
  const [cartItems] = useState(LocalStorageService.getCart());
  const [result, setResult] = useState<CartItem[]>([]);

  const knapSackService = new KnapsackService();

  const configAudio = {
    interrupt: true,
  }

  const [playWelcome] = useSound(welcomeAudio, configAudio);

  playWelcome();

  useEffect(() => {
    const knapItems = items.map(item => ({
      id: item.id,
      w: item.area.width * item.area.height,
      v: item.price,
    }));

    const capacity = 2 * 4;

    const result = knapSackService.knapSack(knapItems, capacity);
    
    console.log(result);

    const knapResult = items
      .filter(item => result.subset.findIndex(sub => sub.id === item.id) >= 0)
      .map(item => ({ item: item, quantity: 1 } as CartItem));

    setResult(knapResult);
  }, []);

  return (
    <div className="w-full">
      <div className="mt-4 text-center">
        <Link to="/">Voltar</Link>
      </div>

      <div className="flex justify-between gap-4 w-full p-4">
        <div className="w-full">
          <h1 className="font-bold text-2xl mb-4">Itens que você escolheu</h1>
          <ItemTable cartItems={cartItems} />
        </div>

        <div className="w-full">
          <h1 className="font-bold text-2xl mb-4">Melhor escolha de itens</h1>
          <ItemTable cartItems={result} />
        </div>
      </div>
    </div>
  );
}