// @ts-check
const { test, expect } = require('@playwright/test');
const { apiBase } = require('../utils/apiBase');
const productGetSchema = require('../apiSchemas/getProductSchema.json');
const productPostSchema = require('../apiSchemas/postProductSchema.json');
const data = require('../testdata/testData.json');

test.describe('Verify API', async () => {
    let api;

    test.beforeEach(async ({ request }) => {
        api = new apiBase(request);
    });

    test('Verify GET API Schema', async () => {
        const response = await api.authenticateUserWithParameter("GET", "/products/1");
        const responseBody = await response.json();
        await api.validateApiResponse(productGetSchema, responseBody);
        await api.validateResponseOk(response);
    });

    test('Verify POST API Schema', async () => {
        await api.assignRequestData(data.POST_PAYLOAD);
        const response = await api.authenticateUserWithParameter("POST", "/products/add");
        const responseBody = await response.json();
        await api.validateApiResponse(productPostSchema, responseBody);
        await api.validateResponseCreated(response);
    });
});