'use client';
import React, { useState } from 'react';
import AnalyticsCards from '@/components/AnalyticsCards';
import Charts from '@/components/Charts';
import InfoSections from '@/components/InfoSections';
import StudentTable from '@/components/StudentTable';
import { useSession } from 'next-auth/react';


function DashboardPage() {

  const [role, setRole] = useState('Administrators');
  const [grade, setGrade] = useState('All');
  const [search, setSearch] = useState('');

  const {status, data: session} = useSession()

  console.log(status, session)

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
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
          >
            <option>All</option>
            <option>Grade 9</option>
            <option>Grade 10</option>
            <option>Grade 11</option>
            <option>Grade 12</option>
          </select>
          <input
            type="text"
            placeholder="Search student..."
            className="border border-gray-300 p-2 rounded"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </header>

      <AnalyticsCards role={role} grade={grade} />
      <Charts role={role} grade={grade} />
      <InfoSections role={role} grade={grade} />
      <StudentTable role={role} grade={grade} search={search} />
    </>
  );
}

export default DashboardPage;
