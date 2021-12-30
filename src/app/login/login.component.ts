import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from '../shared/models/user.model';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isLogin: boolean = true; 
  showValidationErrors: boolean = false; 
  notExistedError: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<LoginComponent>, 
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  onFormSubmit(form: NgForm) {
    if (form.invalid) return this.showValidationErrors = true;

    const user: User = {
      email: form.value.email, 
      password: form.value.password
    }
    
    if(this.isLogin){
      this.authService.login(user.email, user.password).subscribe((result: User[]) => {
        if(result.length > 0){
            this.authService.addUserToStorage(result[0]); 
        }else{
          this.showValidationErrors = true; 
          this.notExistedError = true; 
        }
      }, 
      () => {
        this.showValidationErrors = true; 
        this.notExistedError = true; 
      });
    }else{
        this.authService.register(user);
    }
    return; 
  }

  close() {
    this.dialogRef.close()
  }

  toggleLogin(){
    this.isLogin = !this.isLogin;
    this.showValidationErrors = false; 
    this.notExistedError = false; 
  }
}
