'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { studentsdata } from '@/data/mockData';

// ✅ Validation schema
const studentSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  grade: z.enum(['Grade 9', 'Grade 10', 'Grade 11', 'Grade 12']),
  attendance: z.number().min(0).max(100),
  score: z.number().min(0).max(100),
});

// ✅ Infer TypeScript types from schema
type StudentFormData = z.infer<typeof studentSchema>;

type Student = StudentFormData & { id: number };

function StudentsPage() {
  const [students, setStudents] = useState<Student[]>([]);

  const mockdata = students.length > 0 ? students:  studentsdata 

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<StudentFormData>({
    resolver: zodResolver(studentSchema),
  });

  const onSubmit = (data: StudentFormData) => {
    setStudents([...students, { id: Date.now(), ...data }]);
    reset();
  };

  return (
    <div className="px-10">
      <div className="bg-white p-10 rounded-2xl mb-10">
        <div className="w-lg">
          <h1 className="text-2xl font-bold mb-4">Students</h1>

          {/* ✅ Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mb-6">
            <div>
              <label className="block font-medium mb-1">Student Name</label>
              <input
                {...register('name')}
                className="border p-2 rounded w-full"
                placeholder="Enter name"
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label className="block font-medium mb-1">Grade</label>
              <select
                {...register('grade')}
                className="border p-2 rounded w-full"
                defaultValue=""
              >
                <option value="">Select Grade</option>
                <option value="Grade 9">Grade 9</option>
                <option value="Grade 10">Grade 10</option>
                <option value="Grade 11">Grade 11</option>
                <option value="Grade 12">Grade 12</option>
              </select>
              {errors.grade && (
                <p className="text-red-500 text-sm">{errors.grade.message}</p>
              )}
            </div>

            <div>
              <label className="block font-medium mb-1">Attendance (%)</label>
              <input
                type="number"
                {...register('attendance', { valueAsNumber: true })}
                className="border p-2 rounded w-full"
              />
              {errors.attendance && (
                <p className="text-red-500 text-sm">
                  {errors.attendance.message}
                </p>
              )}
            </div>

            <div>
              <label className="block font-medium mb-1">Score (%)</label>
              <input
                type="number"
                {...register('score', { valueAsNumber: true })}
                className="border p-2 rounded w-full"
              />
              {errors.score && (
                <p className="text-red-500 text-sm">{errors.score.message}</p>
              )}
            </div>

            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Add Student
            </button>
          </form>
        </div>
      </div>

      {/* ✅ Table */}
      <div className="overflow-x-auto bg-white p-4 rounded shadow">
        <table className="min-w-full border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">ID</th>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Grade</th>
              <th className="p-2 border">Attendance</th>
              <th className="p-2 border">Score</th>
            </tr>
          </thead>
          <tbody>
            {mockdata.map((s) => (
              <tr key={s.id} className="hover:bg-gray-50">
                <td className="p-2 border">{s.id}</td>
                <td className="p-2 border">{s.name}</td>
                <td className="p-2 border">{s.grade}</td>
                <td className="p-2 border">{s.attendance}%</td>
                <td className="p-2 border">{s.score}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default StudentsPage;
