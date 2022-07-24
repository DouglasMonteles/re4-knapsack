import { CartItem } from './../models/item.model';
import { Item } from "../models/item.model";

export class LocalStorageService {

  private static cartKey: string = 'cart-key';

  public static addItem(item: Item): void {
    const cart = this.getCart();
    const index = cart.findIndex(cartItem => cartItem.item.id === item.id);

    if (index === -1) {
      cart.push({item, quantity: 0});
    } else {
      cart[index].quantity = cart[index].quantity + 1;
    }

    localStorage.setItem(this.cartKey, JSON.stringify(cart));
  }

  public static getCart(): CartItem[] {
    let cart = localStorage.getItem(this.cartKey);

    if (cart) {
      return JSON.parse(cart) as CartItem[];
    }

    return [];
  }

  public static isItemAlreadyAdded(id: number): boolean {
    const index = this.getCart().findIndex(cartItem => cartItem.item.id === id);
    return index !== -1;
  }

  public static clearCart(): void {
    localStorage.setItem(this.cartKey, '');
  }

}