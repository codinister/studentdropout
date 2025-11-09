'use client';

import React, { useEffect, useRef } from 'react';
import Chart, { ChartData, ChartOptions } from 'chart.js/auto';

// If you know the structure of students from mockData, define it properly.
// Example student type:

type ChartsProps = {
  role: string;
  level: string;
  data: {
    studentName: string;
    roleView: string[];
    level: string;
    attendance: string;
    score: string;
    dropoutRisk: string;
  }[];
};

function Charts({ role, level, data }: ChartsProps) {
  const dropoutRef = useRef<HTMLCanvasElement | null>(null);
  const attendanceRef = useRef<HTMLCanvasElement | null>(null);

  const studentsdata = data.map(v => ({
    ...v, 
    score: Number(v.score), 
    attendance: Number(v.attendance)
  }))



  useEffect(() => {
    let filtered = studentsdata.filter((s) => s.roleView.includes(role));


    if (level !== 'All') {
      filtered = filtered.filter((s) => s.level === level);
    }

    const dropoutData = filtered.map((s) =>
      s.dropoutRisk === 'High Risk' ? 1 : 0
    );

    const dropoutColors = filtered.map((s) => {
      switch (s.dropoutRisk) {
        case 'High Risk':
          return 'rgba(220, 38, 38, 0.7)';
        case 'Medium Risk':
          return 'rgba(251, 191, 36, 0.7)';
        case 'Low Risk':
          return 'rgba(16, 185, 129, 0.7)';
        default:
          return 'rgba(107, 114, 128, 0.7)';
      }
    });

    // Dropout chart
    const dropoutChart =
      dropoutRef.current &&
      new Chart(dropoutRef.current, {
        type: 'bar',
        data: {
          labels: filtered.map((s) => s.studentName),
          datasets: [
            {
              label: 'Dropout Risk',
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
                  return `Attendance: ${
                    student.attendance
                  }%, Score: ${student.score}, Risk: ${
                    student.dropoutRisk
                  }`;
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
        type: 'bar',
        data: {
          labels: filtered.map((s) => s.studentName),
          datasets: [
            {
              label: 'Attendance (%)',
              data: filtered.map((s) => s.attendance),
              backgroundColor: 'rgba(59, 130, 246, 0.7)',
            },
            {
              label: 'Score',
              data: filtered.map((s) => s.score),
              backgroundColor: 'rgba(16, 185, 129, 0.7)',
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
  }, [role, level, studentsdata]);

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
