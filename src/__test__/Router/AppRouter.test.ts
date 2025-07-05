import appRouter from '#routes/AppRouter.js';
import express from 'express';
import request from 'supertest';
import { describe, expect, it } from 'vitest';

const app = express();
app.use(appRouter);

describe('AppRouter test', () => {
  it('should return "Bus Tracker Application" on endpoint "/', async () => {
    const res = await request(app).get('/');
    expect(res.status).toBe(200);
    expect(res.text).toBe('Bus Tracker Application');
  });
});
