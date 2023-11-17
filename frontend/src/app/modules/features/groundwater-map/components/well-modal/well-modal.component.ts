import { HttpClient } from "@angular/common/http";
import { Component, Input, OnInit, } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { environment } from "src/environments/environment";
import { ModalData } from "../../interfaces/ModalData";

@Component({
    selector: 'app-well-modal',
    templateUrl: './well-modal.component.html',
    styleUrls: ['./well-modal.component.scss']
})

export class WellModalComponent implements OnInit {
    @Input() modalData: ModalData

    public chartWidth;
    public chartHeight;

    public dtwOptions
    public dtwData
    public dfmOptions
    public dfmData
    public dataLoaded = false
    public isCollapsed = false
    public isCollapsed2 = true

    constructor(
        public activeModal: NgbActiveModal,
        private http: HttpClient,
        ) {

        // Manual responsiveness for dygraph chart
        if(window.innerWidth > 1368) {
            this.chartWidth = '800'
            this.chartHeight = '250'
        }
        else if(window.innerWidth > 470) {
            this.chartWidth = '400'
            this.chartHeight = '200'
        }
        else {
            this.chartWidth = '300'
            this.chartHeight = '170'
        }
    }

    ngOnInit() {
        this.http.get(environment.BucketURL + "/" + this.modalData.DepthToWaterCSVPath, {responseType: 'text'}).subscribe((dtwData) => {
            this.http.get(environment.BucketURL + "/" + this.modalData.DivergenceFromMeanCSVPath, {responseType: 'text'}).subscribe((dfmData) => {
                let dtwDataClean = ""
                let highVal = null
                let lowVal = null
                let dfmDataClean = ""

                // Get the lowest and highest depth to water value to manually flip the y axis. Clean dates
                dtwData.split('\n').forEach((line)=>{
                    let cdate = new Date(Date.parse(line.split(',')[0]))
                    let cval = line.split(',')[1]
                    let value = parseFloat(cval)
                    if(highVal == null)
                    {
                        highVal = value
                        lowVal = value
                    }
                    if(value > highVal) highVal = value
                    else if(value < lowVal) lowVal = value
                    if(cdate !== undefined && cval !== undefined){
                        dtwDataClean = dtwDataClean + cdate.toISOString().split("T")[0] + "," + cval + "\n"
                    }
                });
                this.dtwData = dtwDataClean.slice(0, -1)

                dfmData.split('\n').forEach((line)=>{
                    let cdate = new Date(Date.parse(line.split(',')[0]))
                    let cval = line.split(',')[1]
                    if(cdate !== undefined && cval !== undefined){
                        dfmDataClean = dfmDataClean + cdate.toISOString().split("T")[0] + "," + cval + "\n"
                    }
                });
                this.dfmData = dfmDataClean.slice(0, -1)

                this.dtwOptions = {
                    height: this.chartHeight,
                    width: this.chartWidth,
                    labels: ['Time','Depth To Water (ft. below ground surface)'],
                    xlabel: 'Time',
                    ylabel: 'Depth To Water (ft.)',
                    animatedZooms: true,
                    pointSize: 2,
                    showRangeSelector: true,
                    labelsDiv: 'dtwLabel',
                    valueRange: [highVal, lowVal]
                }

                this.dfmOptions = {
                    height: this.chartHeight,
                    width: this.chartWidth,
                    labels: ['Time','Divergence From Mean (ft)'],
                    xlabel: 'Time',
                    ylabel: 'Divergence From Mean (ft)',
                    animatedZooms: true,
                    pointSize: 2,
                    showRangeSelector: true,
                    labelsDiv: 'dfmLabel',
                    underlayCallback: (canvas, area, g) => { //draw line at x=0
                        let y1 = g.toDomYCoord(0)
                        canvas.fillStyle = 'black'
                        canvas.fillRect(0, y1 - 2, area.w + 55, 1)
                    }
                }

                this.dataLoaded = true
            })
        })

    }

    downloadDtwCSV() {
        let blob = new Blob([this.dtwData], {type: 'text/csv'})
        let url = window.URL.createObjectURL(blob)
        let anchor = document.createElement("a")
        anchor.download = this.modalData.PointID + ' Depth to Water.csv'
        anchor.href = url
        anchor.click()
    }

    downloadDfmCSV() {
        let blob = new Blob([this.dfmData], {type: 'text/csv'})
        let url = window.URL.createObjectURL(blob)
        let anchor = document.createElement("a")
        anchor.download = this.modalData.PointID + ' Divergence from Average.csv'
        anchor.href = url
        anchor.click()
    }
}
