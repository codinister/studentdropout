'use client'

import { studentsdata } from '@/data/mockData';


type InfoSectionsType = {
  role: string
  grade: string;
}
function InfoSections({ role }: InfoSectionsType) {
  const filteredStudents = studentsdata.filter(s => s.roleView.includes(role));
  const topRiskStudents = filteredStudents.filter(s => s.dropoutRisk === 'High');

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-lg font-semibold mb-4">Recent Interventions</h3>
        <ul className="list-disc list-inside">
          <li>Mentoring program for Grade 10 students</li>
          <li>Health check-ups completed for 200 students</li>
          <li>Financial aid applied to 50 students</li>
        </ul>
      </div>
      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-lg font-semibold mb-4">Top Risk Students</h3>
        <ul className="list-disc list-inside">
          {topRiskStudents.map(s => (
            <li key={s.id}>{s.name} - {s.grade} - {s.financialStatus}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default InfoSections;