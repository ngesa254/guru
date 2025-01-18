// /* ----------------------------------------------------------------------------------
//    /home/user/Guru-AI/app/api/work/route.ts

//    This file simulates a "Work" (OneDrive) search endpoint. It expects a POST request
//    with a user query. It returns dummy JSON representing data from OneDrive.
//    In a real application, you would integrate with OneDrive or other internal file systems.
// ----------------------------------------------------------------------------------- */
// import { NextResponse } from 'next/server';

// export async function POST(request: Request) {
//   // Placeholder for reading the user's query from the request body
//   // const body = await request.json();
//   // const userQuery = body.query; // e.g. "Retrieve deliverables from Project X"

//   // Return dummy data as a placeholder
//   return NextResponse.json({
//     deliverables: ["Site evaluation", "Charging station setup"],
//     schedule: "Q1 2025",
//     owners: ["Team A", "Team B"]
//   });
// }


/* ----------------------------------------------------------------------------------
   /home/user/Guru-AI/app/api/work/route.ts

   UPDATED to return internal Safaricom 5G documents/data. 
   We ignore the user's actual query and return the same JSON. 
   In practice, you might parse the query to decide what data to retrieve.
----------------------------------------------------------------------------------- */
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  // Optional: read the user's query from the request
  // const body = await request.json();
  // const userQuery = body.query;

  // Return the expanded 5G data for internal Safaricom documents
  return NextResponse.json({
    documents: [
      "Safaricom 5G Expansion Proposal Q1 2025",
      "5G Product Catalogue 2024",
      "Airtel vs Safaricom Market Comparison"
    ],
    timeline: "Q1 2025 for initial deployment in 5 major cities",
    owners: [
      "5G Strategy Team",
      "Product Development Team"
    ],
    product_details: [
      {
        name: "Safaricom 5G Home Router",
        features: [
          "Speeds up to 2Gbps",
          "Built-in parental controls",
          "Smart home integration"
        ],
        pricing: "$55/month unlimited data"
      },
      {
        name: "Safaricom 5G Mobile Plan",
        features: [
          "Nationwide 5G coverage by 2025",
          "Affordable pay-as-you-go options",
          "Streaming optimization"
        ],
        pricing: "$30/month with 100GB data cap"
      }
    ],
    competitor_analysis: [
      {
        name: "Airtel 5G",
        strengths: ["Early adoption in urban areas", "Affordable pricing"],
        weaknesses: ["Limited rural coverage", "Higher latency"]
      }
    ],
    action_items: [
      "Draft a marketing comparison with Airtel's 5G plans",
      "Schedule a review meeting with the Product Development Team"
    ]
  });
}
