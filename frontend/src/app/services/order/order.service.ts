import { Injectable } from '@angular/core';
import { items } from 'src/app/shared/models/items';
import itemsData from 'src/assets/items.json';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor() { }

  getAll(): items[] {
    const itemsArray = Object.values(itemsData);
    return (itemsArray);
  }
}
