export interface IAlert {
  active: boolean;
  message: string;
  type: string;
}

export interface IFormValidation {
  error: boolean;
  message: string;
  type?: string;
}
