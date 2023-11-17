import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GroundwaterMapLayoutComponent } from './modules/features/groundwater-map/components/groundwater-map-layout/groundwater-map-layout.component';

const routes: Routes = [
  {
    path: '',
    component: GroundwaterMapLayoutComponent
  },
  {
    path: '**',
    component: GroundwaterMapLayoutComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      onSameUrlNavigation: 'reload',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
