import { NextResponse } from 'next/server';

// Types for research responses
interface EVStationData {
  daily_passengers: number;
  ev_parking_spaces: number;
  confidence: number;
  sources: Array<{
    url: string;
    title: string;
    timestamp: string;
  }>;
}

interface CompetitorData {
  competitors: Array<{
    name: string;
    stations: number;
    locations: string[];
  }>;
}

export async function POST(request: Request) {
  try {
    const { query } = await request.json();
    
    // Simulate API processing delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (query.toLowerCase().includes('passenger') || query.toLowerCase().includes('charging')) {
      const response: EVStationData = {
        daily_passengers: 4500,
        ev_parking_spaces: 120,
        confidence: 0.97,
        sources: [
          {
            url: "https://example.com/report",
            title: "EV Trends 2024",
            timestamp: "2024-12-01"
          }
        ]
      };
      return NextResponse.json(response);
    }
    
    if (query.toLowerCase().includes('competitor')) {
      const response: CompetitorData = {
        competitors: [
          {
            name: "Company A",
            stations: 30,
            locations: ["Downtown", "Suburbs"]
          },
          {
            name: "Company B",
            stations: 25,
            locations: ["Airport", "Industrial Areas"]
          }
        ]
      };
      return NextResponse.json(response);
    }

    return NextResponse.json({
      error: "No relevant data found",
      suggestion: "Try asking about passenger numbers, charging stations, or competitors"
    }, { status: 404 });

  } catch (error) {
    return NextResponse.json(
      { error: "Failed to process research request" },
      { status: 500 }
    );
  }
}