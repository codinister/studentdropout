export const studentsdata = [
  {
    id: 101,
    name: 'Alice Johnson',
    grade: 'Grade 9',
    attendance: 92,
    score: 80,
    dropoutRisk: 'Low',
    financialStatus: 'Stable',
    roleView: ['Administrators', 'Academic Advisors'],
  },
  {
    id: 102,
    name: 'Bob Smith',
    grade: 'Grade 10',
    attendance: 70,
    score: 65,
    dropoutRisk: 'High',
    financialStatus: 'Needs Aid',
    roleView: ['Administrators', 'Counselors'],
  },
  {
    id: 103,
    name: 'Clara Lee',
    grade: 'Grade 11',
    attendance: 85,
    score: 72,
    dropoutRisk: 'Medium',
    financialStatus: 'Stable',
    roleView: ['Administrators', 'Academic Advisors'],
  },
  {
    id: 104,
    name: 'David Kim',
    grade: 'Grade 12',
    attendance: 60,
    score: 55,
    dropoutRisk: 'High',
    financialStatus: 'Needs Aid',
    roleView: ['Administrators', 'Counselors'],
  },
  {
    id: 105,
    name: 'Eva Brown',
    grade: 'Grade 10',
    attendance: 88,
    score: 78,
    dropoutRisk: 'Low',
    financialStatus: 'Stable',
    roleView: ['Administrators', 'Academic Advisors'],
  },
];

export const academicrecorddata = [
  {
    id: 1,
    studentId: 'STU001',
    subject: 'Mathematics',
    score: 85,
    date: '2025-01-15',
    condition: 'Healthy',
  },
  {
    id: 2,
    studentId: 'STU001',
    subject: 'English',
    score: 78,
    date: '2025-01-20',
    condition: 'Healthy',
  },
  {
    id: 3,
    studentId: 'STU001',
    subject: 'Science',
    score: 92,
    date: '2025-02-05',
    condition: 'Healthy',
  },

  {
    id: 4,
    studentId: 'STU002',
    subject: 'Mathematics',
    score: 65,
    date: '2025-01-15',
    condition: 'Asthma',
  },
  {
    id: 5,
    studentId: 'STU002',
    subject: 'English',
    score: 72,
    date: '2025-01-20',
    condition: 'Asthma',
  },
  {
    id: 6,
    studentId: 'STU002',
    subject: 'Science',
    score: 68,
    date: '2025-02-05',
    incident: 'Low science performance flagged for dropout risk',
    condition: 'Asthma',
  },

  {
    id: 7,
    studentId: 'STU003',
    subject: 'Mathematics',
    score: 90,
    date: '2025-01-15',
    condition: 'Healthy',
  },
  {
    id: 8,
    studentId: 'STU003',
    subject: 'English',
    score: 88,
    date: '2025-01-20',
    condition: 'Healthy',
  },
  {
    id: 9,
    studentId: 'STU003',
    subject: 'Science',
    score: 95,
    date: '2025-02-05',
    condition: 'Healthy',
  },

  {
    id: 10,
    studentId: 'STU004',
    subject: 'Mathematics',
    score: 55,
    date: '2025-01-15',
    incident: 'Failed math exam, advisor intervention scheduled',
    condition: 'Frequent migraines',
  },
  {
    id: 11,
    studentId: 'STU004',
    subject: 'English',
    score: 60,
    date: '2025-01-20',
    condition: 'Frequent migraines',
  },
  {
    id: 12,
    studentId: 'STU004',
    subject: 'Science',
    score: 58,
    date: '2025-02-05',
    incident: 'Multiple low scores, high dropout risk alert',
    condition: 'Frequent migraines',
  },

  {
    id: 13,
    studentId: 'STU005',
    subject: 'Mathematics',
    score: 76,
    date: '2025-01-15',
    condition: 'Anemia',
  },
  {
    id: 14,
    studentId: 'STU005',
    subject: 'English',
    score: 81,
    date: '2025-01-20',
    condition: 'Anemia',
  },
  {
    id: 15,
    studentId: 'STU005',
    subject: 'Science',
    score: 79,
    date: '2025-02-05',
    condition: 'Anemia',
  },
];

export const attendancedata = [
  {
    id: 'a1',
    studentId: 'S001',
    studentName: 'Ama Kwame',
    date: '2025-09-01',
    status: 'Present',
  },
  {
    id: 'a2',
    studentId: 'S002',
    studentName: 'Kofi Mensah',
    date: '2025-09-01',
    status: 'Absent',
  },
  {
    id: 'a3',
    studentId: 'S003',
    studentName: 'Efua Addo',
    date: '2025-09-01',
    status: 'Late',
  },
];

// ✅ Mock dataset for demo purposes
export const financialrecords = [
  { id: 1, studentId: 'STU001', status: 'Paid', amount: 1200 },
  { id: 2, studentId: 'STU002', status: 'Pending', amount: 800 },
  { id: 3, studentId: 'STU003', status: 'Exempt', amount: 0 },
  { id: 4, studentId: 'STU004', status: 'Paid', amount: 1500 },
  { id: 5, studentId: 'STU005', status: 'Pending', amount: 500 },
  { id: 6, studentId: 'STU006', status: 'Paid', amount: 1000 },
  { id: 7, studentId: 'STU007', status: 'Exempt', amount: 0 },
  { id: 8, studentId: 'STU008', status: 'Pending', amount: 650 },
  { id: 9, studentId: 'STU009', status: 'Paid', amount: 2000 },
  { id: 10, studentId: 'STU010', status: 'Pending', amount: 300 },
];




export const interventionrecords = [
  {
    id: 1,
    studentId: "STU001",
    type: "Academic Counseling",
    date: "2025-01-15",
    status: "Completed",
  },
  {
    id: 2,
    studentId: "STU002",
    type: "Behavioral Support",
    date: "2025-01-20",
    status: "Active",
  },
  {
    id: 3,
    studentId: "STU003",
    type: "Financial Aid Review",
    date: "2025-02-01",
    status: "Pending",
  },
  {
    id: 4,
    studentId: "STU004",
    type: "Attendance Monitoring",
    date: "2025-02-05",
    status: "Active",
  },
  {
    id: 5,
    studentId: "STU005",
    type: "Health Checkup",
    date: "2025-02-10",
    status: "Completed",
  },
  {
    id: 6,
    studentId: "STU006",
    type: "Mentoring Session",
    date: "2025-02-12",
    status: "Pending",
  },
  {
    id: 7,
    studentId: "STU007",
    type: "Academic Counseling",
    date: "2025-02-15",
    status: "Active",
  },
  {
    id: 8,
    studentId: "STU008",
    type: "Behavioral Support",
    date: "2025-02-18",
    status: "Completed",
  },
  {
    id: 9,
    studentId: "STU009",
    type: "Financial Aid Review",
    date: "2025-02-20",
    status: "Pending",
  },
  {
    id: 10,
    studentId: "STU010",
    type: "Attendance Monitoring",
    date: "2025-02-22",
    status: "Active",
  },
];





export const dropoutdata = [
  {
    id: 1,
    studentName: "Alice Johnson",
    grade: "10",
    attendanceRate: 92,
    academicScore: 85,
    dropoutRisk: "Low",
  },
  {
    id: 2,
    studentName: "Brian Smith",
    grade: "11",
    attendanceRate: 70,
    academicScore: 60,
    dropoutRisk: "Medium",
  },
  {
    id: 3,
    studentName: "Carla Lopez",
    grade: "12",
    attendanceRate: 55,
    academicScore: 45,
    dropoutRisk: "High",
  },
];
