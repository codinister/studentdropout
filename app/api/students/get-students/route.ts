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
      let roleView: string[] = [];

      const studentsInfo = student.map((v) => {
        const score = Number(v.academicRecords?.score);
        const gpa = Number(v.academicRecords?.gpa);
        const attendance = Number(v.academicRecords?.attendance);
        const risk = riskCalculator({
          gpa,
          attendance,
          score,
        });

        if (risk.riskLevel === 'High Risk') {
          roleView = ['Administrators', 'Counselors'];
        } else if (risk.riskLevel === 'Medium Risk') {
          roleView = ['Administrators', 'Academic Advisors'];
        } else if (risk.riskLevel === 'Low Risk') {
          roleView = ['Administrators', 'Academic Advisors'];
        }

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
          dropoutRisk: risk.riskLevel,
          roleView,
          financialStatus: v.financialstatus?.status,
          intervention: {
            interventionId: v.interventions?.interventionId,
            type: v.interventions?.type,
            date: v.interventions?.date,
            outcome: v.interventions?.outcome,
          },
        };
      });


      //High Risk Students
      const highRisk = studentsInfo.filter((v) => v.dropoutRisk === 'High Risk');

      return NextResponse.json([
        {
          studentsInfo,
          highRiskStudents: highRisk
        },
      ]);
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
