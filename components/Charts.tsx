"use client";

import React, { useEffect, useRef } from "react";
import Chart, { ChartData, ChartOptions } from "chart.js/auto";
import { studentsdata } from "@/data/mockData";

type ChartsProps = {
  role: string;
  grade: string;
};

// If you know the structure of students from mockData, define it properly.
// Example student type:
type Student = {
  name: string;
  roleView: string[];
  grade: string;
  attendance: number;
  score: number;
  dropoutRisk: "High" | "Medium" | "Low" | string;
};

function Charts({ role, grade }: ChartsProps) {
  const dropoutRef = useRef<HTMLCanvasElement | null>(null);
  const attendanceRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    let filtered: Student[] = studentsdata.filter((s: Student) =>
      s.roleView.includes(role)
    );
    if (grade !== "All") filtered = filtered.filter((s) => s.grade === grade);

    const dropoutData = filtered.map((s) => (s.dropoutRisk === "High" ? 1 : 0));
    const dropoutColors = filtered.map((s) => {
      switch (s.dropoutRisk) {
        case "High":
          return "rgba(220, 38, 38, 0.7)";
        case "Medium":
          return "rgba(251, 191, 36, 0.7)";
        case "Low":
          return "rgba(16, 185, 129, 0.7)";
        default:
          return "rgba(107, 114, 128, 0.7)";
      }
    });

    // Dropout chart
    const dropoutChart =
      dropoutRef.current &&
      new Chart(dropoutRef.current, {
        type: "bar",
        data: {
          labels: filtered.map((s) => s.name),
          datasets: [
            {
              label: "Dropout Risk",
              data: dropoutData,
              backgroundColor: dropoutColors,
            },
          ],
        } as ChartData,
        options: {
          responsive: true,
          plugins: {
            tooltip: {
              callbacks: {
                label: function (context) {
                  const student = filtered[context.dataIndex];
                  return `Attendance: ${student.attendance}%, Score: ${student.score}, Risk: ${student.dropoutRisk}`;
                },
              },
            },
          },
        } as ChartOptions,
      });

    // Attendance chart
    const attendanceChart =
      attendanceRef.current &&
      new Chart(attendanceRef.current, {
        type: "bar",
        data: {
          labels: filtered.map((s) => s.name),
          datasets: [
            {
              label: "Attendance (%)",
              data: filtered.map((s) => s.attendance),
              backgroundColor: "rgba(59, 130, 246, 0.7)",
            },
            {
              label: "Score",
              data: filtered.map((s) => s.score),
              backgroundColor: "rgba(16, 185, 129, 0.7)",
            },
          ],
        } as ChartData,
        options: {
          responsive: true,
          plugins: {
            tooltip: {
              callbacks: {
                label: function (context) {
                  const student = filtered[context.dataIndex];
                  return `${context.dataset?.label}: ${context.raw}, Risk: ${student.dropoutRisk}`;
                },
              },
            },
          },
        } as ChartOptions,
      });

    return () => {
      dropoutChart?.destroy();
      attendanceChart?.destroy();
    };
  }, [role, grade]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-lg font-semibold mb-4">Dropout Risk per Student</h3>
        <canvas ref={dropoutRef}></canvas>
      </div>
      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-lg font-semibold mb-4">Attendance vs Score</h3>
        <canvas ref={attendanceRef}></canvas>
      </div>
    </div>
  );
}

export default Charts;
