import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Credentials } from './models/user.model';
import { BehaviorSubject, Observable, catchError, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginUrl = 'https://fakestoreapi.com/auth/login';
  private isLoggedInSubject: BehaviorSubject<boolean>;
  public isLoggedIn$: Observable<boolean>;
  private token: string | null = null;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  }

  constructor(private http: HttpClient) {
    this.isLoggedInSubject = new BehaviorSubject<boolean>(false);
    this.isLoggedIn$ = this.isLoggedInSubject.asObservable();
  }

  login(username?: string, password?: string) {
    const credentials: Credentials = {
      username,
      password,
    }
    return this.http.post<{token: string}>(this.loginUrl, credentials, this.httpOptions)
      .pipe(
        tap(response => {
          console.log({response});
          this.token = response.token;
          localStorage.setItem('login_token', response.token);
          this.isLoggedInSubject.next(true);
        }),
        catchError(async () => (error: any): void => console.log({error}))
      )
  }

  logout(): void {
    this.isLoggedInSubject.next(false);
    this.token = null;
    localStorage.removeItem('login_token');
  }

  isLoggedIn(): boolean {
    return this.isLoggedInSubject.value;
  }

  setIsLoggedIn(loggedIn: boolean): void {
    this.isLoggedInSubject.next(loggedIn);
  }

  getToken(): string | null {
    return this.token;
  }
}
