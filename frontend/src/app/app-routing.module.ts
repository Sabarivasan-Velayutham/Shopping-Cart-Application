import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CartPageComponent } from './cart-page/cart-page.component';
import { PayComponent } from './pay/pay.component';
import { LandingComponent } from './landing/landing.component';
import { ResultComponent } from './result/result.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  // { path: 'landing', component: LandingComponent },
  { path: 'cart-page', component: CartPageComponent },
  { path: 'pay', component: PayComponent },
  { path: 'result/:result', component: ResultComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
