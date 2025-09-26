'use client'

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { financialrecords } from "@/data/mockData";

// ✅ Define schema
const financialSchema = z.object({
  studentId: z.string().min(1, "Student ID is required"),
  status: z.enum(["Paid", "Pending", "Exempt"]),
  amount: z.number().min(0, "Amount must be 0 or greater"),
});

// ✅ Infer TypeScript type from schema
type FinancialForm = z.infer<typeof financialSchema>;

// ✅ Extend with ID for table records
interface FinancialRecord extends FinancialForm {
  id: number;
}

function FinancialStatusPage(): React.ReactElement {
  const [records, setRecords] = useState<FinancialRecord[]>([]);

  const financialdata = records.length > 0?  records : financialrecords

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FinancialForm>({
    resolver: zodResolver(financialSchema),
  });

  const onSubmit = (data: FinancialForm) => {
    setRecords((prev) => [...prev, { id: Date.now(), ...data }]);
    reset();
  };

  return (
        <div className="px-10">
      <div className="bg-white p-10 rounded-2xl mb-10">
        <div className="w-lg">
      <h1 className="text-2xl font-bold mb-4">Financial Status</h1>

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
          <label>Status</label>
          <select
            {...register("status")}
            className="border p-2 rounded w-full"
            defaultValue=""
          >
            <option value="" disabled>
              Select Status
            </option>
            <option value="Paid">Paid</option>
            <option value="Pending">Pending</option>
            <option value="Exempt">Exempt</option>
          </select>
          {errors.status && (
            <p className="text-red-500">{errors.status.message}</p>
          )}
        </div>

        <div>
          <label>Amount</label>
          <input
            type="number"
            {...register("amount", { valueAsNumber: true })}
            className="border p-2 rounded w-full"
          />
          {errors.amount && (
            <p className="text-red-500">{errors.amount.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
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
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Amount</th>
            </tr>
          </thead>
          <tbody>
            {financialdata.map((r) => (
              <tr key={r.id} className="hover:bg-gray-50">
                <td className="p-2 border">{r.id}</td>
                <td className="p-2 border">{r.studentId}</td>
                <td className="p-2 border">{r.status}</td>
                <td className="p-2 border">{r.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default FinancialStatusPage;
