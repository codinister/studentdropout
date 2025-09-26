'use client'


import { studentsdata } from '@/data/mockData';


type AnalyticsCardsType = {
  role: string; 
  grade: string;
}
function AnalyticsCards({ role, grade }: AnalyticsCardsType) {
  let filteredStudents = studentsdata.filter(s => s.roleView.includes(role));
  if (grade !== 'All') filteredStudents = filteredStudents.filter(s => s.grade === grade);

  const totalStudents = filteredStudents.length;
  const predictedDropouts = filteredStudents.filter(s => s.dropoutRisk !== 'Low').length;
  const interventionsActive = Math.floor(predictedDropouts / 2);

  // Count per risk level
  const highRisk = filteredStudents.filter(s => s.dropoutRisk === 'High').length;
  const mediumRisk = filteredStudents.filter(s => s.dropoutRisk === 'Medium').length;
  const lowRisk = filteredStudents.filter(s => s.dropoutRisk === 'Low').length;

  const metrics = [
    { title: 'Total Students', value: totalStudents },
    { title: 'Predicted Dropouts', value: predictedDropouts, color: 'text-red-500' },
    { title: 'Interventions Active', value: interventionsActive, color: 'text-green-500' },
    { title: 'High Risk Students', value: highRisk, color: 'text-red-600' },
    { title: 'Medium Risk Students', value: mediumRisk, color: 'text-yellow-500' },
    { title: 'Low Risk Students', value: lowRisk, color: 'text-green-600' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-6">
      {metrics.map(metric => (
        <div key={metric.title} className="bg-white p-4 rounded shadow">
          <h3 className="text-lg font-semibold">{metric.title}</h3>
          <p className={`text-2xl font-bold ${metric.color || ''}`}>{metric.value}</p>
        </div>
      ))}
    </div>
  );
}

export default AnalyticsCards;