import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, RequiredValidator } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AuthService } from 'src/app/service/auth.service';
import { LoadingService } from 'src/app/service/loading.service';
import { UserService } from 'src/app/service/user.service';
import { UserAccount } from 'src/app/shared/UserAccount';
import { formatCpf } from 'src/app/util/cpf-mask.directive';

@Component({
  selector: 'app-info-tab',
  templateUrl: './info-tab.component.html',
  styleUrls: ['./info-tab.component.css', '../../spends/spends.component.css', '../account.component.css']
})
export class InfoTabComponent {
  userId: number = 0;
  userData: UserAccount = new UserAccount();
  accountForm: FormGroup = this.fb.group({
    id: [""],
    name: ["", Validators.required],
    surname: ["", Validators.required],
    cpf: new FormControl({value: '', disabled: true}),
    email: ["", [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}")]],
    username: ["", [Validators.required, Validators.pattern(/^[A-Za-z\d.\W_]{6,}$/)]],
    password: new FormControl({value: '', disabled: true}),
    confPassword: new FormControl({value: '', disabled: true})
  });
  editPassword: boolean = false;
  // form validation variables
  emptyPassword: boolean = false;
  emptyConfPassword: boolean = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private messageService: MessageService,
    private loadingService: LoadingService,
    private authService: AuthService,
    private confirmationService: ConfirmationService

  ) {
    const userIdString = localStorage.getItem('userId');
    this.userId = userIdString ? +userIdString : 0;
    this.loadingService.show();
    this.userService.getUserData(this.userId).subscribe({
      next: (data) => {
        this.userData = data;
        this.accountForm.controls['name'].setValue(this.userData.name);
        this.accountForm.controls['surname'].setValue(this.userData.surname);
        this.accountForm.controls['cpf'].setValue(formatCpf(this.userData.cpf));
        this.accountForm.controls['email'].setValue(this.userData.email);
        this.accountForm.controls['username'].setValue(this.userData.username);
        this.accountForm.controls['password'].setValue('********');
        this.accountForm.controls['confPassword'].setValue('********');
        this.loadingService.hide();
      },
      error: (e) => {
        console.log(e.error);
      }
    })
  }

  saveData(): void {
    if (this.validateFields()) {
      if (this.fieldsUpdated()) {
        const newUserData: UserAccount = this.getFormValues();
        if (!this.editPassword) {
          newUserData.password = '';
          newUserData.confPassword = '';
        }
        this.loadingService.show();
        this.userService.updateUserData(newUserData).subscribe({
          next: (response: any) => {
            if (response.success) {
              setTimeout(() => {
                const token = response.message;
                this.authService.setToken(token);
                localStorage.setItem('token', token);
                localStorage.setItem('displayName', newUserData.name);

                this.loadingService.hide();

                this.confirmationService.confirm({
                  message: 'Data updated successfully!',
                  header: 'Success!',
                  icon: 'pi pi-check',
                  accept: () => {
                    location.reload();
                  }
                });
              }, 600)
            } else {
              this.loadingService.hide();
              this.messageService.add({
                severity: 'error', summary: 'Oops..', detail: response.message
              });
            }
          },
          error: (e) => {
            this.loadingService.hide();
            this.messageService.add({
              severity: 'error', summary: 'Oops..', detail: 'Something went wrong'
            });
          }
        })
      } else {
        this.messageService.add({
          severity: 'warn', summary: 'Warning', detail: 'No data was changed'
        });
      }
    } else {
      this.messageService.add({
        severity: 'error', summary: 'Error', detail: 'Enter required data'
      });
    }
  }

  validateFields(): boolean {
    if (this.editPassword) {
      this.emptyPassword = this.accountForm.controls['password'].invalid;
      this.emptyConfPassword = this.accountForm.controls['confPassword'].invalid;

      setTimeout(() => {
        this.emptyPassword = false;
        this.emptyConfPassword = false;
      }, 3000);

      return !this.emptyPassword || !this.emptyConfPassword;
    }

    if (!this.accountForm.valid) return false;

    return true;
  }

  fieldsUpdated(): boolean {
    const nameUpdated = this.accountForm.controls['name'].value != this.userData.name;
    const surnameUpdated = this.accountForm.controls['surname'].value != this.userData.surname;
    const emailUpdated = this.accountForm.controls['email'].value != this.userData.email;
    const usernameUpdated = this.accountForm.controls['username'].value != this.userData.username;

    return nameUpdated || surnameUpdated || emailUpdated || usernameUpdated || this.editPassword;
  }

  togglePasswordEdit(): void {
    if (this.editPassword) {
      this.accountForm.controls['password'].enable();
      this.accountForm.controls['password']
      .addValidators([Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d.\W_]{8,}$/)]);
      this.accountForm.controls['confPassword'].enable();
      this.accountForm.controls['confPassword']
      .addValidators([Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d.\W_]{8,}$/)]);
      this.accountForm.controls['password'].setValue('');
      this.accountForm.controls['confPassword'].setValue('');
    } else {
      this.accountForm.controls['password'].disable();
      this.accountForm.controls['password']
      .removeValidators([Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d.\W_]{8,}$/)]);
      this.accountForm.controls['confPassword'].disable();
      this.accountForm.controls['confPassword']
      .removeValidators([Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d.\W_]{8,}$/)]);
      this.accountForm.controls['password'].setValue('********');
      this.accountForm.controls['confPassword'].setValue('********');
    }
  }

  getFormValues(): UserAccount {
    return new UserAccount(
      this.userId,
      this.accountForm.get('name')?.value,
      this.accountForm.get('surname')?.value,
      this.accountForm.get('cpf')?.value.replace(/\D/g, ''),
      this.accountForm.get('email')?.value,
      this.accountForm.get('username')?.value,
      this.accountForm.get('password')?.value,
      this.accountForm.get('confPassword')?.value
    );
  }
}
