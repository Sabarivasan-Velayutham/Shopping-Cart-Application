import { Component, OnInit } from '@angular/core';
import { Cart } from '../shared/models/Cart';
import { CartService } from '../services/cart.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  cart!: Cart;

  formData = {
    merchantId: '',
    gatewayId: '',
    taxId: ''
  };

  constructor(private cartService: CartService, private router: Router) { }

  ngOnInit(): void {

    localStorage.clear();
    this.cart = this.cartService.destroy();

  }

  submitForm(form: NgForm): void {
    if (form.valid) {
      this.cart.merchantId = this.formData.merchantId;
      this.cart.gatewayId = this.formData.gatewayId;
      this.cart.taxId = this.formData.taxId;
      this.router.navigateByUrl('/');
    }
  }
}
