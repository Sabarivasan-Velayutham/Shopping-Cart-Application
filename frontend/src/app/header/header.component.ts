import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


  constructor(private router: Router) { }

  @Input() shouldDisplayButton: boolean = false;

  n: number = 0;

  ngOnInit(): void {

  }

  goToCart(): void {
    if (this.router.url != '/pay' && this.router.url != '/result/true' && this.router.url != '/result/false') {
      this.router.navigateByUrl('/cart-page');
    }
  }

  goToHome(): void {

    if (this.router.url != '/pay') {
      this.router.navigateByUrl('/');
    }

  }

}
