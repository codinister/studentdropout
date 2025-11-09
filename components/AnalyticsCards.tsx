'use client';

import filterReport from '@/utils/filterReport';
import CardOne from './analytics/CardOne';
import CardTwo from './analytics/CardTwo';

type AnalyticsCardsType = {
  role: string;
  level: string;
  data: any
};
function AnalyticsCards({ role, level, data }: AnalyticsCardsType) {
  const {
    students,
    interventionsActive,
    highRisk,
    mediumRisk,
    lowRisk,
    predictedDropouts,
  } = filterReport(role, level, data);

  return (
    <>
      <div className="flex gap-8 flex-wrap  mb-10">
        <CardOne
          title="High Risk Students"
          value={String(highRisk.length)}
          color="bg-red-600"
        />
        <CardOne
          title="Medium Risk"
          value={String(mediumRisk.length)}
          color="bg-yellow-500"
        />
        <CardOne
          title="Low Risk Students"
          value={String(lowRisk.length)}
          color="bg-green-500"
        />
      </div>

      <div className="rounded-xl border border-amber-950 p-4  mb-10 flex flex-wrap gap-4">
        <CardTwo title="Total Students" value={String(students.length)} />
        <CardTwo title="Predicted Dropouts" value={String(predictedDropouts.length)} />
        <CardTwo
          title="Interventions Active"
          value={String(interventionsActive)}
        />
      </div>
    </>
  );
}

export default AnalyticsCards;
