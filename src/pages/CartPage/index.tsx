import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useSound from 'use-sound';
import { ItemTable } from '../../components/ItemTable';
import { CartItem } from '../../models/item.model';
import { KnapsackService } from '../../services/knapsack.service';
import { LocalStorageService } from '../../services/local-storage.service';
import { items as data } from '../../utils/data';

import mercenariesAudio from '../../assets/audio/mercenaries.mp3';
import resultImage from '../../assets/img/end.jpg';

import './styles.css';

export function CartPage() {
  const [items] = useState(data);
  const [cartItems] = useState(LocalStorageService.getCart());
  const [result, setResult] = useState<CartItem[]>([]);

  const knapSackService = new KnapsackService();

  const configAudio = {
    interrupt: true,
  }

  const [playMercenaries, configMercenaries] = useSound(mercenariesAudio, configAudio);

  playMercenaries();

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

  function stopSound(): void {
    configMercenaries.stop();
  }

  return (
    <div className="w-full relative h-screen">
      <img className="bg-merchant" src={resultImage} alt="bg-merchant" />

      <div className="pt-4 text-center">
        <Link onClick={stopSound} to="/" className="bg-black text-white px-4 py-2 rounded-md">Voltar</Link>
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