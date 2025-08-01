interface Env {
  DB: {
    prepare: (...args: any[]) => any;
  };
}

import { Hono } from "hono";
import { zValidator } from '@hono/zod-validator';
import { AssessmentSubmissionSchema } from '@/shared/types';
import fetch from 'node-fetch';

const app = new Hono<{ Bindings: Env }>();

// Submit assessment and calculate results
app.post('/api/assessment', 
  zValidator('json', AssessmentSubmissionSchema),
  async (c) => {
    try {
      const { userName, userAge, userCompany, answers } = c.req.valid('json');
      
      // Calculate scores for each type
      const scores = { I: 0, C: 0, O: 0, A: 0 };
      
      answers.forEach(answer => {
        scores[answer.answer]++;
      });

      // Determine dominant type
      const dominantType = Object.entries(scores).reduce((a, b) => 
        scores[a[0] as keyof typeof scores] > scores[b[0] as keyof typeof scores] ? a : b
      )[0];

      // Save to database
      const result = await c.env.DB.prepare(`
        INSERT INTO assessments (user_name, user_age, user_company, answers, i_score, c_score, o_score, a_score, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, datetime('now'), datetime('now'))
      `).bind(
        userName,
        userAge,
        userCompany,
        JSON.stringify(answers),
        scores.I,
        scores.C,
        scores.O,
        scores.A
      ).run();

      if (!result.success) {
        throw new Error('Failed to save assessment');
      }

      // Send data to webhook
      const webhookData = {
        id: result.meta.last_row_id,
        userName,
        userAge,
        userCompany,
        answers,
        scores: {
          idealista: scores.I,
          colaborativo: scores.C,
          organizador: scores.O,
          assertivo: scores.A
        },
        dominantType,
        createdAt: new Date().toISOString(),
        testType: 'Teste de Preferência Cerebral'
      };

      // Send to webhook (don't wait for response to avoid delays)
      try {
        fetch('https://n8nwebhook.projetosjl.com.br/webhook/back-forms-respostas', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(webhookData)
        }).catch((error: unknown) => {
          console.error('Webhook error:', error);
        });
      } catch (error: unknown) {
        console.error('Failed to send webhook:', error);
      }

      return c.json({
        id: result.meta.last_row_id,
        userName,
        userAge,
        userCompany,
        iScore: scores.I,
        cScore: scores.C,
        oScore: scores.O,
        aScore: scores.A,
        dominantType,
        createdAt: new Date().toISOString()
      });
    } catch (error: unknown) {
      console.error('Error saving assessment:', error);
      return c.json({ error: 'Failed to process assessment' }, 500);
    }
  }
);

// Get assessment result by ID
app.get('/api/assessment/:id', async (c) => {
  try {
    const id = c.req.param('id');
    
    const result = await c.env.DB.prepare(`
      SELECT id, user_name, user_age, user_company, i_score, c_score, o_score, a_score, created_at
      FROM assessments 
      WHERE id = ?
    `).bind(id).first();

    if (!result) {
      return c.json({ error: 'Assessment not found' }, 404);
    }

    // Determine dominant type
    const scores = {
      I: result.i_score as number,
      C: result.c_score as number,
      O: result.o_score as number,
      A: result.a_score as number
    };

    const dominantType = Object.entries(scores).reduce((a, b) => 
      scores[a[0] as keyof typeof scores] > scores[b[0] as keyof typeof scores] ? a : b
    )[0];

    return c.json({
      id: result.id,
      userName: result.user_name,
      userAge: result.user_age,
      userCompany: result.user_company,
      iScore: result.i_score,
      cScore: result.c_score,
      oScore: result.o_score,
      aScore: result.a_score,
      dominantType,
      createdAt: result.created_at
    });
  } catch (error: unknown) {
    console.error('Error fetching assessment:', error);
    return c.json({ error: 'Failed to fetch assessment' }, 500);
  }
});

export default app;
