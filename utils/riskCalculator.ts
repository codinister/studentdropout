// Dropout Prediction System
// Based on Exam Score, GPA, and Attendance

function getExamCoefficient(score: number) {
  if (score >= 80) return 1;        // Excellent
  if (score >= 50) return 2;        // Average
  if (score >= 40) return 3;        // Pass
  return 4;                         // Fail
}

function getGPACoefficient(gpa: number) {
  if (gpa >= 3.5) return 1;         // Excellent
  if (gpa >= 2.5) return 2;         // Average
  if (gpa >= 1.0) return 3;         // Pass
  return 4;                         // Fail
}

function getAttendanceCoefficient(attendance: number) {
  if (attendance >= 90) return 1;   // Excellent
  if (attendance >= 75) return 2;   // Average
  if (attendance >= 50) return 3;   // Pass
  return 4;                         // Poor / Fail
}




export default function riskCalculator({...options}) {

const {score, gpa, attendance} = options 


  // Get coefficients
  const examCoeff = getExamCoefficient(score);
  const gpaCoeff = getGPACoefficient(gpa);
  const attendanceCoeff = getAttendanceCoefficient(attendance);

  // Calculate total score
  const total = examCoeff + gpaCoeff + attendanceCoeff;

  // Determine risk level
  let riskLevel = '';
  if (total <= 4) riskLevel = 'Low Risk';
  else if (total <= 7) riskLevel = 'Medium Risk';
  else riskLevel = 'High Risk';

  return {
    examCoeff,
    gpaCoeff,
    attendanceCoeff,
    total,
    riskLevel,
  };
}


