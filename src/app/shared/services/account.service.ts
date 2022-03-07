import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserLogin } from 'src/app/shared/models/login';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private apiURL = environment.apiUrl;

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    };

  constructor(private httpClient: HttpClient) { }

  login(data: any): Observable<UserLogin> {
    return this.httpClient.post<UserLogin>(this.apiURL + '/api/auth/login', JSON.stringify(data), this.httpOptions).pipe();
  }

  signOut(): void {
      window.sessionStorage.clear();
  }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(environment.TOKEN_KEY);
    window.sessionStorage.setItem(environment.TOKEN_KEY, token);
  }

  public getToken(): string {
      return sessionStorage.getItem(environment.TOKEN_KEY) || '';
  }

  public saveUser(user: any): void {
    window.sessionStorage.removeItem(environment.USER_KEY);
    window.sessionStorage.setItem(environment.USER_KEY, JSON.stringify(user));
  }

  public getUser(): any {
    return JSON.parse(sessionStorage.getItem(environment.USER_KEY) || '');
  }
}
