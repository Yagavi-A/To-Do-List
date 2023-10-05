// user.test.ts

import { describe, test, expect } from '@jest/globals';
import request from 'supertest';
import { userLogin, userSignUp } from './controllers/user'; // Adjust the import path

describe('userLogin', () => {
  test('should login successfully', async () => {
    // Mock request and response objects
    const req = { body: { uEmail: 'test@example.com', uPassword: 'password' } };
    const res = { json: jest.fn(), send: jest.fn(), status: jest.fn().mockReturnValue({ json: jest.fn() }) };

    // TODO: Mock User.findOne and bcrypt.compare

    // Call the function
    await userLogin(req, res);

    // TODO: Add assertions based on your mocked data and logic
  });
});

describe('userSignUp', () => {
  test('should sign up a user successfully', async () => {
    const req = { body: { uEmail: 'test@example.com', uPassword: 'password' } };
    const res = { json: jest.fn(), status: jest.fn().mockReturnValue({ json: jest.fn() }) };

    // TODO: Mock User.prototype.save

    await userSignUp(req, res);

    // TODO: Add assertions based on your mocked data and logic
  });
});
