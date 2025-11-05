import replaceDot from '@/utils/replaceDot';

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
  const { date = '', studentId = 0, description = '' } = options;

  return {
    date: date || '',
    description: description || '',
    studentId: studentId || 0,
  };
};

//Health Records
export const healthRecordsFormSchema = ({ ...options }) => {
  const { date = '', studentId = 0, condition = '' } = options;

  return {
    date: date || '',
    condition: condition || '',
    studentId: studentId || 0,
  };
};

//Financial Records
export const financialRecordsFormSchema = ({ ...options }) => {
  const { status = '', studentId = 0, amount = 0 } = options;

  return {
    status: status || '',
    amount: amount || 0,
    studentId: studentId || 0,
  };
};

//AttendanceRecord
export const attendanceRecordFormSchema = ({ ...options }) => {
  const { date = '', status = '', studentId = 0 } = options;

  return {
    date: date || '',
    status: status || '',
    studentId: studentId || 0,
  };
};

//Settings
export const settingsFormSchema = ({ ...options }) => {
  const {
    schoolName = '',
    schoolPhone = '',
    schoolWebsite = '',
    schoolLocation = '',
    schoolPostalAddress = '',
    logo = '',
  } = options;

  return {
    schoolName: schoolName || '',
    schoolPhone: schoolPhone || '',
    schoolWebsite: schoolWebsite || '',
    schoolLocation: schoolLocation || '',
    schoolPostalAddress: schoolPostalAddress || '',
    logo: logo || '',
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

  return {
    type: type || '',
    date: date || '',
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
