"use client";

import React, { useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { dropoutdata } from "@/data/mockData";
import useProtectedPage from "@/utils/useProtectedPage";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// ---------------- Types ----------------
interface DropoutRecord {
  id: number;
  studentName: string;
  grade: string;
  attendanceRate: number; // %
  academicScore: number; // %
  dropoutRisk: "Low" | "Medium" | "High";
}

// ---------------- Mock Data ----------------


// ---------------- Component ----------------
const DropoutPrediction: React.FC = () => {

  useProtectedPage();


  const [records] = useState<DropoutRecord[]>([]);


  const mockDropoutData = records.length > 0 ? records: dropoutdata

  // Chart Data
  const chartData = {
    labels: mockDropoutData.map((r) => r.studentName),
    datasets: [
      {
        label: "Attendance Rate (%)",
        data: mockDropoutData.map((r) => r.attendanceRate),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
      {
        label: "Academic Score (%)",
        data: mockDropoutData.map((r) => r.academicScore),
        backgroundColor: "rgba(153, 102, 255, 0.6)",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Student Performance Analytics",
      },
    },
  };

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold">Student Dropout Predictions</h2>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border shadow">
        <table className="min-w-full border-collapse text-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3 border">ID</th>
              <th className="p-3 border">Student Name</th>
              <th className="p-3 border">Grade</th>
              <th className="p-3 border">Attendance</th>
              <th className="p-3 border">Academic Score</th>
              <th className="p-3 border">Dropout Risk</th>
            </tr>
          </thead>
          <tbody>
            {mockDropoutData.map((record) => (
              <tr key={record.id} className="hover:bg-gray-50">
                <td className="p-3 border">{record.id}</td>
                <td className="p-3 border">{record.studentName}</td>
                <td className="p-3 border">{record.grade}</td>
                <td className="p-3 border">{record.attendanceRate}%</td>
                <td className="p-3 border">{record.academicScore}%</td>
                <td
                  className={`p-3 border font-semibold ${
                    record.dropoutRisk === "High"
                      ? "text-red-600"
                      : record.dropoutRisk === "Medium"
                      ? "text-yellow-600"
                      : "text-green-600"
                  }`}
                >
                  {record.dropoutRisk}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Chart */}
      <div className="bg-white p-4 rounded-lg shadow">
        <Bar data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default DropoutPrediction;
