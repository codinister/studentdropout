'use client';

import PageHeader from '@/components/PageHeader';
import AttendanceRecordForm from '@/components/attendancerecord/AttendanceRecordForm';
import AttendanceRecordDataTable from '@/components/tableRows/AttendanceRecordDataTable';
import { useEffect} from 'react';
import useDispatchselector from '@/state/redux/useDispatchselector';
import { fetchAttendancerecord } from '@/state/redux/slice/asyncThunkFn';
import { attendanceRecordSchema} from '@/types/types';
import useAttendanceRecordColumns  from '@/components/tableColumns/useAttendanceRecordColumns ';

const AttendanceRecord = () => {

  const { attendanceColumn } = useAttendanceRecordColumns();

  const pdfFn = () => {};

  const { dispatch, selector } = useDispatchselector();

  useEffect(() => {
    dispatch(fetchAttendancerecord());
  }, [dispatch]);

  const attendance_records = selector((state) => state?.attendancerecord);

  const data: attendanceRecordSchema[] = attendance_records;

  return (
    <>
      <div className="bg-white">
        <PageHeader
          modalButtonName="Add Attendance"
          component={AttendanceRecordForm} // ✅ pass reference
          pdfFn={pdfFn}
          pageTitle="Attendance Records"
        />

        <AttendanceRecordDataTable columns={attendanceColumn} data={data} />
      </div>
    </>
  );
};

export default AttendanceRecord
