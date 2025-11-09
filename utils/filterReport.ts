const filterReport = (
  role: string,
  level: string,
  studentsdata: {
    roleView: string;
    level: string;
    dropoutRisk: string;
    studentName: string;
    studentId: number;
    financialStatus: string;
    intervention: {
      type: string;
    };
  }[]
) => {
  let filteredStudents = studentsdata.filter((s) => s.roleView.includes(role));

  if (level !== 'All') {
    filteredStudents = filteredStudents.filter((s) => s.level === level);
  }

  const students = filteredStudents;

  const predictedDropouts = filteredStudents.filter(
    (s) => s.dropoutRisk !== 'Low Risk'
  );

  const interventionsActive = Math.floor(Number(predictedDropouts.length) / 2);

  // Count per risk level
  const highRisk = filteredStudents.filter(
    (s) => s.dropoutRisk === 'High Risk'
  );

  const mediumRisk = filteredStudents.filter(
    (s) => s.dropoutRisk === 'Medium Risk'
  );

  const lowRisk = filteredStudents.filter((s) => s.dropoutRisk === 'Low Risk');

  return {
    students,
    interventionsActive,
    highRisk,
    mediumRisk,
    lowRisk,
    predictedDropouts,
  };
};

export default filterReport;
