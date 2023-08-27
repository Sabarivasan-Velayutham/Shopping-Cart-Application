
import { Injectable } from '@angular/core';
import { Cart } from '../shared/models/Cart';
import { items } from '../shared/models/items';
import { CartItem } from '../shared/models/CartItem';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: Cart | undefined;

  constructor() {
    this.loadCartFromLocalStorage();
  }

  
  addToCart(item: items): void {
    if (!this.cart) {
      this.cart = new Cart();
    }

    let cartItem = this.cart.cartItem.find((cartItem) => cartItem.item.id === item.id);
    if (cartItem) {
      this.changeQuantity(cartItem.item.id, cartItem.quantity + 1);
      return;
    }
    this.cart.cartItem.push(new CartItem(item));
    this.cart.totalQuantity = this.calculateTotalQty(); // Update totalQuantity
    this.cart.total = this.calculateTotal(); // Update total
    this.saveCartToLocalStorage();
  }

  removeFromCart(itemId: number): void {
    if (!this.cart) {
      return;
    }

    this.cart.cartItem = this.cart.cartItem.filter((cartItem) => cartItem.item.id !== itemId);
    this.cart.totalQuantity = this.calculateTotalQty(); // Update totalQuantity
    this.cart.total = this.calculateTotal(); // Update total
    this.saveCartToLocalStorage();
  }

  changeQuantity(itemId: number, quantity: number): void {
    if (!this.cart) {
      return;
    }

    let cartItem = this.cart.cartItem.find((cartItem) => cartItem.item.id === itemId);
    if (!cartItem) return;
    cartItem.quantity = quantity;
    this.cart.totalQuantity = this.calculateTotalQty(); // Update totalQuantity
    this.cart.total = this.calculateTotal(); // Update total
    this.saveCartToLocalStorage();
  }

  private loadCartFromLocalStorage(): void {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      this.cart = JSON.parse(storedCart) as Cart;
    } else {
      this.cart = new Cart();
    }
  }

  private saveCartToLocalStorage(): void {
    if (this.cart) {
      localStorage.setItem('cart', JSON.stringify(this.cart));
    }
  }

  private calculateTotalQty(): number {
    let tQty: number = 0;

    if (this.cart) {
      this.cart.cartItem.forEach(item => {
        tQty += item.quantity;
      });
    }

    return tQty;
  }

  private calculateTotal(): number {
    let totalAmt: number = 0;

    if (this.cart) {
      this.cart.cartItem.forEach(item => {
        totalAmt += item.quantity * item.item.price;
      })
    }
    return totalAmt;
  }

  destroy(): Cart{
    this.cart=new Cart();
    return this.cart;
  }

  getCart(): Cart {
    if (!this.cart) {
      this.cart = new Cart();
    }
    return this.cart;
  }
}
