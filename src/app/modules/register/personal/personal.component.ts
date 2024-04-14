import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { RegisterService } from 'src/app/service/register.service';
import { PersonalForm } from 'src/app/shared/PersonalForm';
import { cpfValidator } from 'src/app/util/cpf-validator';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.css']
})
export class PersonalComponent implements OnInit {
  @Input() form: PersonalForm = new PersonalForm();
  @Input() resetFormGroup: boolean = false;
  @Output() personalFormSubmit: EventEmitter<PersonalForm> = new EventEmitter<PersonalForm>();
  @Output() firstStep: EventEmitter<any> = new EventEmitter<any>();

  formGroup = this.fb.group({
    name: ["", Validators.required],
    surname: ["", Validators.required],
    // cpf: ["", [Validators.required, cpfValidator()]],
    email: ["", [
      Validators.required,
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}")
    ]]
  })
  finalForm: PersonalForm = new PersonalForm();
  // form-control variables
  nameEmpty: boolean = false;
  surnameEmpty: boolean = false;
  cpfEmpty: boolean = false;
  emailEmpty: boolean = false;
  inputCpf: string = '';
  existentCpf: boolean = false;
  existentEmail: boolean = false;

  constructor(
    private fb: FormBuilder,
    private service: RegisterService
  ) { }

  nextPage(): void {
    this.validateForm();
    if (this.formGroup.valid) {
      // this.validateCpf().subscribe((response) => {
        // if (!response) {
          // CPF Bypass
          // Caso response false, significa que o cpf está disponível
          this.finalForm.name = this.formGroup.controls['name'].value || '';
          this.finalForm.surname = this.formGroup.controls['surname'].value  || '';
          // Bypass no cpf enquanto for vBeta
          // this.finalForm.cpf = this.formGroup.controls['cpf'].value  || '';
          this.finalForm.cpf = '11111111111';
          this.finalForm.email = this.formGroup.controls['email'].value  || '';

          this.personalFormSubmit.emit(this.finalForm);
          this.firstStep.emit(false);
        } else {
          // Response sendo true, significa que o cpf já existe
          this.existentCpf = true;
          setTimeout(() => {
            this.existentCpf = false;
          }, 5000)
        // }
      // });
      return;
    }
  }

  validateForm(): void {
    this.nameEmpty = this.formGroup.controls['name'].invalid;
    this.surnameEmpty = this.formGroup.controls['surname'].invalid;
    // CPF Bypass
    // this.cpfEmpty = this.formGroup.controls['cpf'].invalid;
    this.emailEmpty = this.formGroup.controls['email'].invalid;

    setTimeout(() => {
      this.nameEmpty = false;
      this.surnameEmpty = false;
      this.cpfEmpty = false;
      this.emailEmpty = false;
    }, 2500);
  }

  // CPF Bypass
  // validateCpf(): Observable<Boolean> {
  //   let cpfStr = this.formGroup.controls['cpf'].value || '';
  //   const cpf = parseInt(cpfStr.replace(/[\s.-]*/igm, ''));
  //   return this.service.verifyExistentCpf(cpf);
  // }

  cleanPersonalForm(): void {
    this.formGroup.reset();
  }

  ngOnInit() {
    this.formGroup.controls['name'].setValue(this.form.name);
    this.formGroup.controls['surname'].setValue(this.form.surname);
    // CPF Bypass
    // this.formGroup.controls['cpf'].setValue(this.form.cpf);
    this.formGroup.controls['email'].setValue(this.form.email);
  }
}
