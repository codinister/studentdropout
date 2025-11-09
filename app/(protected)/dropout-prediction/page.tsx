'use client';

import useStudentReportColumn from '@/components/tableColumns/useStudentReportColumn';
import StudentReportTable from '@/components/tableRows/StudentReportTable';
import useGetQuery from '@/state/query/useGetQuery';
import { useEffect, useRef } from 'react';
import Chart, { ChartData, ChartOptions } from 'chart.js/auto';
import useJsPdfGenerator from '@/utils/useJsPdfGenerator';
import { Button } from '@/components/ui/button';

const StudentDropoutPredictions = () => {
  const student = useGetQuery('students', '/students/get-students');

  const studentData = student.length > 0 ? student[0].studentsInfo : [];

  const { studentReportColumn } = useStudentReportColumn();

  const performanceRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const perfChart =
      performanceRef.current &&
      new Chart(performanceRef.current, {
        type: 'bar',
        data: {
          labels: studentData.map(
            (v: { studentName: string }) => v.studentName
          ),
          datasets: [
            {
              label: 'Attendance Rate %',
              data: studentData.map((v: { attendance: string }) =>
                Number(v.attendance)
              ),
              backgroundColor: 'rgba(220, 38, 38, 0.7)',
            },
            {
              label: 'Academic Score %',
              data: studentData.map((v: { score: string }) => Number(v.score)),
              backgroundColor: 'rgba(16, 185, 129, 0.7)',
            },
          ],
        } as ChartData,
        options: {} as ChartOptions,
      });

    return () => {
      perfChart?.destroy();
    };
  }, [studentData]);

  const tableColumn = [
    'ID',
    'Name',
    'Level',
    'Attendance (%)',
    'Score (%)',
    'GPA (%)',
    'Dropout Risk',
  ];

  const tableRows = studentData.map((student: any) => [
    student.studentId,
    student.studentName,
    student.level,
    student.attendance,
    student.score,
    student.gpa,
    student.dropoutRisk,
  ]);

  const { genPdf } = useJsPdfGenerator({
    tableColumn,
    tableRows,
    reportTitle: 'Student Dropout Predictions',
  });

  return (
    <>
      <h4 className="text-center text-[26px] bold mb-6">
        Student Dropout Predictions
      </h4>

      <Button onClick={genPdf} variant="default">
        PDF
      </Button>
      <StudentReportTable columns={studentReportColumn} data={studentData} />

      <div className="mt-10">
        <h4 className="text-center text-[26px] bold mb-6">
          Student Performance Analytics
        </h4>
        <canvas ref={performanceRef} />
      </div>
    </>
  );
};

export default StudentDropoutPredictions;
