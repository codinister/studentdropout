import { db } from '@/db';
import { ymd } from '@/utils/dateFormats';
import riskCalculator from '@/utils/riskCalculator';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(): Promise<any> {
  try {
    const student = await db.student.findMany({
      include: {
        academicRecords: true,
        interventions: true,
        behaviorrecords: true,
        healthrecord: true,
        financialstatus: true,
      },
    });

    if (student) {
      const studentsInfo = student.map((v) => {
        const score = Number(v.academicRecords?.score);
        const gpa = Number(v.academicRecords?.gpa);
        const attendance = Number(v.academicRecords?.attendance);
        const risk = riskCalculator({
          gpa,
          attendance,
          score,
        });

        return {
          studentId: v.studentId,
          studentName: v.studentName,
          level: v.level,
          phone: v.phone,
          nationality: v.nationality,
          residence: v.residence,
          gender: v.gender,
          admissiondate: ymd(v.admissiondate),
          birthdate: ymd(v.birthdate),
          score,
          gpa,
          attendance,
          risk,
          intervention: {
            interventionId: v.interventions?.interventionId,
            type: v.interventions?.type,
            date: v.interventions?.date,
            outcome: v.interventions?.outcome,
          },
        };
      });

      const interventions = student.map((v) => {
        return {
          ...studentsInfo,
          ...v.interventions,
        };
      });

      //Total Students
      const total_students = studentsInfo.length;

      //Interventions Active
      const total_interventions = interventions.length;

      //High Risk Students
      const highRisk = studentsInfo.filter(
        (v) => v.risk === 'High Risk'
      )

      //Medium Risk Students
      const mediumRisk = studentsInfo.filter(
        (v) => v.risk === 'Medium Risk'
      ).length;

      //Low Risk Students
      const lowRisk = studentsInfo.filter((v) => v.risk === 'Low Risk').length;

      return NextResponse.json([{
        studentsInfo,
        highRiskStudents: highRisk,
        total_students,
        total_interventions,
        highRisk: highRisk.length,
        mediumRisk,
        lowRisk,
      }]);
    }

    return NextResponse.json(
      {
        error: 'An error occured',
      },
      { status: 400 }
    );
  } catch (error) {
    return error;
  }
}
