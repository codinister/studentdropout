'use client';

import filterReport from '@/utils/filterReport';

type InfoSectionsType = {
  role: string;
  level: string;
  data: {
    roleView: string;
    level: string;
    dropoutRisk: string;
    studentName: string;
    studentId: number;
    financialStatus: string;
    intervention: {
      type: string;
    };
  }[];
};
function InfoSections({ role, level, data }: InfoSectionsType) {
  const {
    highRisk
  } = filterReport(role, level, data);

  const intervention = highRisk
    .map((v) => {
      return { type: v.intervention.type };
    })
    .map((v,k) => <li key={k}>{v.type}</li>)
    .slice(0, 10);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-lg font-semibold mb-4">Recent Interventions</h3>
        <ul className="list-disc list-inside">{intervention}</ul>
      </div>
      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-lg font-semibold mb-4">Top Risk Students</h3>
        <ul className="list-disc list-inside">
          {highRisk
            .map((s) => (
              <li key={s.studentId}>
                {s.studentName} - {s.level} - {s.financialStatus}
              </li>
            ))
            .slice(0, 10)}
        </ul>
      </div>
    </div>
  );
}

export default InfoSections;
