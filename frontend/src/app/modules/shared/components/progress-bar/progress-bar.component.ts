import { Component, OnInit, Input } from '@angular/core';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss']
})
export class ProgressBarComponent implements OnInit {
  @Input() label: string;
  _progress: number;
  @Input() set progress(value: number) {
    this._progress = value * 100;
  }
  get progress(): number {
    return this._progress;
  }
  @Input() colorOverride: string = null;
  @Input() disableLabel = false;
  color: string;

  constructor() { }

  ngOnInit() {
    // should really adapt this to cover not just 0-1 values
    if (this.progress <= 55) {
      this.color = 'red';
    }
    else if (this.progress <= 75) {
      this.color = 'yellow';
    }
    else {
      this.color = 'green';
    }
    if (this.colorOverride != null) {
      this.color = this.colorOverride;
    }
  }

}
