import app from '#index.js';
import request from 'supertest';
import { describe, expect, it } from 'vitest';

describe('GET /', () => {
  it('should return Bus Tracker Application', async () => {
    const res = await request(app).get('/');
    expect(res.status).toBe(200);
    expect(res.text).toBe('Bus Tracker Application');
  });
});
