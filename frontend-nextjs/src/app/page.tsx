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

import Link from 'next/link';

export default function Home() {
  return (
    <div className="bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 tracking-tight">
            Welcome to{' '}
            <span className="text-blue-600">Hỏi Dân IT</span>
          </h1>
          <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">
            Fullstack Application với Next.js, NestJS và MongoDB.
            <br />
            Khóa học &quot;Deploy Siêu Tốc&quot; - Học cách triển khai ứng dụng chuyên nghiệp.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/users"
              className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              Quản lý Users
            </Link>
            <a
              href="https://hoidanit.vn"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
            >
              Tìm hiểu thêm
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">
            Công nghệ sử dụng
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Next.js */}
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center mb-4">
              <span className="text-white font-bold text-xl">N</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Next.js
            </h3>
            <p className="text-gray-600">
              React framework mạnh mẽ với App Router, Server Components và nhiều tính năng hiện đại.
            </p>
          </div>

          {/* NestJS */}
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center mb-4">
              <span className="text-white font-bold text-xl">N</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              NestJS
            </h3>
            <p className="text-gray-600">
              Node.js framework với TypeScript, kiến trúc modular, hỗ trợ JWT authentication.
            </p>
          </div>

          {/* MongoDB */}
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mb-4">
              <span className="text-white font-bold text-xl">M</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              MongoDB
            </h3>
            <p className="text-gray-600">
              NoSQL database linh hoạt, sử dụng Mongoose ODM để quản lý dữ liệu.
            </p>
          </div>
        </div>
      </section>

      {/* Docker Section */}
      <section className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Deploy với Docker</h2>
            <p className="mt-4 text-gray-400">
              Sử dụng Docker Compose và Caddy để triển khai ứng dụng
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Docker Compose</h3>
              <pre className="text-sm text-gray-300 overflow-x-auto">
                {`services:
  mongodb:
    image: mongo:7
  backend:
    build: ./backend-nestjs
  frontend:
    build: ./frontend-nextjs
  caddy:
    image: caddy:2-alpine`}
              </pre>
            </div>
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Caddy Reverse Proxy</h3>
              <pre className="text-sm text-gray-300 overflow-x-auto">
                {`:80 {
    handle /api/* {
        reverse_proxy backend:8000
    }
    handle {
        reverse_proxy frontend:3000
    }
}`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-blue-600 rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Bắt đầu ngay hôm nay
          </h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Khám phá chức năng CRUD Users để hiểu cách ứng dụng hoạt động.
          </p>
          <Link
            href="/users"
            className="inline-flex items-center justify-center px-8 py-3 border-2 border-white text-base font-medium rounded-md text-white hover:bg-white hover:text-blue-600 transition-colors"
          >
            Xem danh sách Users
          </Link>
        </div>
      </section>
    </div>
  );
}
