import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import ValidateForm from 'src/app/helpers/validateform';
import { AuthService } from 'src/app/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  constructor(private fb: FormBuilder,
    private AuthService: AuthService,
    private tokenStorage: TokenStorageService,
    private http: HttpClient,
    private route: Router) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
    if(this.tokenStorage.getToken()){
      this.AuthService.isLoggedIn = true;
      this.route.navigate([this.AuthService.redirectUrl]);
    }
  }

  ClickLogin() {
    if(this.loginForm.valid) {
      console.log(this.loginForm.value)

      this.AuthService.login(this.loginForm.value)
      .subscribe({
        next:(res)=>{
          alert("Login Successful!");
        },
        error:(err)=>{
          alert("Invalid credentials!")
        }
      })
    }else {
      console.log("Form is not valid")
      ValidateForm.validateAllFormFields(this.loginForm);
      alert("Your form is invalid.")
    }

    const postData: LoginPostData = {
      id_token: '',
      id: 0,
      username: this.loginForm.value.username,
      password: this.loginForm.value.password
    };

    this.http.post<LoginPostData>("https://localhost:7054/api/Login/login", postData).subscribe( data => {
      this.tokenStorage.saveToken(data.id_token);
      this.tokenStorage.saveUser(data.id);
      window.location.reload();
    })
  }

}
export interface LoginPostData{
  id_token: string;
  id: number;
  username: string;
  password: string;
}
