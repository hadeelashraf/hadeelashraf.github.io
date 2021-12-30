import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from 'src/app/login/login.component';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  i = 0;
  txt = 'Organize your tasks in one easy to use app'; /* The text */
  desc: any;
  int:any; 
  isAuth: boolean = false; 
  
  typeWriter() {
    this.int = setInterval(() => {
      if (this.i < this.txt.length) {
        this.desc.innerHTML += this.txt.charAt(this.i);
        this.i++;
      }else{
        this.clear()
      }
    }, 
    50);
  }

  constructor(private dialog: MatDialog, 
    private authService: AuthService) {
      this.isAuth = this.authService.isAuthenticated(); 
  }

  ngOnInit(): void {
    this.desc = document.getElementById("description"); 
    this.typeWriter(); 
  }

  clear(){
    window.clearInterval(this.int)
  }

  login() {
    let dialogRef = this.dialog.open(LoginComponent, {
      width: '400px'
    });
  }

  logout(){
    this.authService.logout();
  } 
}
