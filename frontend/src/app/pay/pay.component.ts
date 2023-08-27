import { Component, OnInit } from '@angular/core';
import { Cart } from '../shared/models/Cart';
import { CartService } from '../services/cart.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';




@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.css']
})
export class PayComponent implements OnInit {

  public myAngularxQrCode: string = "";
  cart!: Cart;

  private resultString: string = "";
  result!: boolean;
  usersUrl!: string;
  public response!: String;
  resRecvd: boolean = false;
  transactionId!: string;
  status!: string;

  constructor(
    private cartService: CartService,
    private http: HttpClient,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.setCart();
    this.usersUrl = 'http://localhost:8080/pay/initiate';
    this.myAngularxQrCode = JSON.stringify(this.cart);


    // Perform the HTTP POST request first

    if (localStorage.getItem('transactionId') == null) {
      this.http.post('http://localhost:8080/pay/initiate', this.cart, { responseType: 'json' }).subscribe(
        (response: any) => {
          this.response = response;
          this.transactionId = response.transactionId;

          localStorage.setItem('transactionId', this.transactionId)
          this.status = response.status;


          // Once the POST request is successful, establish the SSE connection


          this.establishSSEConnection(this.transactionId);

        },
        (error) => {
          console.error('Error:', error);
        }
      );
    }
    else {
      this.transactionId = localStorage.getItem('transactionId')!;
      this.status = "uncancellable now. Please wait."
      if (localStorage.getItem('statusRecieved') == null) {
        this.establishSSEConnection(this.transactionId);
      }

    }

  }

  establishSSEConnection(transactionId: string): void {

    const eventSource = new EventSource(`http://localhost:8080/pay/status/${transactionId}`);

    eventSource.addEventListener('message', (event: MessageEvent) => {
      // Handle SSE response received
      this.status = event.data;
      this.result = this.status == "success";

      // Update the frontend UI based on the received data

      this.resRecvd = true;
      localStorage.setItem('statusRecieved', (this.resRecvd).toString());

      eventSource.close();    // close event stream

      this.router.navigate(['/result', this.result]);

    });

    eventSource.addEventListener('error', (event: Event) => {
      console.error('SSE error:', event);
    });
  };

  setCart() {
    this.cart = this.cartService.getCart();
  }


}
