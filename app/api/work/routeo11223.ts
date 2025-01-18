// // import { NextRequest, NextResponse } from 'next/server';

// // /**
// //  * Dummy data for “WORK” (OneDrive or internal doc) scenario:
// //  * E.g. project milestones, deliverables, owners, etc.
// //  */
// // const dummyWorkData = {
// //   projectMilestones: [
// //     { milestone: 'Identify the core EV team', workbackSchedule: 'Week 1', owner: 'Cecil Fok' },
// //     { milestone: 'Kickoff meeting', workbackSchedule: 'Week 1', owner: 'Lydia Bauer' },
// //     { milestone: 'Customer research', workbackSchedule: 'Week 2-4', owner: 'Aadi Kapoor' },
// //     { milestone: 'Proposal outline', workbackSchedule: 'Week 2', owner: 'Lydia Bauer' },
// //     { milestone: 'Draft final proposal', workbackSchedule: 'Week 3', owner: 'Aadi Kapoor' },
// //     { milestone: 'Obtain internal approvals', workbackSchedule: 'Week 4', owner: 'Cecil Fok' },
// //     { milestone: 'Submit the proposal', workbackSchedule: 'Week 5', owner: 'Kat Larson' },
// //   ],
// // };

// // export async function POST(req: NextRequest) {
// //   // Simulate “WORK” data retrieval
// //   return NextResponse.json(dummyWorkData);
// // }


// import { NextRequest, NextResponse } from 'next/server';

// /**
//  * Dummy data for “WORK” scenario (like OneDrive or internal docs).
//  * Project milestones, deliverables, owners, etc.
//  */
// const dummyWorkData = {
//   projectMilestones: [
//     { milestone: 'Form EV team', workbackSchedule: 'Week 1', owner: 'Cecil Fok' },
//     { milestone: 'Kickoff meeting', workbackSchedule: 'Week 1', owner: 'Lydia Bauer' },
//     { milestone: 'Customer research', workbackSchedule: 'Week 2-4', owner: 'Aadi Kapoor' },
//     { milestone: 'Draft EV proposal', workbackSchedule: 'Week 2-3', owner: 'Lydia Bauer' },
//     { milestone: 'Internal approvals', workbackSchedule: 'Week 4', owner: 'Cecil Fok' },
//     { milestone: 'Submit proposal', workbackSchedule: 'Week 5', owner: 'Kat Larson' },
//   ],
// };

// export async function POST(req: NextRequest) {
//   // Simulate reading from internal "WORK" data
//   return NextResponse.json(dummyWorkData);
// }

import { NextRequest, NextResponse } from 'next/server';

const dummyWorkData = {
  projectMilestones: [
    { milestone: 'Form EV team', workbackSchedule: 'Week 1', owner: 'Cecil Fok' },
    { milestone: 'Kickoff meeting', workbackSchedule: 'Week 1', owner: 'Lydia Bauer' },
    { milestone: 'Customer research', workbackSchedule: 'Week 2-4', owner: 'Aadi Kapoor' },
    { milestone: 'Draft EV proposal', workbackSchedule: 'Week 2-3', owner: 'Lydia Bauer' },
    { milestone: 'Internal approvals', workbackSchedule: 'Week 4', owner: 'Cecil Fok' },
    { milestone: 'Submit proposal', workbackSchedule: 'Week 5', owner: 'Kat Larson' },
  ],
};

export async function POST(req: NextRequest) {
  return NextResponse.json(dummyWorkData);
}
