export class LoginForm {
  username: string;
  password: string;
  confPassword: string;

  constructor(
    username: string = '',
    password: string = '',
    confPassword: string = ''
    ) {
      this.username = username;
      this.password = password;
      this.confPassword = confPassword;
  }
}
