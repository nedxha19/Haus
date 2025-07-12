import { json } from '@sveltejs/kit';

const API_KEY = 'AIzaSyBRZp5oeKA4VQwy9PdtgtHG4KMzxRYgY6M';
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEY}`;

export async function GET() {
  try {
    const response = await fetch(API_URL, {
      method: 'GET',
      headers: { 
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Gemini API error:', errorData);
      return json({ error: 'Error from Gemini API: ' + (errorData.error?.message || 'Unknown error') }, { status: 500 });
    }

    const data = await response.json();
    return json(data);
  } catch (err) {
    console.error('Server error:', err);
    return json({ error: 'Internal server error: ' + err.message }, { status: 500 });
  }
} 