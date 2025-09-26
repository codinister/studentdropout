'use client'
import { studentsdata } from '@/data/mockData';

function getRiskColor(risk: string) {
  switch (risk) {
    case 'High': return 'bg-red-500 text-white';
    case 'Medium': return 'bg-yellow-400 text-black';
    case 'Low': return 'bg-green-500 text-white';
    default: return 'bg-gray-300';
  }
}


type StudentTableType = {
  role: string;
  grade: string;
  search: string;
}
function StudentTable({ role, grade, search }: StudentTableType) {
  let filtered = studentsdata.filter(s => s.roleView.includes(role));

  if (grade !== 'All') filtered = filtered.filter(s => s.grade === grade);
  if (search.trim() !== '') filtered = filtered.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-white p-4 rounded shadow mt-6 overflow-x-auto">
      <h3 className="text-lg font-semibold mb-4">Student List</h3>
      <table className="min-w-full border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">ID</th>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Grade</th>
            <th className="p-2 border">Attendance</th>
            <th className="p-2 border">Score</th>
            <th className="p-2 border">Dropout Risk</th>
            <th className="p-2 border">Financial Status</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map(s => (
            <tr key={s.id} className="hover:bg-gray-50">
              <td className="p-2 border">{s.id}</td>
              <td className="p-2 border">{s.name}</td>
              <td className="p-2 border">{s.grade}</td>
              <td className="p-2 border">{s.attendance}%</td>
              <td className="p-2 border">{s.score}</td>
              <td className="p-2 border">
                <span className={`px-2 py-1 rounded-full text-sm ${getRiskColor(s.dropoutRisk)}`}>
                  {s.dropoutRisk}
                </span>
              </td>
              <td className="p-2 border">{s.financialStatus}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StudentTable;