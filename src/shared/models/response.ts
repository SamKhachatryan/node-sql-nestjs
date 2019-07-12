
export class ResponseModel<T = any> {
  data: T;
  success: boolean;
  message: string;

  constructor(data: ResponseModel) {
    this.data = data.data;
    this.message = data.message || 'ok';
    this.success = !!data.success;
  }
}
