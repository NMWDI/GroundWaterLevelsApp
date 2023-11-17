import { AfterViewChecked, Component, ViewChild } from "@angular/core";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";

import {
    ApexNonAxisChartSeries,
    ApexResponsive,
    ApexChart, ApexDataLabels, 
    ChartComponent,
    ApexLegend,
    ApexTooltip
} from 'ng-apexcharts'

type ChartOptions = {
    series: ApexNonAxisChartSeries;
    chart: ApexChart;
    responsive: ApexResponsive[];
    labels: string[];
    legend: ApexLegend;
    dataLabels: ApexDataLabels;
    toolTips: ApexTooltip;
}

@Component({
    selector: 'app-water-use-widget',
    templateUrl: './water-use-widget.component.html',
    styleUrls: ['./water-use-widget.component.scss']
})

export class WaterUseWidgetComponent implements AfterViewChecked{

        infocircle = faInfoCircle;

    @ViewChild("chart") chart: ChartComponent;
    public chartOptions: Partial<ChartOptions>;

    constructor() {

        this.chartOptions = {
            dataLabels: {
                enabled: false,
            },
            legend: {
                show: true,
                formatter: (seriesName, opts): string => {
                    return seriesName + ": " + opts.w.globals.series[opts.seriesIndex].toLocaleString('en-us')
                },
                position: 'bottom',
            },
            toolTips: {
                enabled: true,
                y: {
                    formatter: (value): string => {
                        return value.toLocaleString('en-us')
                    }
                }
            },
            series: [1120625, 196785, 45199, 41513, 33142, 27949, 19460],
            chart: {    
                type: "donut",
                height: 250,
                redrawOnWindowResize: true
            },
            labels: ["Irrigated Agriculture", "Public Water Supply", "Commercial", "Mining", "Livestock", "Domestic", "Other"],
            responsive: [
            {
                breakpoint: 1226,
                options: {
                    chart: {
                        height: 300,
                        redrawOnWindowResize: true
                    },
                    legend: {
                        position: "bottom"
                    }
                }
            }
            ]
        };
    }

    ngAfterViewChecked() {
        setTimeout(()=>{window.dispatchEvent(new Event('resize'))}, 500) // fix an error where sometimes the chart doesnt render
    }

}