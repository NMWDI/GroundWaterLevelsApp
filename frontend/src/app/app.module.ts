import { NgModule } from '@angular/core';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module'; // CLI imports AppRoutingModule
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { ToastrModule } from 'ngx-toastr';
import { NotificationComponent } from './modules/core/components/notification/notification.component';
import { errorHandlerProviders } from './modules/shared/error/error-handler.service';
import { SharedModule } from './modules/shared/shared.module';
import { CoreModule } from './modules/core/core.module';
import { GroundwaterMapModule } from './modules/features/groundwater-map/groundwater-map.module';

@NgModule({
  declarations: [
    AppComponent, 
    NotificationComponent,
  ],
  imports: [
    
    // "feature" modules
    GroundwaterMapModule,
    
    SharedModule,
    CommonModule,
    CoreModule,
    
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ToastrModule.forRoot({
      toastComponent: NotificationComponent,
    }),
    BrowserAnimationsModule
  ],
  entryComponents: [NotificationComponent],
  providers: [TitleCasePipe, errorHandlerProviders],
  bootstrap: [AppComponent],
})

export class AppModule {}
