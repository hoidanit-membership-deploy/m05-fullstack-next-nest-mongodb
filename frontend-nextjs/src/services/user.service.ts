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

import { fetchApi, getToken } from './api';
import type {
  User,
  CreateUserDto,
  UpdateUserDto,
  ApiResponse,
  PaginatedResponse,
} from '@/types/user';

export async function getUsers(
  page: number = 1,
  limit: number = 10
): Promise<ApiResponse<PaginatedResponse<User>>> {
  const token = getToken();
  return fetchApi<ApiResponse<PaginatedResponse<User>>>(
    `/users?page=${page}&limit=${limit}`,
    { token: token || undefined }
  );
}

export async function getUser(id: string): Promise<ApiResponse<User>> {
  const token = getToken();
  return fetchApi<ApiResponse<User>>(`/users/${id}`, {
    token: token || undefined,
  });
}

export async function createUser(
  data: CreateUserDto
): Promise<ApiResponse<User>> {
  const token = getToken();
  return fetchApi<ApiResponse<User>>('/users', {
    method: 'POST',
    body: JSON.stringify(data),
    token: token || undefined,
  });
}

export async function updateUser(
  id: string,
  data: UpdateUserDto
): Promise<ApiResponse<User>> {
  const token = getToken();
  return fetchApi<ApiResponse<User>>(`/users/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
    token: token || undefined,
  });
}

export async function deleteUser(id: string): Promise<ApiResponse<void>> {
  const token = getToken();
  return fetchApi<ApiResponse<void>>(`/users/${id}`, {
    method: 'DELETE',
    token: token || undefined,
  });
}
