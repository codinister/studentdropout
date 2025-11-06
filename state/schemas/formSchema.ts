import {  ymd } from '@/utils/dateFormats';


export const loginFormSchema = ({ ...options }) => {
  const { email = '', password = '' } = options;
  return {
    email: email || '',
    password: password || '',
  };
};

export const userFormSchema = ({ ...options }) => {
  const { name = '', roleId = '', email = '', password = '' } = options;

  return {
    name: name || '',
    roleId: roleId || '',
    email: email || '',
    password: password || '',
  };
};

//STUDENTS
export const studentFormSchema = ({ ...options }) => {
  const {
    studentName = '',
    totalAttendance = '',
    level = '',
    score = '',
  } = options;

  return {
    studentName: studentName || '',
    totalAttendance: totalAttendance || '',
    level: level || '',
    score: score || '',
  };
};

//SUBJECTS
export const subjectFormSchema = ({ ...options }) => {
  const { subjectName = '' } = options;

  return {
    subjectName: subjectName || '',
  };
};

//AcademicRecord
export const academicRecordFormSchema = ({ ...options }) => {
  const {
    subjectId = 0,
    level = '',
    semester = '',
    year = '',
    studentId = 0,
  } = options;

  return {
    subjectId: subjectId || 0,
    semester: semester || '',
    year: year || '',
    studentId: studentId || 0,
  };
};

//Behavior Records
export const behaviorRecordsFormSchema = ({ ...options }) => {
  const { date='', studentId = 0, description = '' } = options;
  const ndate = new Date()
  
  return {
    date: date || ymd(ndate),
    description: description || '',
    studentId: studentId || 0,
  };
};

//Health Records
export const healthRecordsFormSchema = ({ ...options }) => {
  const { date = '', studentId = 0, condition = '' } = options;
const dates = new Date()
  return {
    date: date || ymd(dates),
    condition: condition || '',
    studentId: studentId || 0,
  };
};

//Financial Records
export const financialStatusFormSchema = ({ ...options }) => {
  const { status = '', studentId = 0, amount = 0 } = options;

  return {
    status: status || '',
    amount: amount || '',
    studentId: studentId || 0,
  };
};




//AttendanceRecord
export const attendanceRecordFormSchema = ({ ...options }) => {
  const { date = '', status = '', studentId = 0 } = options;

  const ndate = new Date()
  
  return {
    date: date || ymd(ndate),
    status: status || '',
    studentId: studentId || 0,
  };
};



//DropoutPrediction
export const dropoutPredictionFormSchema = ({ ...options }) => {
  const {
    predictionScore = '',
    date = '',
    riskLevel = '',
    studentId = 0,
  } = options;

  return {
    predictionScore: predictionScore || '',
    date: date || '',
    riskLevel: riskLevel || '',
    studentId: studentId || 0,
  };
};

//intervention
export const interventionFormSchema = ({ ...options }) => {
  const { type = '', date = '', outcome = '', studentId = 0 } = options;

  const ndate = new Date()
  
  return {
    date: date || ymd(ndate),
    type: type || '',
    outcome: outcome || '',
    studentId: studentId || 0,
  };
};

//DemographicInfo
export const demographicInfoFormSchema = ({ ...options }) => {
  const {
    parentName = '',
    parentContact = '',
    householdIncome = '',
    ethnicity = '',
    studentId = 0,
  } = options;

  return {
    parentName: parentName || '',
    parentContact: parentContact || '',
    householdIncome: householdIncome || '',
    ethnicity: ethnicity || '',
    studentId: studentId || 0,
  };
};

//Role
export const roleFormSchema = ({ ...options }) => {
  const { roleName = '' } = options;

  return {
    roleName: roleName || '',
  };
};
