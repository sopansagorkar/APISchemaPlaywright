// @ts-check
const { test, expect } = require('@playwright/test');
const {apiBase} = require('../utils/apiBase');
const data=require('../testdata/testData.json');
test.describe('Verify API', async () => {
  let api;

  test.beforeEach(async ({request}) => {
    api = new apiBase(request);
  });


test('Verify GET API', async () => {
  const response =await api.authenticateUserWithParameter("GET","/products/1");
  await api.validateResponseOk(response);
});
test('Verify POST API', async () => {
  await api.assignRequestData(data.POST_PAYLOAD);
  const response =await api.authenticateUserWithParameter("POST","/products/add");
  await api.validateResponseCreated(response);
});
test('Verify PUT API', async () => {
  const response =await api.authenticateUserWithParameter("PUT","/products/1");
  await api.validateResponseOk(response);
});
test('Verify DELETE API', async () => {
  const response =await api.authenticateUserWithParameter("DELETE","/products/1");
  await api.validateResponseOk(response);
});
});
