'use client';

import Image from 'next/image';
import Link from 'next/link';
import LogoutButton from './logoutButton';
import { FaGear } from 'react-icons/fa6';
import { IoIosHome, IoMdBook, IoMdStats } from 'react-icons/io';
import { FiUsers } from 'react-icons/fi';
import { PiRecordThin } from 'react-icons/pi';
import { RiUserShared2Line } from 'react-icons/ri';
import { MdOnlinePrediction, MdOutlineHealthAndSafety } from 'react-icons/md';
import { CiBullhorn, CiMoneyCheck1 } from 'react-icons/ci';
import { HiOutlineUsers } from 'react-icons/hi';

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
          <li className="mb-3 hover:bg-blue-700 p-2 rounded">
            <Link href="/dashboard" className="flex gap-4 items-center">
              <IoIosHome /> Dashboard{' '}
            </Link>
          </li>

          <li className="mb-3 hover:bg-blue-700 p-2 rounded">
            <Link href="/subject" className="flex gap-4 items-center">
              <IoMdBook /> Programmes
            </Link>
          </li>

          <li className="mb-3 hover:bg-blue-700 p-2 rounded">
            <Link href="/students" className="flex gap-4 items-center">
              <FiUsers /> Students{' '}
            </Link>
          </li>

          <li className="mb-3 hover:bg-blue-700 p-2 rounded">
            <Link href="/academic-records" className="flex gap-4 items-center">
              <PiRecordThin />
              Academic Records{' '}
            </Link>
          </li>

  

          <li className="mb-3 hover:bg-blue-700 p-2 rounded">
            <Link href="/behavior-records" className="flex gap-4 items-center">
              <IoMdStats /> Behavior Records{' '}
            </Link>
          </li>

          <li className="mb-3 hover:bg-blue-700 p-2 rounded">
            <Link href="/health-records" className="flex gap-4 items-center">
              <MdOutlineHealthAndSafety /> Health Records{' '}
            </Link>
          </li>

          <li className="mb-3 hover:bg-blue-700 p-2 rounded">
            <Link href="/financial-status" className="flex gap-4 items-center">
              <CiMoneyCheck1 />
              Financial Status{' '}
            </Link>
          </li>

          <li className="mb-3 hover:bg-blue-700 p-2 rounded">
            <Link href="/interventions" className="flex gap-4 items-center">
              <CiBullhorn /> Interventions
            </Link>
          </li>

          <li className="mb-3 hover:bg-blue-700 p-2 rounded">
            <Link
              href="/dropout-prediction"
              className="flex gap-4 items-center"
            >
              <MdOnlinePrediction /> Dropout Prediction
            </Link>
          </li>

          <li className="mb-3 hover:bg-blue-700 p-2 rounded">
            <Link href="/users" className="flex gap-4 items-center">
              <HiOutlineUsers /> Users
            </Link>
          </li>
          <li className="mb-3  hover:bg-blue-700 p-2 rounded">
            <Link href="/settings" className="flex gap-4 items-center">
              <FaGear /> Settings
            </Link>
          </li>

          <li>
            <LogoutButton />
          </li>
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;
