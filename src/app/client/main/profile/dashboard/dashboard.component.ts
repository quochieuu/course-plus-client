import { Component, NgZone, OnInit } from '@angular/core';
import { AccountService } from 'src/app/shared/services/account.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [
    './../../../../../assets/client/assets/css/uikit.css',
    './../../../../../assets/client/assets/css/style.css',
    './../../../../../assets/client/assets/css/tailwind.css',
    './dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  user: any;
  constructor(private accountService: AccountService,
    private ngZone: NgZone) { }

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    this.accountService
      .getCurrentUser()
      .subscribe((data: any) => {
        this.user = data;
        console.log(this.user)
      });
  }

}
