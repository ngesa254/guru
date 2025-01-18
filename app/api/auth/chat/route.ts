import { NextResponse } from 'next/server';

// Mock AI response generator
const generateAIResponse = (message: string) => {
  // Simple mock responses based on message content
  if (message.toLowerCase().includes('ev') || message.toLowerCase().includes('charging')) {
    return {
      response: "Based on our analysis, here are the EV charging station details:\n\n" +
        "- Daily passengers at Central Station: 4,500\n" +
        "- Available EV charging spaces: 120\n" +
        "- Peak usage hours: 7-9 AM, 4-6 PM",
      canvasElements: [
        {
          id: crypto.randomUUID(),
          type: 'chart',
          content: {
            type: 'bar',
            data: {
              labels: ['7AM', '8AM', '9AM', '4PM', '5PM', '6PM'],
              values: [85, 95, 75, 90, 100, 80],
            },
            title: 'EV Charging Station Usage (%)',
          },
          position: { x: 100, y: 100 },
        },
        {
          id: crypto.randomUUID(),
          type: 'text',
          content: 'Peak Usage Analysis',
          position: { x: 100, y: 50 },
        },
      ],
    };
  }

  if (message.toLowerCase().includes('competitor')) {
    return {
      response: "Here's the competitor analysis for EV charging stations:\n\n" +
        "Company A: 30 stations\n" +
        "Company B: 25 stations\n" +
        "Key locations covered: Downtown, Airport, Industrial Areas",
      canvasElements: [
        {
          id: crypto.randomUUID(),
          type: 'table',
          content: {
            headers: ['Company', 'Stations', 'Locations'],
            rows: [
              ['Company A', '30', 'Downtown, Suburbs'],
              ['Company B', '25', 'Airport, Industrial Areas'],
            ],
          },
          position: { x: 300, y: 100 },
        },
      ],
    };
  }

  // Default response
  return {
    response: "I understand you're interested in EV charging stations. What specific information would you like to know about?",
    canvasElements: [],
  };
};

export async function POST(request: Request) {
  try {
    const { message } = await request.json();
    
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const aiResponse = generateAIResponse(message);
    
    return NextResponse.json(aiResponse);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}