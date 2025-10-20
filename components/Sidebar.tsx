'use client';

import Image from 'next/image';
import Link from 'next/link';
import LogoutButton from './logoutButton';

const menuItems = [
  { name: 'Dashboard', path: '/dashboard' },
  { name: 'Students', path: '/students' },
  { name: 'Academic Records', path: '/academic-records' },
  { name: 'Attendance Records', path: '/attendance-records' },
  { name: 'Behavior Records', path: '/behavior-records' },
  { name: 'Health Records', path: '/health-records' },
  { name: 'Financial Status', path: '/financial-status' },
  { name: 'Interventions', path: '/interventions' },
  { name: 'Dropout Prediction', path: '/dropout-prediction' },
  { name: 'Users', path: '/users' },
  { name: 'Settings', path: '/settings' },
];

function Sidebar() {

  return (
    <aside className="w-64 bg-blue-800 text-white min-h-screen p-6">
      <Image
        src="/logo.jpg"
        alt="logo"
        width="90"
        height="70"
        className="mb-3.5"
      />
      <h1 className="text-2xl font-bold mb-6">Dropout Dashboard</h1>
      <nav>
        <ul>
          {menuItems.map((item) => (
            <li key={item.name} className="mb-3 hover:bg-blue-700 p-2 rounded">
              <Link href={item.path}>{item.name}</Link>
            </li>
          ))}
          <li>
            <LogoutButton />
          </li>
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;
