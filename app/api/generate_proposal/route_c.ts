// import { NextResponse } from 'next/server';

// interface ProposalData {
//   generated_proposal: string;
//   metadata: {
//     author: string;
//     version: string;
//   };
// }

// export async function POST(request: Request) {
//   try {
//     const { template, requirements } = await request.json();
    
//     await new Promise(resolve => setTimeout(resolve, 1500));
    
//     const response: ProposalData = {
//       generated_proposal: "UpdatedProposal_EV.docx",
//       metadata: {
//         author: "AI Copilot",
//         version: "1.0"
//       }
//     };
    
//     return NextResponse.json(response);
//   } catch (error) {
//     return NextResponse.json(
//       { error: "Failed to generate proposal" },
//       { status: 500 }
//     );
//   }
// }


// app/api/generate_proposal/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { requirements = [] } = body;

  // Dummy text that includes the user’s requirements
  const proposalText = `
  This is a generated proposal for an EV charging solution. 
  Based on your requirements: ${requirements.join(', ')}.
  
  1. Implement advanced charging stations.
  2. Ensure robust coverage across multiple lots.
  3. Integrate renewable energy sources.

  Thank you for choosing our solution.
  `;

  const dummyProposalResponse = {
    generated_proposal: proposalText,
    metadata: {
      author: 'AI System',
      version: 'v1.0',
    },
  };

  return NextResponse.json(dummyProposalResponse);
}
