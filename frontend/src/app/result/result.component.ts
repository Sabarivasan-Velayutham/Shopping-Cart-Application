import { PlatformLocation } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit{

  result!: boolean;
  transactionId!: string;

  constructor(private route: ActivatedRoute, private location: PlatformLocation, private router: Router){
    location.onPopState(() => {
      history.forward();     
    });
  }
  ngOnInit(): void {
      this.route.params.subscribe((params: Params) => this.result = (params['result'])=="true");
      this.transactionId=localStorage.getItem('transactionId')!;
  }

}
