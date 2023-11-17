import { HttpClient } from '@angular/common/http';
import {
    Injectable,
} from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { JSONLayers } from '../interfaces/JSONLayers';
import { environment } from '../../../../../environments/environment'

@Injectable({ providedIn: 'root' })
export class LayersService {
    constructor(
        private http: HttpClient
    ) {}

    // Get all JSON layers from the bucket
    returnJSONLayers(): Observable<JSONLayers> {
        const observable = new Observable<JSONLayers>((subscriber) => {
            forkJoin({
                basinJSON: this.http.get<any>(environment.BucketURL + '/geojson/declared_groundwater_basins_lat_lon.geojson'),
                projectRegionsJSON: this.http.get<any>(environment.BucketURL + '/geojson/thornburg_project_regions_lat_lon.geojson'),
                wellPointsJSON: this.http.get<any>(environment.BucketURL + '/geojson/well_points.geojson'),
                countiesJSON: this.http.get<any>(environment.BucketURL + '/geojson/counties.geojson'),
                suggestedMonitoringRegionsJSON: this.http.get<any>(environment.BucketURL + '/geojson/suggested_monitoring_regions.geojson'),

            }).subscribe((res) => {
                const jsonLayers: JSONLayers = {
                    groundwaterBasins: res.basinJSON,
                    projectRegions: res.projectRegionsJSON,
                    wellPoints: res.wellPointsJSON,
                    counties: res.countiesJSON,
                    suggestedMonitoringRegions: res.suggestedMonitoringRegionsJSON
                }
                subscriber.next(jsonLayers)
                subscriber.complete()
            })
        })
        return observable
    }
}
