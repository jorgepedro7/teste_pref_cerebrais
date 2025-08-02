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
      
      // Calcular scores
      const scores = { I: 0, C: 0, O: 0, A: 0 };
      answers.forEach(answer => {
        scores[answer.answer]++;
      });

      // Determinar tipo dominante
      const dominantType = Object.entries(scores).reduce((a, b) => 
        scores[a[0] as keyof typeof scores] > scores[b[0] as keyof typeof scores] ? a : b
      )[0];

      // Montar dados para o webhook
      const webhookData = {
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

      // Enviar para o webhook
      const response = await fetch('https://n8nwebhook.projetosjl.com.br/webhook/back-forms-respostas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(webhookData)
      });

      if (!response.ok) {
        throw new Error('Falha ao enviar para o webhook');
      }

      return c.json({
        success: true,
        webhookData
      });
    } catch (error: unknown) {
      console.error('Error sending assessment:', error);
      return c.json({ error: 'Failed to send assessment' }, 500);
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
