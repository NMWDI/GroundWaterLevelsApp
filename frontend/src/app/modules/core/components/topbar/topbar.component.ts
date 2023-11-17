import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/modules/core/services/notification.service';
import { throwError } from 'rxjs';


interface Flag {
  imageName: string;
  languageName: string;
}

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css'],
})

export class TopbarComponent implements OnInit {

  flagStem = 'assets/images/flags/';
  flagList: Flag[] = [
    {imageName: 'us.jpg', languageName: 'English'},
    {imageName: 'germany.jpg', languageName: 'German'},
    {imageName: 'italy.jpg', languageName: 'Italian'},
    {imageName: 'spain.jpg', languageName: 'Spanish'},
    {imageName: 'russia.jpg', languageName: 'Russian'}];
  selectedFlag: Flag = this.flagList[0];

  constructor(
    private notificationService: NotificationService,
    private router: Router,
  ) {}

  ngOnInit(): void {

  }

  logout(): void {
      // Assume Session is expired, but there could be other weird issues
      this.notificationService.showSuccess('Logged Out', 'Sucess');
      this.routeToLogin();
  }

  routeToLogin(): void {
    this.router.navigate(['/login']);
  }

  createImagePath(flag: Flag) {
    return this.flagStem + flag.imageName;
  }

  selectFlag(newFlag: Flag): void {
    this.onUpdateFlag(newFlag);
    this.selectedFlag = newFlag;
  }

  onUpdateFlag(newFlag: Flag): void {
    if (newFlag === this.selectedFlag) {
      return;
    }

  }
}
