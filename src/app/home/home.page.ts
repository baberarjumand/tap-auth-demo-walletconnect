import { Component } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  isModalOpen = false;
  modalText;

  constructor(private authService: AuthService) {}

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  logOut() {
    this.authService.logOut();
  }

  showSessionInfo() {
    // alert(JSON.stringify(this.authService.showCurrentSessionInfo(), null, 4));
    // this.modalText = JSON.stringify(this.authService.showCurrentSessionInfo(), null, 4);
    this.modalText = this.authService.showCurrentSessionInfo();
    this.isModalOpen = true;
  }
}
