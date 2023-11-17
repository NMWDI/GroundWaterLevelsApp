import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { FooterComponent } from './components/footer/footer.component';
import { PageTitleBoxComponent } from './components/page-title-box/page-title-box.component';
import { RightSidebarComponent } from './components/right-sidebar/right-sidebar.component';
import { TopbarComponent } from './components/topbar/topbar.component';

@NgModule({
  declarations: [
    FooterComponent,
    PageTitleBoxComponent,
    RightSidebarComponent,
    TopbarComponent,
  ],
  exports: [
    FooterComponent,
    PageTitleBoxComponent,
    RightSidebarComponent,
    TopbarComponent,
  ],
  imports: [SharedModule],
})
export class CoreModule {}
