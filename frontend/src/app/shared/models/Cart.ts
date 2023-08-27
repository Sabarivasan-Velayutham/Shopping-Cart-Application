
import { CartItem } from "./CartItem";

export class Cart {
    cartItem: CartItem[] = [];
    totalQuantity: number = 0; 
    total: number = 0; 
    merchantId: string = '';
    gatewayId: string = '';
    taxId: string = '';

}

