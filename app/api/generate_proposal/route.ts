// // import { NextRequest, NextResponse } from 'next/server';

// // /**
// //  * Simulated AI proposal generation
// //  */
// // export async function POST(req: NextRequest) {
// //   const body = await req.json();
// //   const { requirements = [] } = body;

// //   const proposalText = `
// //   EV Charging Proposal:

// //   Based on your requirements:
// //   - ${requirements.join('\n- ')}

// //   1. Deploy advanced Level 2 and DC Fast chargers in high-traffic areas.
// //   2. Ensure coverage in key airport lots, downtown areas, and malls.
// //   3. Integrate solar or wind energy sources where feasible.
// //   4. Implement robust user experience and compliance with local building codes.
  
// //   Thank you for choosing our solution.
// //   `;

// //   const responseData = {
// //     generated_proposal: proposalText,
// //     metadata: {
// //       author: 'Brain AI System',
// //       version: 'v1.0',
// //     },
// //   };

// //   return NextResponse.json(responseData);
// // }



// import { NextRequest, NextResponse } from 'next/server';

// /**
//  * Simulated AI-based proposal generation
//  */
// export async function POST(req: NextRequest) {
//   const body = await req.json();
//   const { requirements = [] } = body;

//   const proposalText = `
//   EV Charging Proposal:

//   Requirements:
//   - ${requirements.join('\n- ')}

//   1. Deploy advanced charging stations in busiest parking lots
//   2. Incorporate solar or other renewable sources
//   3. Ensure compliance with local building codes

//   Thank you for choosing our EV solution.
//   `;

//   const dummyProposal = {
//     generated_proposal: proposalText,
//     metadata: {
//       author: 'Brain AI System',
//       version: '1.0',
//     },
//   };

//   return NextResponse.json(dummyProposal);
// }


import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { requirements = [] } = body;

  const proposalText = `
  EV Charging Proposal:

  Requirements:
  - ${requirements.join('\n- ')}

  1. Deploy advanced charging stations in busiest parking lots
  2. Incorporate renewable energy sources
  3. Ensure compliance with local building codes

  Thank you for choosing our EV solution.
  `;

  const dummyProposal = {
    generated_proposal: proposalText,
    metadata: {
      author: 'Brain AI System',
      version: '1.0',
    },
  };

  return NextResponse.json(dummyProposal);
}
