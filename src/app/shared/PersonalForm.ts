export class PersonalForm {
  name: string;
  surname: string;
  cpf: string;
  email: string;

  constructor(
    name: string = '',
    surname: string = '',
    cpf: string = '',
    email: string = ''
    ) {
      this.name = name;
      this.surname = surname;
      this.cpf = cpf;
      this.email = email;
  }
}
