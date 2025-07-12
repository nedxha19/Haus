import { json } from '@sveltejs/kit';

const API_KEY = 'AIzaSyBRZp5oeKA4VQwy9PdtgtHG4KMzxRYgY6M';
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.0-pro:generateContent?key=${API_KEY}`;

export async function POST({ request }) {
  try {
    const { history } = await request.json();
    
    // Get the last message from history
    const lastMessage = history[history.length - 1];
    
    const requestBody = {
      contents: [{
        parts: [{
          text: lastMessage.text
        }]
      }],
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 1024,
      }
    };

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Gemini API error:', errorData);
      return json({ reply: 'Error from Gemini API: ' + (errorData.error?.message || 'Unknown error') }, { status: 500 });
    }

    const data = await response.json();
    const reply =
      data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ||
      'Sorry, no response.';

    return json({ reply });
  } catch (err) {
    console.error('Server error:', err);
    return json({ reply: 'Internal server error: ' + err.message }, { status: 500 });
  }
}
