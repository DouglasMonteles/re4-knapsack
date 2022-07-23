import { useState } from "react";
import useSound from 'use-sound';

import { Item } from "../../model/item.model";
import { items as data } from "../../utils/data";

import mercantImage from '../../assets/img/mercant.jpg';

import welcomeAudio from '../../assets/audio/welcome.mp3';
import whatYouBuyingAudio from '../../assets/audio/what-you-buying.mp3';
import thankYouAudio from '../../assets/audio/thank-you.mp3';
import notEnoughCashAudio from '../../assets/audio/no-enough-cash.mp3';

import "./styles.css";

export function HomePage() {
  const items = data;
  const [selectedItem, setSelectedItem] = useState(items[0]);
  const [start, setStart] = useState(false);
  const [amountPtas, setAmountPtas] = useState(25000); 
  const [message, setMessage] = useState('');

  const configAudio = {
    interrupt: true,
  }

  const [playWelcome] = useSound(welcomeAudio, configAudio);
  const [playThankYou] = useSound(thankYouAudio, configAudio);
  const [playWhatYouBuying] = useSound(whatYouBuyingAudio, configAudio);
  const [playNotEnoughCash] = useSound(notEnoughCashAudio, configAudio);

  function startGame(): void {
    setStart(true);
    playWelcome();
  }

  function selectItem(item: Item) {
    setSelectedItem(item);
    playWhatYouBuying();
    setMessage('');
  }

  function buyItem(): void {
    setAmountPtas(value => {
      const purchase = value - selectedItem.price;

      if (purchase < 0) {
        playNotEnoughCash();
        setMessage('Você não tem dinheiro suficiente para esta compra, estrangeiro!');
        return value;
      }

      playThankYou();

      return purchase;
    });
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
            <img className="bg-mercant" src={mercantImage} />

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
                      className={`cursor-pointer flex flex-row justify-between hover:bg-gray-200 p-2 rounded-md ${selectedItem.name === item.name && 'bg-gray-300'}`}
                      onClick={() => selectItem(item)}
                    >
                      <span>{item.name}</span>
                      <span>{item.area.width * item.area.height} quadrados</span>
                      <span>{item.price} PTAS</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col">
                <img className="w-92" src={selectedItem.image} />

                <div className="flex flex-col justify-center items-center h-full">
                  <button onClick={buyItem}className="rounded-md bg-black active:bg-gray-800 text-white p-4">
                    Comprar este item
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
