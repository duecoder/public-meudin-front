import { UserService } from './../../service/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';
import { MessageService } from 'primeng/api';
import { LoadingService } from 'src/app/service/loading.service';
import { ApiStatusService } from 'src/app/service/api-status.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  waitingAPIStatus: boolean = false;

  username: string = '';
  password: string = '';
  emptyUsername: boolean = false;
  emptyPassword: boolean = false;
  loadingStartTime: number = 0;
  loginForm: FormGroup = this.fb.group({
    username: ["", Validators.required],
    password: ["", Validators.required]
  })
  displayRegisterModal = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService,
    private loadingService: LoadingService,
    private userService: UserService,
    private APIService: ApiStatusService
  ) { }

  logIn(): void {
    if (this.loginForm.controls['username'].valid
        && this.loginForm.controls['password'].valid) {
      const loginForm = this.loginForm.value;
      this.username = loginForm.username;
      this.password = loginForm.password;
      this.loadingStartTime = new Date().getTime();
      const minLoadingTime = 400;
      const elapsedTime = new Date().getTime() - this.loadingStartTime;
      const remainingTime = Math.max(0, minLoadingTime - elapsedTime);

      this.loadingService.show();

      this.authService.logIn(this.username, this.password)
      .subscribe({
        next: (response: any) => {
          if (response.success) {
            const token = response.token;
            this.authService.setToken(token);
            localStorage.setItem('token', token);

            setTimeout(() => {
              this.loadingService.hide();
              this.router.navigate(['/home']);
              this.userService.setUserLoggedIn(true);
            }, remainingTime);
          }
        },
        error: (e) => {
          setTimeout(() => {
            this.loadingService.hide();
            this.messageService
            .add({severity: 'error',
                  summary: 'Oops.. there was an error',
                  detail: e.error.message});
          }, remainingTime);
        }
      });
    } else {
      this.emptyUsername = this.loginForm.controls['username'].invalid;
      this.emptyPassword = this.loginForm.controls['password'].invalid;
      setTimeout(() => {
        this.emptyUsername = false;
        this.emptyPassword = false;
      }, 1500);
    }
  }

  registerModal() {
    this.displayRegisterModal = true;
  }

  closeRegisterModalIndex(isClosed: boolean) {
    this.displayRegisterModal = !isClosed;
  }

  forgotPassword(): void {}

  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      localStorage.removeItem('token');
      // this.userService.setUserLoggedIn(false);
    }
    this.authService.logOut();
    const currentRoute = this.router.url;
    if (currentRoute !== '/logout') {
      // A tela index pode vir de 2 caminhos, / e /logout
      // Só vou checar o status da API quando for a rota / (login)
      this.waitingAPIStatus = true;
      this.APIService.checkAPIStatus().subscribe({
        next: () => {
          setTimeout(() => {
            this.waitingAPIStatus = false;
          }, 5000);
        }, error: (e) => {
          console.log(e);
        }
      })
    }
  }
}
