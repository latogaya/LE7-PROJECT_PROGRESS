import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor(private route: Router) { }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem('TOKEN_KEY');
    window.sessionStorage.setItem('TOKEN_KEY', token);
  }

  public getToken(): string | null {
    return window.sessionStorage.getItem('TOKEN_KEY');
  }

  public saveUser(id: number): void {
    console.log(id);
    let strId = id.toString();
    window.sessionStorage.removeItem('USER_KEY');
    window.sessionStorage.setItem('USER_KEY', strId);
    }
}