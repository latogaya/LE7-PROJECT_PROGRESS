import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import ValidateForm from 'src/app/helpers/validateform';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisComponent implements OnInit {
  regisForm!: FormGroup;
  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {}
  ngOnInit(): void {
    this.regisForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }
  ClickRegis() {
    if(this.regisForm.valid) {
      console.log(this.regisForm.value)
      this.auth.regis(this.regisForm.value)
      .subscribe({
        next:(res)=>{
          alert(res.message);
          this.regisForm.reset();
          this.router.navigate(['']);
        },
        error:(err)=>{
          alert(err?.error.message)
        }
      })
    }else {
      ValidateForm.validateAllFormFields(this.regisForm);
    }
  }
}