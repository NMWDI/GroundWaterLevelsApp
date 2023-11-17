import { Component } from "@angular/core";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";


@Component({
    selector: 'app-well-trends-widget',
    templateUrl: './well-trends-widget.component.html',
    styleUrls: ['./well-trends-widget.component.scss']
})

export class WellTrendsWidgetComponent {
    infocircle = faInfoCircle;
}