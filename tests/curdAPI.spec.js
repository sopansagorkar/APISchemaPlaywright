/**
 * @file curdAPI.spec.js
 * @description This file contains Playwright tests for verifying CRUD operations on an API.
 * @module tests/curdAPI
 */

const { test, expect } = require('@playwright/test');
const { apiBase } = require('../utils/apiBase');
const data = require('../testdata/testData.json');

test.describe('Verify API', async () => {
  let api;

  /**
   * Before each test, initialize the apiBase instance with the request object.
   * @param {object} request - The request object provided by Playwright.
   */
  test.beforeEach(async ({ request }) => {
    api = new apiBase(request);
  });

  /**
   * Test to verify the GET API endpoint.
   * Sends a GET request to /products/1 and validates the response.
   */
  test('Verify GET API', async () => {
    const response = await api.authenticateUserWithParameter("GET", "/products/1");
    await api.validateResponseOk(response);
  });

  /**
   * Test to verify the POST API endpoint.
   * Sends a POST request to /products/add with payload and validates the response.
   */
  test('Verify POST API', async () => {
    await api.assignRequestData(data.POST_PAYLOAD);
    const response = await api.authenticateUserWithParameter("POST", "/products/add");
    await api.validateResponseCreated(response);
  });

  /**
   * Test to verify the PUT API endpoint.
   * Sends a PUT request to /products/1 with payload and validates the response.
   */
  test('Verify PUT API', async () => {
    await api.assignRequestData(data.PUT_PAYLOAD);
    const response = await api.authenticateUserWithParameter("PUT", "/products/1");
    await api.validateResponseOk(response);
  });

  /**
   * Test to verify the DELETE API endpoint.
   * Sends a DELETE request to /products/1 and validates the response.
   */
  test('Verify DELETE API', async () => {
    const response = await api.authenticateUserWithParameter("DELETE", "/products/1");
    await api.validateResponseOk(response);
  });
});
