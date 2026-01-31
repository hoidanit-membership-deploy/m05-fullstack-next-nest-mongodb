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

'use client';

import { useState } from 'react';
import UserForm from '@/components/users/UserForm';
import ProtectedRoute from '@/components/ProtectedRoute';
import { createUser } from '@/services/user.service';
import type { CreateUserDto, UpdateUserDto } from '@/types/user';

export default function CreateUserPage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (data: CreateUserDto | UpdateUserDto) => {
    setIsLoading(true);
    try {
      await createUser(data as CreateUserDto);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Tạo User mới</h1>
          <p className="mt-1 text-sm text-gray-500">
            Điền thông tin để tạo user mới
          </p>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <UserForm onSubmit={handleSubmit} isLoading={isLoading} />
        </div>
      </div>
    </ProtectedRoute>
  );
}
