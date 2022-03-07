import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../../../shared/services/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [
    './../../../../assets/client/assets/css/tailwind.css',
    './login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(public router: Router,
    private ngZone: NgZone,
    private authService: AccountService) { }
  
    form: any = {};
    isLoggedIn = false;
    isLoginFailed = false;
    errorMessage = '';

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.authService.login(this.form).subscribe(
      data => {
          console.log(data.token);
        this.authService.saveToken(data.token);
        this.authService.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.ngZone.run(() => this.router.navigateByUrl('/admin'))
        // this.reloadPage();
      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
  }

}
