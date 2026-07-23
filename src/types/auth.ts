/**
 * Authentication related types
 */

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  email: string;
  password: string;
  name: string;
  phone?: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
}

export interface OTPRequest {
  email: string;
  otp: string;
}

export interface OTPResponse {
  verified: boolean;
  message: string;
}

export interface PasswordResetRequest {
  email: string;
}

export interface PasswordResetConfirm {
  token: string;
  newPassword: string;
}

export interface AuthState {
  isLoading: boolean;
  isSignout: boolean;
  userToken: string | null;
  user: {
    id: string;
    email: string;
    name: string;
  } | null;
}
