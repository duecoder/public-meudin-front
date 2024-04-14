import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { LoginForm } from 'src/app/shared/LoginForm';
import { PersonalForm } from 'src/app/shared/PersonalForm';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  @Input() displayRegisterModal: boolean = true;
  @Input() firstStep: boolean = true;
  @Input() loading: boolean = false;
  // Output abaixo é necessário para poder criar um 0-1/toggle no abrir/fechar do modal de registro
  @Output() closeRegisterModalIndex: EventEmitter<boolean> = new EventEmitter<boolean>();

  items: MenuItem[] = [];

  personalFormData: PersonalForm = new PersonalForm();
  loginFormData: LoginForm = new LoginForm();
  resetFormGroup: boolean = false;

  constructor(
    private messageService: MessageService,
    ) {}

  setLoading(bool: boolean): void {
    this.loading = bool;
  }
  closeModal(): void {
    this.resetFormGroup = true;
    this.displayRegisterModal = false;
    this.closeRegisterModalIndex.emit(true);
    this.firstStep = true;
  }
  // Método para receber a troca de step
  receiveStepBoolean(firstStep: boolean): void {
    this.firstStep = firstStep;
  }
  // Método para receber os dados do componente Personal
  receivePersonalFormData(data: PersonalForm): void {
    this.personalFormData = data;
  }
  // Método para receber os dados do componente Login
  receiveLoginFormData(data: LoginForm): void {
    this.loginFormData = data;
  }
}
