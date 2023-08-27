import { items } from "./items";

export class CartItem{

    constructor(item:items, quantity: number = 1){
        this.item=item;
        this.quantity = quantity;
    }
    item:items;
    quantity:number;

}