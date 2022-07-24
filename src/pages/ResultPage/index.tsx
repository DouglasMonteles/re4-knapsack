import { useEffect, useState } from 'react';
import useSound from 'use-sound';
import { Link, useLocation } from 'react-router-dom';
import { CartItem } from '../../models/item.model';
import { KnapsackService } from '../../services/knapsack.service';
import { LocalStorageService } from '../../services/local-storage.service';
import { items as data } from '../../utils/data';

import mercenariesImage from '../../assets/img/mercenaries.jpg';
import ashleyImage from '../../assets/img/ashley.jpg';

import mercenariesAudio from '../../assets/audio/mercenaries.mp3';
import ashleyAudio from '../../assets/audio/ashley.mp3';

import './styles.css';

export function ResultPage() {
  const [items] = useState(data);
  const [cartItems] = useState(LocalStorageService.getCart());
  const [isMatch, setIsMatch] = useState(false);
  const location = useLocation();

  const knapSackService = new KnapsackService();

  const configAudio = {
    interrupt: true,
  }

  const [playMercenaries] = useSound(mercenariesAudio, configAudio);
  const [playAshley] = useSound(ashleyAudio, configAudio);

  useEffect(() => {
    const knapItems = items.map(item => ({
      id: item.id,
      w: item.area.width * item.area.height,
      v: item.price,
    }));

    const capacity = 2 * 4;

    const result = knapSackService.knapSack(knapItems, capacity);

    const knapResult = items
      .filter(item => result.subset.findIndex(sub => sub.id === item.id) >= 0)
      .map(item => ({ item: item, quantity: 1 } as CartItem));

    setIsMatch(isAllItemsMatch(knapResult));
  }, []);

  function isAllItemsMatch(knapResult: CartItem[]): boolean {
    const cartItemsId = cartItems.map(c => c.item.id).sort((a, b) => a > b ? -1 : a < b ? 1 : 0);
    const knapItemsId = knapResult.map(k => k.item.id).sort((a, b) => a > b ? -1 : a < b ? 1 : 0);;

    if (cartItemsId.length !== knapItemsId.length) {
      return false;
    }

    for (let i = 0; i < cartItemsId.length; i++) {
      if (cartItemsId[i] !== knapItemsId[i]) {
        return false;
      }
    }

    return true;
  }

  return (
    <div className="w-full flex flex-col items-center justify-center h-screen relative">
      <img className="bg-merchant" src={isMatch ? mercenariesImage : ashleyImage} alt="bg-merchant" />
      {
        isMatch ? (
          <h1 className="font-bold text-2xl text-center">
            Parabéns forasteiro, <br/> você fez a melhor escolha de itens
          </h1>
        ) : (
          <h1 className="font-bold text-2xl text-center">
            Você não fez uma boa escolha de itens e <br/> por isso a Ashley foi levada!
          </h1>
        )
      }

      <Link className="mt-24" to="/cart">Ir para detalhes do resultado</Link>
    </div>
  );
}