import appRouter from '#routes/appRouter.routes.js';
import express from 'express';
import request from 'supertest';
import { describe, expect, test } from 'vitest';

const app = express();
app.use(appRouter);

describe('AppRouter test', () => {
  test('should return "Bus Tracker Application" on endpoint "/', async () => {
    const res = await request(app).get('/');
    expect(res.status).toBe(200);
    expect(res.text).toBe('Welcome To Bus Tracker Application');
  });
});
