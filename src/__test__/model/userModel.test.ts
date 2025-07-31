import userModel from '#models/userModel.js';
import { describe, expect, test } from 'vitest';

describe('UserModel', () => {
  test('validate user', async () => {
    const user = new userModel({
      bio: 'A developer',
      email: 'john@example.com',
      fullname: 'John Doe',
      password: 'secret123',
      profilePhoto: 'pic.jpg',
    });
    await expect(user.validate()).resolves.toBeUndefined();
  });

  test('no validation if required field missing', async () => {
    const user = new userModel({
      bio: 'missing required fieds',
    });
    await expect(user.validate()).rejects.toThrow();
  });

  //hjk test('password should be hidden', () => {
  //   const mockUser = new userModel({
  //     email: 'john@example.com',
  //     fullname: 'John Doe',
  //     password: 'secret123',
  //   });
  //   const userObject = mockUser.toObject();
  //   expect(userObject.password).toBeUndefined();
  // });

  test('allow optional field to be missing', async () => {
    const user = new userModel({
      email: 'jane@example.com',
      fullname: 'Jane Doe',
      password: 'pass1234',
    });
    await expect(user.validate()).resolves.toBeUndefined();
  });
});
