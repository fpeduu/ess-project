export class SessionService {
  private sessionManager: Storage;

  constructor() {
    this.sessionManager = sessionStorage;
  }

  public getUser() {
    const stringfiedUser = this.sessionManager.getItem('user');
    if (!stringfiedUser) return null
    try {
      return JSON.parse(stringfiedUser);
    } catch(error) {
      this.sessionManager.removeItem('user');
      return null;
    }
  }

  public setUser(user: {id: string, name: string, role: string, cpf: string, email: string}) {
    this.sessionManager.setItem('user', JSON.stringify(user));
  }

  public clearUser() {
    this.sessionManager.removeItem('user');
  }
}
