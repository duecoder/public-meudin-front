import { MessageService } from 'primeng/api';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterService } from 'src/app/service/register.service';
import { LoginForm } from 'src/app/shared/LoginForm';
import { PersonalForm } from 'src/app/shared/PersonalForm';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Input() inputLoginForm: LoginForm = new LoginForm();
  @Input() personalForm: PersonalForm = new PersonalForm();
  @Output() loginFormSubmit: EventEmitter<LoginForm> = new EventEmitter<LoginForm>();
  @Output() firstStep: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() closeModalEmit: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() loadingEmit: EventEmitter<boolean> = new EventEmitter<boolean>();

  formGroup = this.fb.group({
    username: ["", [
      Validators.required,
      Validators.pattern(/^[A-Za-z\d.\W_]{6,}$/)
    ]],
    password: ["", [
      Validators.required,
      Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d.\W_]{8,}$/)
    ]],
    confPassword: ["", [
      Validators.required,
      Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d.\W_]{8,}$/)
    ]]
  })
  loginForm: LoginForm = new LoginForm();
  // form-control variables
  usernameEmpty: boolean = false;
  passwordEmpty: boolean = false;
  passwordConfEmpty: boolean = false;
  error: boolean = false;
  errorMsg: String = 'Username already in use';

  constructor(
    private fb: FormBuilder,
    private service: RegisterService,
    private messageService: MessageService
  ) {}

  closeModal(): void {
    this.closeModalEmit.emit(true);
  }

  register(): void {
    this.validateForm();

    if (this.formGroup.valid) {
      this.loadingEmit.emit(true);

      this.loginForm.username = this.formGroup.controls['username'].value || '';
      this.loginForm.password = this.formGroup.controls['password'].value  || '';
      this.loginForm.confPassword = this.formGroup.controls['confPassword'].value  || '';
      this.loginFormSubmit.emit(this.loginForm);
      this.service.register(this.personalForm, this.loginForm)
      .subscribe({
        next: (response: any) => {
          if (response.success) {
            setTimeout(() => {
              this.loadingEmit.emit(false);
              this.closeModal();
              this.messageService.add({
                severity: 'success', summary: 'Success!', detail: String(response.message)
              });
            }, 1800);
          } else {
            setTimeout(() => {
              this.loadingEmit.emit(false);
              this.error = true;
              this.errorMsg = response.message;
            }, 1400);
            setTimeout(() => {
              this.error = false;
              this.errorMsg = '';
            }, 5000);
          }
        },
        error: (e) => {
          console.error(e);
        }
      });
    }
  }

  prevPage(): void {
    this.loginForm.username = this.formGroup.controls['username'].value || '';
    this.loginForm.password = this.formGroup.controls['password'].value  || '';
    this.loginForm.confPassword = this.formGroup.controls['confPassword'].value  || '';

    this.loginFormSubmit.emit(this.loginForm);
    this.firstStep.emit(true);
  }

  validateForm(): void {
    this.usernameEmpty = this.formGroup.controls['username'].invalid;
    this.passwordEmpty = this.formGroup.controls['password'].invalid;
    this.passwordConfEmpty = this.formGroup.controls['confPassword'].invalid;

    setTimeout(() => {
      this.usernameEmpty = false;
      this.passwordEmpty = false;
      this.passwordConfEmpty = false;
    }, 2000);
  }

  ngOnInit(): void {
    this.formGroup.controls['username'].setValue(this.inputLoginForm.username);
    this.formGroup.controls['password'].setValue(this.inputLoginForm.password);
    this.formGroup.controls['confPassword'].setValue(this.inputLoginForm.confPassword);
  }
}
