import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { RouterModule } from '@angular/router';

import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    CheckboxModule,
    FormsModule,
    PasswordModule,
    InputTextModule,
    RouterModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  valCheck: string[] = ['remember'];
  password!: string;
  users: any[] = [];

  constructor(public layoutService: LayoutService,private userService: UserService) { }

  ngOnInit(): void {
    this.loadUsers();
  }


  loadUsers(): void {
    this.userService.getUsers().subscribe(data => {
      console.log('data: ', data);
      this.users = data;
    }, error => {
      console.error('There was an error!', error);
    });
  }
}
