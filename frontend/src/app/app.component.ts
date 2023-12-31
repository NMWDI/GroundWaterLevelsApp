import {Component, HostListener, OnInit} from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {

  title: string;

  constructor(private router: Router, private titleService: Title) {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => this.router)
      )
      .subscribe((event) => {
        const title = this.getTitle(
          this.router.routerState,
          this.router.routerState.root
        ).join(' | ');
        this.titleService.setTitle(title + ' NM Groundwater');
        this.title = title;
      });
  }

  ngOnInit(): void {

  }

  getTitle(state, parent) {
    const data = [];
    if (parent && parent.snapshot.data && parent.snapshot.data.title) {
      data.push(parent.snapshot.data.title);
    }

    if (state && parent) {
      data.push(...this.getTitle(state, state.firstChild(parent)));
    }
    return data;
  }

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    if (window.innerWidth < 850 ) {
    }
  }
}
