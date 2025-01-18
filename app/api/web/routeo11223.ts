// // import { NextRequest, NextResponse } from 'next/server';

// // /**
// //  * Dummy data representing “WEB” research results (EV passenger data, etc.).
// //  */
// // const dummyWebData = {
// //   daily_passengers: 90000,
// //   ev_parking_spaces: 1250,
// //   confidence: 0.94,
// //   sources: [
// //     {
// //       url: 'https://www.example.com/ev-charging-lax',
// //       title: 'EV Charging at LAX',
// //       timestamp: '2024-12-23T10:00:00Z',
// //     },
// //   ],
// //   competitors: [
// //     {
// //       name: 'ChargeX Solutions',
// //       stations: 120,
// //       locations: ['Airport Hub', 'Downtown'],
// //     },
// //     {
// //       name: 'EV-GoNow',
// //       stations: 85,
// //       locations: ['Mall District', 'Suburbs'],
// //     },
// //   ],
// //   requirements: ['Faster charging', 'Renewable integration', 'Large coverage area'],
// // };

// // export async function POST(req: NextRequest) {
// //   // We simulate a "web" search and just return dummy data
// //   return NextResponse.json(dummyWebData);
// // }


// import { NextRequest, NextResponse } from 'next/server';

// /**
//  * Dummy data representing “WEB” research results:
//  * e.g. passenger data, EV charger counts, competitor info, etc.
//  */
// const dummyWebData = {
//   daily_passengers: 90000,
//   ev_parking_spaces: 1300,
//   confidence: 0.92,
//   sources: [
//     {
//       url: 'https://www.example.com/lax-ev-charging',
//       title: 'EV Charging at LAX',
//       timestamp: '2024-12-23T10:00:00Z',
//     },
//   ],
//   competitors: [
//     {
//       name: 'GreenCharge Inc',
//       stations: 120,
//       locations: ['Airport District', 'Downtown'],
//     },
//     {
//       name: 'EV-PowerX',
//       stations: 95,
//       locations: ['Mall Area', 'Suburbs'],
//     },
//   ],
//   requirements: ['Faster charging', 'Renewable integration', 'Large coverage area'],
// };

// export async function POST(req: NextRequest) {
//   // In reality, parse user’s query from req.json() and do a real web search
//   return NextResponse.json(dummyWebData);
// }


import { NextRequest, NextResponse } from 'next/server';

const dummyWebData = {
  daily_passengers: 90000,
  ev_parking_spaces: 1300,
  confidence: 0.92,
  sources: [
    {
      url: 'https://www.example.com/lax-ev-charging',
      title: 'EV Charging at LAX',
      timestamp: '2024-12-23T10:00:00Z',
    },
  ],
  competitors: [
    {
      name: 'GreenCharge Inc',
      stations: 120,
      locations: ['Airport District', 'Downtown'],
    },
    {
      name: 'EV-PowerX',
      stations: 95,
      locations: ['Mall Area', 'Suburbs'],
    },
  ],
  requirements: ['Faster charging', 'Renewable integration', 'Large coverage area'],
};

export async function POST(req: NextRequest) {
  return NextResponse.json(dummyWebData);
}
