import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { Router, RouterModule } from '@angular/router';
import { Message, MessageService } from 'primeng/api';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { User } from 'src/app/interfaces/user';

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
        RouterModule,
        MessagesModule,
        MessageModule,
        ToastModule,
    ],
    providers: [MessageService],
    templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export class SignInComponent implements OnInit {
    valCheck: string[] = ['remember'];
    
    user: User = {}

    msgs: Message[] = [];
    constructor(
        public layoutService: LayoutService,
        public authService: AuthService,
        public messageService: MessageService,
        public router: Router,
        public userService:UserService
    ) {}

    ngOnInit(): void {}

    SignIn() {
        if (!this.user.password && !this.user.email ) {
            return;
        }

        this.user.type = 1;
       this.userService.createUser(this.user).subscribe((result)=>{
        this.messageService.add({
            key: 'tst',
            severity: 'error',
            summary: 'Error Message',
            detail: result.message,
        });
        if(result.status === true){
          this.router.navigate(['/auth/login'])
        }
       })
    }
}
