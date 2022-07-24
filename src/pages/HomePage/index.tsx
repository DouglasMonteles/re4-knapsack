import { useCallback, useEffect, useState } from "react";
import useSound from 'use-sound';

import { Item } from "../../models/item.model";
import { items as data } from "../../utils/data";

import merchantImage from '../../assets/img/merchant.jpg';

import welcomeAudio from '../../assets/audio/welcome.mp3';
import whatYouBuyingAudio from '../../assets/audio/what-you-buying.mp3';
import thankYouAudio from '../../assets/audio/thank-you.mp3';
import notEnoughCashAudio from '../../assets/audio/no-enough-cash.mp3';

import "./styles.css";
import { useNavigate } from "react-router-dom";
import { LocalStorageService } from "../../services/local-storage.service";

export function HomePage() {
  const [items, setItems] = useState(data);
  const [selectedItem, setSelectedItem] = useState(items[0]);
  const [start, setStart] = useState(false);
  const [amountPtas, setAmountPtas] = useState(0);
  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  const configAudio = {
    interrupt: true,
  }

  const [playWelcome] = useSound(welcomeAudio, configAudio);
  const [playThankYou] = useSound(thankYouAudio, configAudio);
  const [playWhatYouBuying] = useSound(whatYouBuyingAudio, configAudio);
  const [playNotEnoughCash] = useSound(notEnoughCashAudio, configAudio);

  useEffect(() => {
    const cart = LocalStorageService.getCart();
    
    if (cart.length > 0) {
      const amount = cart
        .map(c => c.item.price)
        .reduce((prev, curr) => prev + curr, 0);

      setAmountPtas(amount);
    }
  }, []);

  function startGame(): void {
    setStart(true);
    playWelcome();
  }

  function selectItem(item: Item): void {
    if (LocalStorageService.isItemAlreadyAdded(item.id)) {
      return;
    }

    setSelectedItem(item);
    playWhatYouBuying();
    setMessage('');
  }

  function buyItem(): void {
    if (LocalStorageService.isItemAlreadyAdded(selectedItem.id)) {
      return;
    }

    setAmountPtas(value => {
      const purchase = value + selectedItem.price;

      LocalStorageService.addItem(selectedItem);
      playThankYou();
      return purchase;
    });
  }

  function navitageToResult(): void {
    if (LocalStorageService.getCart().length <= 0) {
      setMessage('Escolha alguma coisa primeiro!');
      return;
    }

    navigate('/result');
  }

  const useForceUpdate = () => {
    const [ignored, newState] = useState();
    return useCallback(() => newState({} as any), []);
  }

  const updateComponent = useForceUpdate();

  function clearCart() {
    LocalStorageService.clearCart();
    setAmountPtas(0);
    updateComponent();
  }

  return (
    <>
      {
        !start ? (
          <div className="h-screen flex justify-center items-center">
            <button onClick={startGame} className="rounded-md bg-black active:bg-gray-800 text-white p-4">
              Começar
            </button>
          </div>
        ) : (
          <div className="relative">
            <img className="bg-merchant" src={merchantImage} alt="bg-merchant" />

            <div className="flex flex-row justify-between gap-4 p-4  mx-8 pb-0">
              <div className="w-full mx-32">
                <div className="flex font-bold font-xl px-2 mb-4 justify-between">
                  <h2>BUY</h2>
                  <p>{amountPtas} PTAS</p>
                </div>
                
                <ul className="">
                  {items.map((item) => (
                    <li
                      key={item.name}
                      className={LocalStorageService.isItemAlreadyAdded(item.id) ? 'flex flex-row justify-between p-2 rounded-md disabled' : `flex flex-row justify-between p-2 rounded-md cursor-pointer hover:bg-gray-200 font-medium ${selectedItem.name === item.name && 'bg-gray-300'}`}
                      onClick={() => selectItem(item)}
                    >
                      <span>{item.name}</span>
                      <span>{item.area.width} x {item.area.height}</span>
                      <span>{item.price} PTAS</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col">
                <img className="w-92" src={selectedItem.image} />

                <div className="flex flex-col justify-center items-center h-full">
                  <button disabled={LocalStorageService.isItemAlreadyAdded(selectedItem.id)} onClick={buyItem} className={'rounded-md bg-black active:bg-gray-800 text-white p-4'}>
                    Comprar este item
                  </button>

                  <button onClick={navitageToResult}className="rounded-md bg-gray-600 active:bg-gray-800 text-white p-4 mt-4">
                    Ir para o resultado
                  </button>

                  <button onClick={clearCart}className="rounded-md bg-gray-600 active:bg-gray-800 text-white p-4 mt-4">
                    Limpar inventário
                  </button>

                  {message && (
                    <p className="mt-8 px-4 py-2 rounded-md text-center font-ld bg-red-900 text-white">
                      {message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )
      }
    </>
  );
}
