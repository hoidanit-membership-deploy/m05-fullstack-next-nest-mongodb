/*
 * Author: Hỏi Dân IT - @hoidanit
 *
 * This source code is developed for the course
 * "Deploy Siêu Tốc".
 * It is intended for educational purposes only.
 * Unauthorized distribution, reproduction, or modification is strictly prohibited.
 *
 * Copyright (c) 2026 Hỏi Dân IT. All Rights Reserved.
 */

import { fetchApi, setToken, removeToken, getToken } from './api';
import type {
  LoginDto,
  RegisterDto,
  AuthResponse,
  ApiResponse,
  User,
} from '@/types/user';

export async function login(
  data: LoginDto
): Promise<ApiResponse<AuthResponse>> {
  const response = await fetchApi<ApiResponse<AuthResponse>>('/auth/login', {
    method: 'POST',
    body: JSON.stringify(data),
  });

  if (response.data.access_token) {
    setToken(response.data.access_token);
  }

  return response;
}

export async function register(
  data: RegisterDto
): Promise<ApiResponse<User>> {
  return fetchApi<ApiResponse<User>>('/auth/register', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function getProfile(): Promise<ApiResponse<User>> {
  const token = getToken();
  return fetchApi<ApiResponse<User>>('/auth/profile', {
    token: token || undefined,
  });
}

export function logout(): void {
  removeToken();
}

export function isAuthenticated(): boolean {
  return !!getToken();
}
