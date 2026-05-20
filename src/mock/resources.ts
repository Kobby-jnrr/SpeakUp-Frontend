import type { Resource } from '../types';

export const mockResources: Resource[] = [
  { id: 'res-001', title: 'What to do after abuse', category: 'What to do after abuse', summary: 'Immediate steps for preserving safety, documenting concerns, and seeking support through approved university channels.', published: true, updatedAt: '2026-05-05' },
  { id: 'res-002', title: 'Counseling unit support hours', category: 'Counseling support', summary: 'Confidential counseling is available Monday to Friday from 8:30 AM to 5:00 PM at the Student Affairs building.', contact: 'counseling@university.edu', published: true, updatedAt: '2026-05-03' },
  { id: 'res-003', title: 'Student rights during reporting', category: 'Student rights', summary: 'Students may report confidentially, request support, and choose whether to provide identifying information.', published: true, updatedAt: '2026-04-28' },
  { id: 'res-004', title: 'Institutional reporting policy', category: 'Reporting policy', summary: 'A plain-language overview of how reports are reviewed, assigned, escalated, and closed by authorized staff.', published: true, updatedAt: '2026-04-21' },
  { id: 'res-005', title: 'Campus safety contacts', category: 'Campus safety contacts', summary: 'Security desk, residence assistants, health center, and after-hours emergency contact information.', contact: '+233 30 000 0123', published: true, updatedAt: '2026-05-08' },
  { id: 'res-006', title: 'External support services', category: 'External support services', summary: 'Verified local support organizations and public emergency services available outside the university.', contact: '112', published: false, updatedAt: '2026-05-01' },
];
