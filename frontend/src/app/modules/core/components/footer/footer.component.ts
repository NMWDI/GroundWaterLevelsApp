import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit{
  currentVersion: string;
  currentDate: Date;

  constructor() {
    this.currentDate = new Date(Date.now());
  }

  ngOnInit(): void {
  }
}
