'use client'

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { academicrecorddata } from "@/data/mockData";
import useProtectedPage from "@/utils/useProtectedPage";

// ✅ Define schema
const behaviorSchema = z.object({
  studentId: z.string().min(1, "Student ID is required"),
  incident: z.string().min(5, "Incident must be at least 5 characters"),
  date: z.string().min(1, "Date is required"),
});

// ✅ Infer type from schema
type BehaviorForm = z.infer<typeof behaviorSchema>;

// ✅ Record type with ID
interface BehaviorRecord extends BehaviorForm {
  id: number;
}

function BehaviorRecordsPage(): React.ReactElement {

  useProtectedPage();

  const [records, setRecords] = useState<BehaviorRecord[]>([]);


  const academicdata = records.length > 0 ? records : academicrecorddata

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BehaviorForm>({
    resolver: zodResolver(behaviorSchema),
  });

  const onSubmit = (data: BehaviorForm) => {
    setRecords((prev) => [...prev, { id: Date.now(), ...data }]);
    reset();
  };

  return (
    
    <div className="px-10">
      <div className="bg-white p-10 rounded-2xl mb-10">
        <div className="w-lg">


      <h1 className="text-2xl font-bold mb-4">Behavior Records</h1>

      {/* Form */}
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
          <label>Incident Description</label>
          <textarea
            {...register("incident")}
            className="border p-2 rounded w-full"
          />
          {errors.incident && (
            <p className="text-red-500">{errors.incident.message}</p>
          )}
        </div>

        <div>
          <label>Date</label>
          <input
            type="date"
            {...register("date")}
            className="border p-2 rounded w-full"
          />
          {errors.date && <p className="text-red-500">{errors.date.message}</p>}
        </div>

        <button
          type="submit"
          className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700"
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
              <th className="p-2 border">Incident</th>
              <th className="p-2 border">Date</th>
            </tr>
          </thead>
          <tbody>
            {academicdata.map((r) => (
              <tr key={r.id} className="hover:bg-gray-50">
                <td className="p-2 border">{r.id}</td>
                <td className="p-2 border">{r.studentId}</td>
                <td className="p-2 border">{r.incident}</td>
                <td className="p-2 border">{r.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default BehaviorRecordsPage;
