import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/shared/services/account.service';

@Component({
  selector: 'app-update-information',
  templateUrl: './update-information.component.html',
  styleUrls: [
    './../../../../../assets/client/assets/css/uikit.css',
    './../../../../../assets/client/assets/css/style.css',
    './../../../../../assets/client/assets/css/tailwind.css',
    './update-information.component.scss']
})
export class UpdateInformationComponent implements OnInit {
  user: any;
  provinces: any;

  genders = [
    {
      'name': 'Nam',
      'val': 0,
    },
    {
      'name': 'Nữ',
      'val': 1,
    },
    {
      'name': 'Khác',
      'val': 3,
    }
  ]
  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
    this.getUser();
    this.getProvinces();
  }

  getUser(): void {
    this.accountService
      .getCurrentUser()
      .subscribe((data: any) => {
        this.user = data;
        console.log(this.user)
      });
  }

  getProvinces(): void {
    this.accountService
      .getProvinces()
      .subscribe((data: any) => {
        this.provinces = data;
      });
  }

}
