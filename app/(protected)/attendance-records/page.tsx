'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

// shadcn/ui component imports (adjust paths to your project)
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { attendancedata } from '@/data/mockData';


// --- Types & Validation ---
const attendanceSchema = z.object({
  studentId: z.string().min(1, 'Student ID is required'),
  studentName: z.string().min(2, 'Student name is required'),
  date: z
    .string()
    .refine((d) => !Number.isNaN(Date.parse(d)), { message: 'Invalid date' }),
  status: z.enum(['Present', 'Absent', 'Late']),
});

type AttendanceForm = z.infer<typeof attendanceSchema>;

export type AttendanceRecord = AttendanceForm & { id: string };

// --- Mock/sample data ---
const SAMPLE_DATA = attendancedata

// --- Helper ---
const uid = () => Math.random().toString(36).slice(2, 9);

// --- Component ---
export default function AttendanceRecords() {



  const [records, setRecords] = useState<AttendanceRecord[]>([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AttendanceForm>({
    resolver: zodResolver(attendanceSchema),
    defaultValues: { status: 'Present' },
  });

  const onSubmit = (data: AttendanceForm) => {
    const newRecord: AttendanceRecord = { ...data, id: uid() };
    setRecords((prev) => [newRecord, ...prev]);
    reset({ studentId: '', studentName: '', date: '', status: 'Present' });
  };

  const deleteRecord = (id: string) => {
    setRecords((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Attendance Records</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="table-auto w-full text-sm">
              <thead>
                <tr className="text-left">
                  <th className="p-2">Student ID</th>
                  <th className="p-2">Student Name</th>
                  <th className="p-2">Date</th>
                  <th className="p-2">Status</th>
                  <th className="p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {records.map((r) => (
                  <tr key={r.id} className="border-t">
                    <td className="p-2">{r.studentId}</td>
                    <td className="p-2">{r.studentName}</td>
                    <td className="p-2">
                      {new Date(r.date).toLocaleDateString()}
                    </td>
                    <td className="p-2">{r.status}</td>
                    <td className="p-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => deleteRecord(r.id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
                {records.length === 0 && (
                  <tr>
                    <td
                      colSpan={5}
                      className="p-4 text-center text-muted-foreground"
                    >
                      No attendance records found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Add Attendance</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            <div className="space-y-1">
              <Label>Student ID</Label>
              <Input {...register('studentId')} placeholder="e.g. S010" />
              {errors.studentId && (
                <p className="text-xs text-red-600">
                  {errors.studentId.message}
                </p>
              )}
            </div>

            <div className="space-y-1">
              <Label>Student Name</Label>
              <Input {...register('studentName')} placeholder="e.g. John Doe" />
              {errors.studentName && (
                <p className="text-xs text-red-600">
                  {errors.studentName.message}
                </p>
              )}
            </div>

            <div className="space-y-1">
              <Label>Date</Label>
              <Input type="date" {...register('date')} />
              {errors.date && (
                <p className="text-xs text-red-600">{errors.date.message}</p>
              )}
            </div>

            <div className="space-y-1">
              <Label>Status</Label>
              <Select defaultValue="Present">
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Present">Present</SelectItem>
                  <SelectItem value="Absent">Absent</SelectItem>
                  <SelectItem value="Late">Late</SelectItem>
                </SelectContent>
              </Select>
              {/* Keep a hidden input so React Hook Form gets the selected value. */}
              <input type="hidden" {...(register('status'))} />
              {errors.status && (
                <p className="text-xs text-red-600">{errors.status.message}</p>
              )}
            </div>

            <div className="md:col-span-3 flex gap-2 justify-end">
              <Button type="submit" disabled={isSubmitting}>
                Add Attendance
              </Button>
              <Button type="button" variant="secondary" onClick={() => reset()}>
                Reset
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
