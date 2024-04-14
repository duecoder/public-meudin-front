export class ResponseJson {
  success: boolean;
  message: string;

  constructor(
    success: boolean = false,
    message: string = ''
    ) {
      this.success = success;
      this.message = message;
  }
}
