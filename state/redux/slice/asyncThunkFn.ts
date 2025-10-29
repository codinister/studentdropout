import asyncThunk from '@/utils/asyncThunk';

export const fetchUsers = asyncThunk('/users/get-users', 'fetchUsers');

export const fetchRole = asyncThunk('/role/get-role', 'fetchrole');

export const fetchSubject = asyncThunk('/subject/get-subjects', 'fetchsubject');

export const fetchDemographicinfo = asyncThunk(
  '/demographicinfo/get-demographicinfo',
  'fetchdemographicinfo'
);

export const fetchIntervention = asyncThunk(
  '/intervention/get-intervention',
  'fetchintervention'
);

export const fetchStudents = asyncThunk(
  '/students/get-students',
  'fetchStudents'
);

export const fetchDropoutprediction = asyncThunk(
  '/dropoutprediction/get-dropoutprediction',
  'fetchdropoutprediction'
);

export const fetchSettings = asyncThunk(
  '/settings/get-settings',
  'fetchsettings'
);

export const fetchAttendancerecord = asyncThunk(
  '/attendancerecord/get-attendancerecord',
  'fetchattendancerecord'
);

export const fetchAcademicrecord = asyncThunk(
  '/academicrecord/get-academicrecord',
  'fetchacademicrecord'
);
