import type { User } from '../types';

export const mockUsers: User[] = [
  {
    id: 'stu-001',
    name: 'Ama Boateng',
    email: 'ama.boateng@student.university.edu',
    role: 'student',
    studentId: 'STU-2026-0142',
    department: 'Computer Science',
  },
  {
    id: 'adm-001',
    name: 'Dr. Kwame Mensah',
    email: 'counseling@university.edu',
    role: 'admin',
    title: 'Senior Student Welfare Counselor',
    department: 'Student Affairs and Counseling Unit',
  },
];
