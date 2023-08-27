import { Component, OnInit } from '@angular/core';
import { Cart } from '../shared/models/Cart';
import { CartService } from '../services/cart.service';
import { CartItem } from '../shared/models/CartItem';
import { Router } from '@angular/router';


@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit {
  cart!: Cart;
  selectedPaymentMethod: string = '';
  isProceedButtonDisabled: boolean = true;
  selectedButton = document.getElementById('payoption');

  constructor(
    private cartService: CartService,
    private router: Router,

  ) {
    this.setCart();
  }

  ngOnInit(): void {
    if (this.getLocalStorageTotalQty() == 0) {
      this.cart = this.cartService.destroy();
    }
  }

  setCart() {
    this.cart = this.cartService.getCart();
  }


  removeFromCart(cartItem: CartItem) {
    this.cartService.removeFromCart(cartItem.item.id);
    this.setCart();
  }


  changeQuantity(cartItem: CartItem, quantityInString: string): void {
    const quantity = parseInt(quantityInString);
    this.cartService.changeQuantity(cartItem.item.id, quantity);
    this.setCart();
  }

  getLocalStorageTotalQty(): number {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      const cartData = JSON.parse(storedCart);
      return cartData.totalQuantity;
    }
    return 0;
  }

  getLocalStorageTotalAmt(): number {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      const cartData = JSON.parse(storedCart);
      return cartData.total;
    }
    return 0;
  }

  goToHome(): void {
    this.router.navigateByUrl('/');
  }

  proceedToPayment(event: Event) {
    if (this.isProceedButtonDisabled) {
      event.preventDefault();
    }
  }


  selectPIX() {
    this.selectedPaymentMethod = 'PIX';
    if (this.selectedButton != null) {
      this.selectedButton.style.backgroundColor = "goldenrod";
    }
  }
}



