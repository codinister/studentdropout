


export const loginFormSchema = ({ ...options }) => {
  const { email='', password='' } = options;
  return {
    email: email || '',
    password: password || '',
  };
};

export const userFormSchema = ({ ...options }) => {
  const { name='', roleId='', email='', password='' } = options;

  return {
    name: name || '',
    roleId: roleId || '',
    email: email || '',
    password: password || '',
  };
};

//STUDENTS
export const studentFormSchema = ({ ...options }) => {
  const { studentName='', totalAttendance='', level='', score='' } = options;

  return {
    studentName: studentName || '',
    totalAttendance: totalAttendance || '',
    level: level || '',
    score: score || '',
  };
};


//SUBJECTS
export const subjectFormSchema = ({ ...options }) => {
  const { subjectName='' } = options;

  return {
    subjectName: subjectName || '',
  };
};

//AcademicRecord
export const academicRecordFormSchema = ({ ...options }) => {
  const { subjectId='', level='', semester='', year='', studentId='' } = options;

  return {
    subjectId: subjectId || '',
    level: level || '',
    semester: semester || '',
    year: year || '',
    studentId: studentId || '',
  } 
};

//AttendanceRecord
export const attendanceRecordFormSchema = ({ ...options }) => {
  const { date='', status='', studentId='' } = options;

  return {
    date: date || '',
    status: status || '',
    studentId: studentId || '',
  };
};

//Settings
export const settingsFormSchema = ({ ...options }) => {
  const {
    schoolName='',
    schoolPhone='',
    schoolWebsite='',
    schoolLocation='',
    schoolPostalAddress='',
    logo='',
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
  const { predictionScore='', date='', riskLevel='', studentId='' } = options;

  return {
    predictionScore: predictionScore || '',
    date: date || '',
    riskLevel: riskLevel || '',
    studentId: studentId || '',
  };
};

//intervention
export const interventionFormSchema = ({ ...options }) => {
  const { type='', date='', outcome='', studentId='' } = options;

  return {
    type: type || '',
    date: date || '',
    outcome: outcome || '',
    studentId: studentId || '',
  };
};

//DemographicInfo
export const demographicInfoFormSchema = ({ ...options }) => {
  const { parentName='', parentContact='', householdIncome='', ethnicity='', studentId='' } =
    options;

  return {
    parentName: parentName || '',
    parentContact: parentContact || '',
    householdIncome: householdIncome || '',
    ethnicity: ethnicity || '',
    studentId: studentId || '',
  };
};

//Role
export const roleFormSchema = ({ ...options }) => {
  const { roleName='' } = options;

  return {
    roleName: roleName || '',
  };
};
