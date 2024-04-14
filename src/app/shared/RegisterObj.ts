import { LoginForm } from "./LoginForm";
import { PersonalForm } from "./PersonalForm";

export class RegisterObj {
  name: string;
  surname: string;
  cpf: number;
  email: string;
  username: string;
  password: string;
  confPassword: string;

  constructor(
    personal: PersonalForm,
    login: LoginForm
    ) {
      this.name = personal.name;
      this.surname = personal.surname;
      this.cpf = parseInt(personal.cpf.replace(/\D/g, ''));
      this.email = personal.email;
      this.username = login.username;
      this.password = login.password;
      this.confPassword = login.confPassword;
  }
}
