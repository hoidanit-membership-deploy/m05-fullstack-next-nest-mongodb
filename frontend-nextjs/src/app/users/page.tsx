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

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import UserTable from '@/components/users/UserTable';
import ProtectedRoute from '@/components/ProtectedRoute';
import { getUsers, deleteUser } from '@/services/user.service';
import type { User, PaginationMeta } from '@/types/user';

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [meta, setMeta] = useState<PaginationMeta>({
    totalItems: 0,
    itemCount: 0,
    itemsPerPage: 10,
    totalPages: 0,
    currentPage: 1,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchUsers = useCallback(async (page: number = 1) => {
    try {
      setLoading(true);
      const response = await getUsers(page);
      setUsers(response.data.items);
      setMeta(response.data.meta);
      setError('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch users');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleDelete = async (id: string) => {
    if (!confirm('Bạn có chắc chắn muốn xóa user này?')) {
      return;
    }

    try {
      await deleteUser(id);
      fetchUsers(meta.currentPage);
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to delete user');
    }
  };

  const handlePageChange = (page: number) => {
    fetchUsers(page);
  };

  return (
    <ProtectedRoute>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="sm:flex sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Quản lý Users</h1>
            <p className="mt-1 text-sm text-gray-500">
              Danh sách tất cả users trong hệ thống
            </p>
          </div>
          <div className="mt-4 sm:mt-0">
            <Link
              href="/users/create"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              + Thêm User
            </Link>
          </div>
        </div>

        {error && (
          <div className="mb-4 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
            {error}
          </div>
        )}

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="mt-2 text-gray-500">Đang tải...</p>
          </div>
        ) : users.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <p className="text-gray-500">Chưa có user nào.</p>
            <Link
              href="/users/create"
              className="mt-4 inline-flex items-center text-blue-600 hover:text-blue-800"
            >
              Tạo user đầu tiên
            </Link>
          </div>
        ) : (
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <UserTable
              users={users}
              meta={meta}
              onDelete={handleDelete}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}
