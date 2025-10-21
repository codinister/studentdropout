'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { interventionrecords } from '@/data/mockData';
import useProtectedPage from '@/utils/useProtectedPage';

// ✅ Validation schema
const interventionSchema = z.object({
  studentId: z.string().min(1, 'Student ID is required'),
  type: z.string().min(3, 'Type must be at least 3 characters'),
  date: z.string().min(1, 'Date is required'),
  status: z.enum(['Active', 'Completed', 'Pending']),
});

// ✅ Infer form type from schema
type InterventionFormData = z.infer<typeof interventionSchema>;

// ✅ Intervention record type with generated id
type InterventionRecord = InterventionFormData & { id: number };

function InterventionsPage() {
  useProtectedPage();

  const [records, setRecords] = useState<InterventionRecord[]>([]);

  const interventiondata = records.length > 0 ? records : interventionrecords;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<InterventionFormData>({
    resolver: zodResolver(interventionSchema),
  });

  const onSubmit = (data: InterventionFormData) => {
    setRecords((prev) => [...prev, { id: Date.now(), ...data }]);
    reset();
  };

  return (
    <div className="px-10">
      <div className="bg-white p-10 rounded-2xl mb-10">
        <div className="w-lg">
          <h1 className="text-2xl font-bold mb-4">Interventions</h1>

          {/* ✅ Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mb-6">
            <div>
              <label className="block font-medium mb-1">Student ID</label>
              <input
                {...register('studentId')}
                className="border p-2 rounded w-full"
              />
              {errors.studentId && (
                <p className="text-red-500">{errors.studentId.message}</p>
              )}
            </div>

            <div>
              <label className="block font-medium mb-1">
                Intervention Type
              </label>
              <input
                {...register('type')}
                className="border p-2 rounded w-full"
              />
              {errors.type && (
                <p className="text-red-500">{errors.type.message}</p>
              )}
            </div>

            <div>
              <label className="block font-medium mb-1">Date</label>
              <input
                type="date"
                {...register('date')}
                className="border p-2 rounded w-full"
              />
              {errors.date && (
                <p className="text-red-500">{errors.date.message}</p>
              )}
            </div>

            <div>
              <label className="block font-medium mb-1">Status</label>
              <select
                {...register('status')}
                className="border p-2 rounded w-full"
                defaultValue="Active"
              >
                <option value="Active">Active</option>
                <option value="Completed">Completed</option>
                <option value="Pending">Pending</option>
              </select>
            </div>

            <button
              type="submit"
              className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
            >
              Add Intervention
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
              <th className="p-2 border">Student ID</th>
              <th className="p-2 border">Type</th>
              <th className="p-2 border">Date</th>
              <th className="p-2 border">Status</th>
            </tr>
          </thead>
          <tbody>
            {interventiondata.map((r) => (
              <tr key={r.id} className="hover:bg-gray-50">
                <td className="p-2 border">{r.id}</td>
                <td className="p-2 border">{r.studentId}</td>
                <td className="p-2 border">{r.type}</td>
                <td className="p-2 border">{r.date}</td>
                <td className="p-2 border">{r.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default InterventionsPage;
