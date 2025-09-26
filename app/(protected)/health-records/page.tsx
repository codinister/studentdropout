'use client'

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { academicrecorddata } from "@/data/mockData";

// ✅ Define schema
const healthSchema = z.object({
  studentId: z.string().min(1, "Student ID is required"),
  condition: z.string().min(3, "Condition must be at least 3 characters"),
  date: z.string().min(1, "Date is required"),
});

// ✅ Infer TypeScript type from schema
type HealthRecordForm = z.infer<typeof healthSchema>;

// ✅ Extend form data with ID for table storage
interface HealthRecord extends HealthRecordForm {
  id: number;
}

function HealthRecordsPage(): React.ReactElement {
  const [records, setRecords] = useState<HealthRecord[]>([]);


  const academicdata = records.length > 0 ? records : academicrecorddata

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<HealthRecordForm>({
    resolver: zodResolver(healthSchema),
  });

  const onSubmit = (data: HealthRecordForm) => {
    setRecords((prev) => [...prev, { id: Date.now(), ...data }]);
    reset();
  };

  return (
        <div className="px-10">
      <div className="bg-white p-10 rounded-2xl mb-10">
        <div className="w-lg">
      <h1 className="text-2xl font-bold mb-4">Health Records</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mb-6">
        <div>
          <label>Student ID</label>
          <input
            {...register("studentId")}
            className="border p-2 rounded w-full"
          />
          {errors.studentId && (
            <p className="text-red-500">{errors.studentId.message}</p>
          )}
        </div>
        <div>
          <label>Health Condition</label>
          <input
            {...register("condition")}
            className="border p-2 rounded w-full"
          />
          {errors.condition && (
            <p className="text-red-500">{errors.condition.message}</p>
          )}
        </div>
        <div>
          <label>Date</label>
          <input
            type="date"
            {...register("date")}
            className="border p-2 rounded w-full"
          />
          {errors.date && (
            <p className="text-red-500">{errors.date.message}</p>
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

      <div className="overflow-x-auto bg-white p-4 rounded shadow">
        <table className="min-w-full border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">ID</th>
              <th className="p-2 border">Student ID</th>
              <th className="p-2 border">Condition</th>
              <th className="p-2 border">Date</th>
            </tr>
          </thead>
          <tbody>
            {academicdata.map((r) => (
              <tr key={r.id} className="hover:bg-gray-50">
                <td className="p-2 border">{r.id}</td>
                <td className="p-2 border">{r.studentId}</td>
                <td className="p-2 border">{r.condition}</td>
                <td className="p-2 border">{r.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default HealthRecordsPage;
