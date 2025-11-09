'use client';
import React, { useState } from 'react';
import AnalyticsCards from '@/components/AnalyticsCards';
import Charts from '@/components/Charts';
import InfoSections from '@/components/InfoSections';
import StudentReportTable from '@/components/tableRows/StudentReportTable';
import useStudentReportColumn from '@/components/tableColumns/useStudentReportColumn';
import useGetQuery from '@/state/query/useGetQuery';

function DashboardPage() {
  const [role, setRole] = useState('Administrators');
  const [level, setLevel] = useState('All');
  const { studentReportColumn } = useStudentReportColumn();

  const student = useGetQuery('students', '/students/get-students');

  const studentData = student.length > 0 ? student[0].studentsInfo : [];

  return (
    <>
      <header className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0">
        <h2 className="text-3xl font-bold">Dashboard Analytics</h2>
        <div className="flex space-x-4">
          <select
            className="border border-gray-300 p-2 rounded"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option>Administrators</option>
            <option>Academic Advisors</option>
            <option>Counselors</option>
          </select>
          <select
            className="border border-gray-300 p-2 rounded"
            value={level}
            onChange={(e) => setLevel(e.target.value)}
          >
            <option>All</option>
            <option>Level 100</option>
            <option>Level 200</option>
            <option>Level 300</option>
            <option>Level 400</option>
          </select>
        </div>
      </header>

      <AnalyticsCards data={studentData} role={role} level={level} />
      <Charts data={studentData} role={role} level={level} />
      <InfoSections data={studentData} role={role} level={level} />
      <StudentReportTable columns={studentReportColumn} data={studentData} />
    </>
  );
}

export default DashboardPage;
