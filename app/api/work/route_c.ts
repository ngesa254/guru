// /home/user/Guru-AI/app/api/work/route.ts
import { NextRequest, NextResponse } from 'next/server';

const dummyWorkData = {
  projectMilestones: [
    {
      milestone: 'Identify the working team',
      workbackSchedule: 'Week 1',
      owner: 'Cecil Fok',
    },
    {
      milestone: 'Kickoff meeting',
      workbackSchedule: 'Week 1',
      owner: 'Lydia Bauer',
    },
    {
      milestone: 'Customer research',
      workbackSchedule: 'Week 2-4',
      owner: 'Aadi Kapoor',
    },
    {
      milestone: 'Proposal outline',
      workbackSchedule: 'Week 2',
      owner: 'Lydia Bauer',
    },
    {
      milestone: 'Write the proposal',
      workbackSchedule: 'Week 3',
      owner: 'Aadi Kapoor',
    },
    {
      milestone: 'Obtain internal approvals',
      workbackSchedule: 'Week 4',
      owner: 'Cecil Fok',
    },
    {
      milestone: 'Submit the proposal',
      workbackSchedule: 'Week 5',
      owner: 'Kat Larson',
    },
  ],
};

export async function POST(req: NextRequest) {
  // For demonstration, ignoring the user’s query
  // Return dummy data about project milestones, owners, etc.
  return NextResponse.json(dummyWorkData);
}
