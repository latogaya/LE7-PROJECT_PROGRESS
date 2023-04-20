import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from './services/token-storage.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'PCIAngular';

  //newly added code
  userKey: string | null = window.sessionStorage.getItem('USER_KEY');
  tokenKey: string | null = window.sessionStorage.getItem('TOKEN_KEY');
  //
  
  constructor(private http: HttpClient, private route: Router, private tokenStorage: TokenStorageService) {}

}
