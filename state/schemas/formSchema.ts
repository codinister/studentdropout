import { ymd } from '@/utils/dateFormats';

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
  const ndate = new Date();

  const {
    studentName = '',
    level = '',
    birthdate = '',
    phone = '',
    nationality = '',
    residence = '',
    gender = '',
    admissiondate = '',
  } = options;

  return {
    studentName: studentName || '',
    level: level || '',
    birthdate: birthdate || ymd(ndate),
    phone: phone || '',
    nationality: nationality || '',
    residence: residence || '',
    gender: gender || '',
    admissiondate: admissiondate || ymd(ndate),
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
    semester = '',
    year = '',
    studentId = 0,
    department = '',
    gpa = '',
    attendance = '',
    score = ''
  } = options;

  return {
    subjectId: subjectId || 0,
    semester: semester || '',
    year: year || new Date().getFullYear(),
    studentId: studentId || 0,
    department: department || '',
    gpa: gpa || '',
    attendance: attendance || '',
    score: score || ''
  };
};

//Behavior Records
export const behaviorRecordsFormSchema = ({ ...options }) => {
  const { date = '', studentId = 0, description = '' } = options;
  const ndate = new Date();

  return {
    date: date || ymd(ndate),
    description: description || '',
    studentId: studentId || 0,
  };
};

//Health Records
export const healthRecordsFormSchema = ({ ...options }) => {
  const { date = '', studentId = 0, condition = '' } = options;
  const dates = new Date();
  return {
    date: date || ymd(dates),
    condition: condition || '',
    studentId: studentId || 0,
  };
};

//Financial Records
export const financialStatusFormSchema = ({ ...options }) => {
  const { status = '', studentId = '' } = options;

  return {
    status: status || '',
    studentId: studentId || 0,
  };
};

//intervention
export const interventionFormSchema = ({ ...options }) => {
  const { type = '', date = '', outcome = '', studentId = 0 } = options;

  const ndate = new Date();

  return {
    date: date || ymd(ndate),
    type: type || '',
    outcome: outcome || '',
    studentId: studentId || 0,
  };
};
