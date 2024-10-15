import { baseApiService } from './BaseApiService';
import { User } from '../../models/entities/User';

class AuthService {
  static getInstance(): AuthService {
    return new AuthService();
  }

  async login(data: {
    username: string;
    password: string;
  }): Promise<{ user: User; token: string }> {
    return baseApiService.post('/auth/login', 'api.auth.login', data, {
      extras: { useAuth: false },
    });
  }

  async fetchMe(): Promise<{ user: User }> {
    return baseApiService.get('/learner/read');
  }

  async fetchCSRFToken(): Promise<{ token: string }> {
    return baseApiService.get('/auth/csrf-token');
  }

  async logout() {
    return baseApiService.post('/auth/logout', 'api.auth.logout');
  }
}

export const authService = AuthService.getInstance();
