import { LoginRegisterModule } from './login-register.module';

describe('LoginRegisterModule', () => {
  let loginRegisterModule: LoginRegisterModule;

  beforeEach(() => {
    loginRegisterModule = new LoginRegisterModule();
  });

  it('should create an instance', () => {
    expect(loginRegisterModule).toBeTruthy();
  });
});
