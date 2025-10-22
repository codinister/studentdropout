'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { academicrecorddata } from '@/data/mockData';


// ✅ Schema definition
const academicSchema = z.object({
  studentId: z.string().min(1, 'Student ID is required'),
  subject: z.string().min(2, 'Subject must be at least 2 characters'),
  score: z
    .number()
    .min(0, 'Score must be at least 0')
    .max(100, 'Score must be 100 or less'),
});

// ✅ Infer type from schema
type AcademicForm = z.infer<typeof academicSchema>;

// ✅ Record type with ID
interface AcademicRecord extends AcademicForm {
  id: number;
}

function AcademicRecordsPage(): React.ReactElement {

  const [records, setRecords] = useState<AcademicRecord[]>([]);

  const academicdata = records.length > 0 ? records : academicrecorddata;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AcademicForm>({
    resolver: zodResolver(academicSchema),
  });

  const onSubmit = (data: AcademicForm) => {
    setRecords((prev) => [...prev, { id: Date.now(), ...data }]);
    reset();
  };

  return (
    <div className="px-10">
      <div className="bg-white p-10 rounded-2xl mb-10">
        <div className="w-lg">
          <h1 className="text-2xl font-bold mb-4">Academic Records</h1>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mb-6">
            <div>
              <label>Student ID</label>
              <input
                {...register('studentId')}
                className="border p-2 rounded w-full"
              />
              {errors.studentId && (
                <p className="text-red-500">{errors.studentId.message}</p>
              )}
            </div>

            <div>
              <label>Subject</label>
              <input
                {...register('subject')}
                className="border p-2 rounded w-full"
              />
              {errors.subject && (
                <p className="text-red-500">{errors.subject.message}</p>
              )}
            </div>

            <div>
              <label>Score (%)</label>
              <input
                type="number"
                {...register('score', { valueAsNumber: true })}
                className="border p-2 rounded w-full"
              />
              {errors.score && (
                <p className="text-red-500">{errors.score.message}</p>
              )}
            </div>

            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Add Record
            </button>
          </form>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white p-4 rounded shadow">
        <table className="min-w-full border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">ID</th>
              <th className="p-2 border">Student ID</th>
              <th className="p-2 border">Subject</th>
              <th className="p-2 border">Score</th>
            </tr>
          </thead>
          <tbody>
            {academicdata.map((r) => (
              <tr key={r.id} className="hover:bg-gray-50">
                <td className="p-2 border">{r.id}</td>
                <td className="p-2 border">{r.studentId}</td>
                <td className="p-2 border">{r.subject}</td>
                <td className="p-2 border">{r.score}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AcademicRecordsPage;
