import { Component, OnInit, Input } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-page-title-box',
  templateUrl: './page-title-box.component.html',
  styleUrls: ['./page-title-box.component.css'],
})
export class PageTitleBoxComponent {
  @Input() title: string;
}
