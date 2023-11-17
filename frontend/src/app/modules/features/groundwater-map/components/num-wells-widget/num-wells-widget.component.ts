import { HttpClient } from "@angular/common/http";
import { Component, OnInit, ViewChild } from "@angular/core";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";

import {
    ApexChart, ApexDataLabels, 
    ChartComponent,
    ApexLegend,
    ApexAxisChartSeries,
    ApexXAxis,
    ApexYAxis
} from 'ng-apexcharts'

type ChartOptions = {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    labels: string[];
    legend: ApexLegend;
    dataLabels: ApexDataLabels;
    xAxis: ApexXAxis;
    yAxis: ApexYAxis;
}

type ChartData = {
    name: string;
    data: number[]
}

@Component({
    selector: 'app-num-wells-widget',
    templateUrl: './num-wells-widget.component.html',
    styleUrls: ['./num-wells-widget.component.scss']
})

export class NumWellsWidgetComponent implements OnInit {

    infocircle = faInfoCircle;

    @ViewChild("chart") chart: ChartComponent;
    public chartOptions: Partial<ChartOptions>;
    public dataLoaded = false

    constructor(private http: HttpClient) {
    }

    ngOnInit() {
        this.http.get('/assets/chart-data/PodStats.csv', {responseType: 'text'}).subscribe((data) => {

            let chartData: ChartData[] = []
            let dates: string[] = []
            let measurements: number[] = []
            data.split('\n').forEach((row) => {
                let col = row.split(',')
                dates.push(col[0])
                measurements.push(parseFloat(col[1].trim()))
            })

            let d: ChartData = {
                name: '# of Wells',
                data: measurements
            }
            chartData.push(d)

            this.chartOptions = {
                dataLabels: {
                    enabled: false
                },
                legend: {
                    show: false,
                    formatter: (seriesName, opts): string => {
                        return seriesName + " - " + opts.w.globals.series[opts.seriesIndex]
                    },
                },
                series: chartData,
                chart: {    
                    type: "bar",
                    stacked: true,
                    toolbar: {
                        show: false
                    },
                    height: 250,
                    redrawOnWindowResize: true
                },
                xAxis: {
                    categories: dates,
                    tickAmount: 5
                  },
                yAxis: {
                    title: {
                      text: '# of Wells'
                    }
                  },
            };

            this.dataLoaded = true

        })
    }
}