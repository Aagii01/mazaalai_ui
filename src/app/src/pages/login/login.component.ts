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
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
    valCheck: string[] = ['remember'];
    password!: string;
    email!: string;
    users: any[] = [];

    msgs: Message[] = [];
    constructor(
        public layoutService: LayoutService,
        public authService: AuthService,
        public messageService: MessageService,
        public router: Router
    ) {}

    ngOnInit(): void {}

    Login() {
        if (!this.password && !this.email) {
            return;
        }
        const credential = {
            password: this.password,
            email: this.email,
        };
        this.authService.login(credential).subscribe((res) => {
            console.log('res: ', res);
            if (res.status === true) {
                localStorage.setItem('token', res.body);
                this.router.navigate(["/"])
            } else {
                this.messageService.add({
                    key: 'tst',
                    severity: 'error',
                    summary: 'Error Message',
                    detail: res.message,
                });
            }
        });
    }
}
