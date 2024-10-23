export enum LoginError {
  MissingEmailField = 'Enter your email address',
  MissingPasswordField = 'Enter your password',
  InvalidCredentials = 'Invalid email or password.',
}

export type UserCredentials = {
  email: string;
  password: string;
};
