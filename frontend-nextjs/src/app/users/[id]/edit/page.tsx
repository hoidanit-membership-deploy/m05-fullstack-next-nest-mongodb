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

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import UserForm from '@/components/users/UserForm';
import ProtectedRoute from '@/components/ProtectedRoute';
import { getUser, updateUser } from '@/services/user.service';
import type { User, UpdateUserDto } from '@/types/user';

interface EditUserPageProps {
  params: Promise<{ id: string }>;
}

export default function EditUserPage({ params }: EditUserPageProps) {
  const { id } = use(params);
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getUser(id);
        setUser(response.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch user');
      } finally {
        setFetchLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  const handleSubmit = async (data: UpdateUserDto) => {
    setIsLoading(true);
    try {
      await updateUser(id, data);
    } finally {
      setIsLoading(false);
    }
  };

  if (fetchLoading) {
    return (
      <ProtectedRoute>
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="mt-2 text-gray-500">Đang tải...</p>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  if (error) {
    return (
      <ProtectedRoute>
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
            {error}
          </div>
          <button
            onClick={() => router.push('/users')}
            className="mt-4 text-blue-600 hover:text-blue-800"
          >
            Quay lại danh sách
          </button>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Chỉnh sửa User</h1>
          <p className="mt-1 text-sm text-gray-500">
            Cập nhật thông tin user
          </p>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          {user && (
            <UserForm user={user} onSubmit={handleSubmit} isLoading={isLoading} />
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}
