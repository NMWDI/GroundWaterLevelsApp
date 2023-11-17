import { NgModule } from '@angular/core';
import { NgbCollapseModule, NgbDropdownModule, NgbModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { NgApexchartsModule } from 'ng-apexcharts';
import { NgDygraphsModule } from 'ng-dygraphs';
import { SharedModule } from '../../shared/shared.module';
import { WaterUseWidgetComponent } from './components/water-use-widget/water-use-widget.component';
import { ActiveWellsWidgetComponent } from './components/active-wells-widget/active-wells-widget.component';
import { GroundwaterMapLayoutComponent } from './components/groundwater-map-layout/groundwater-map-layout.component';
import { LeafletMapComponent } from './components/leaflet-map/leaflet-map.component';
import { WellTrendsWidgetComponent } from './components/well-trends-widget/well-trends-widget.component';
import { RegionSelectionComponent } from './components/region-selection/region-selection.component';
import { WellModalComponent } from './components/well-modal/well-modal.component';
import { LayersService } from './services/layers.service';
import { RegionSelectionService } from './services/region-selection.service';
import { NumWellsWidgetComponent } from './components/num-wells-widget/num-wells-widget.component';
import { FontAwesomeModule, FaIconLibrary  } from '@fortawesome/angular-fontawesome'

@NgModule({
  declarations: [
    GroundwaterMapLayoutComponent,
    ActiveWellsWidgetComponent,
    NumWellsWidgetComponent,
    LeafletMapComponent,
    RegionSelectionComponent,
    WellModalComponent,
    WellTrendsWidgetComponent,
    WaterUseWidgetComponent
  ],
  imports: [SharedModule, NgApexchartsModule, NgbModule, NgbDropdownModule, NgDygraphsModule, NgbCollapseModule, NgbTooltipModule,FontAwesomeModule],
  providers: [LayersService, RegionSelectionService]
})
export class GroundwaterMapModule {}
