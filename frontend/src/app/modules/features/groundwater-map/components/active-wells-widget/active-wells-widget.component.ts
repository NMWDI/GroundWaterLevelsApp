import { Component } from "@angular/core";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";

@Component({
    selector: 'app-active-wells-widget',
    templateUrl: './active-wells-widget.component.html',
    styleUrls: ['./active-wells-widget.component.scss']
})

export class ActiveWellsWidgetComponent {
    infocircle = faInfoCircle;
}