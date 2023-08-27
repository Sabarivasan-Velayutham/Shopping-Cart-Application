import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order/order.service';
import { items } from '../shared/models/items';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  items: items[] = [];

  constructor(private it: OrderService, private cartService: CartService) { }

  ngOnInit(): void {
    this.items = this.it.getAll();
  }
  addToCart(id: number): void {
    this.cartService.addToCart(this.items[id - 1]);
    const node = document.getElementById('cartButton' + id);
    if (node !== null) {
      node.textContent = 'added to cart';
    }

  }

}
