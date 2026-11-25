import express from 'express';
import { GoogleGenAI } from '@google/genai';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  app.use(express.json());

  const PORT = process.env.PORT || 3000;

  // Initialize Gemini AI client if API key is present
  const apiKey = process.env.GEMINI_API_KEY;
  const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

  // API Routes
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // AI Coach endpoint using Gemini
  app.post('/api/ai-coach', async (req, res) => {
    try {
      const { tradesSummary, metrics, strategies, psychology } = req.body;

      if (!ai) {
        return res.status(500).json({ 
          error: 'Gemini API key not configured. Please set GEMINI_API_KEY in secrets.' 
        });
      }

      const prompt = `You are EDGE AI Coach, an elite algorithmic trading coach and risk management expert inspired by top proprietary trading firms. Analyze the following trader performance data and provide 3-4 precise, actionable, data-driven coaching insights and observations. Focus on session performance, mistakes, risk management, win rate patterns, and psychology.

Trader Performance Data:
- Key Metrics: ${JSON.stringify(metrics)}
- Recent Trades Sample: ${JSON.stringify(tradesSummary?.slice(0, 15))}
- Strategies: ${JSON.stringify(strategies)}
- Psychology / Emotions: ${JSON.stringify(psychology)}

Return a JSON response with an array of insights. Each insight must have:
- title: string (short catchy title)
- type: 'strength' | 'weakness' | 'opportunity' | 'warning'
- observation: string (detailed data-driven analysis)
- recommendation: string (actionable advice to improve trading edge)

Return ONLY valid JSON format:
{
  "insights": [
    {
      "title": "...",
      "type": "...",
      "observation": "...",
      "recommendation": "..."
    }
  ],
  "summary": "Overall expert assessment of the trader's current edge."
}`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
        }
      });

      const text = response.text;
      if (!text) {
        throw new Error('No response from AI model');
      }

      const result = JSON.parse(text);
      res.json(result);
    } catch (error: any) {
      console.error('AI Coach error:', error);
      res.status(500).json({ error: error.message || 'Failed to generate AI coaching insights' });
    }
  });

  // Setup Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`EDGE server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch(err => {
  console.error('Failed to start server:', err);
});
