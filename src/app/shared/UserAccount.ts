export class UserAccount {
  id: number;
  name: string;
  surname: string;
  cpf: string;
  email: string;
  username: string;
  password: string;
  confPassword: string;

  constructor(
    id: number = 0,
    name: string = '',
    surname: string = '',
    cpf: string = '',
    email: string = '',
    username: string = '',
    password: string = '',
    confPassword: string = '',
  ) {
    this.id = id;
    this.name = name;
    this.surname = surname;
    this.cpf = cpf;
    this.email = email;
    this.username = username;
    this.password = password;
    this.confPassword = confPassword;
  }
}
