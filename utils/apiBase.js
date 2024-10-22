const { expect } = require('@playwright/test');
const fs = require('fs');
const https = require('https');
const uuid = require('uuid');

exports.apiBase = class apiBase {
  static requestData;
  static headersData;
  static queryParamsData;

  constructor(request) {
    this.request = request;
  }

  async authenticateUserWithParameter(apiType,path) {

    try {
      if (apiType
        === 'GET') {
        return await this.makeAuthorizationGetRequest(path);
      }
      if (apiType
        === 'POST') {
        return await this.makeAuthorizationPostRequest(path);
      }
      if (apiType
        === 'POST_MULTIPART') {
        return await this.makeAuthorizationMultipartPostRequest(path);
      }
      if (apiType
        === 'PUT') {
        return await this.makeAuthorizationPutRequest(path);
      }
      if (apiType
        === 'DELETE') {
        return await this.makeAuthorizationDeleteRequest(path);
      }

      //added this for stage validation
    } catch (error) {
      console.error(
        `Error during user authentication: "${error.message}" `
      );
      throw error;
    }
  }


  async assignRequestData(reqData) {
    apiBase.requestData = reqData;
  }

  async assignQueryParamsData(queryParamsData) {
    apiBase.queryParamsData = queryParamsData;
  }

  async makeAuthorizationGetRequest(path) {
    return await this.request.get(path);
  }

  async makeAuthorizationPostRequest(path) {
    return await this.request.post(path,{headers:{'Content-Type':'application/json'}});
  }

  async makeAuthorizationPutRequest(path) {
    return await this.request.put(path,{headers:{'Content-Type':'application/json'}});
  }
  async makeAuthorizationDeleteRequest(path) {
    return await this.request.delete(path,{headers:{'Content-Type':'application/json'}});
  }

  async validateResponseOk(response) {
    expect(response.status()).toBe(200);
  }

  async validateResponseCreated(response) {
    expect(response.status()).toBe(201);
  }

  //form data API validation by using Axios
  async validateAxiosResponseCreated(response) {
    expect(response.status).toBe(201);
  }

  async validateResponseNoContent(response) {
    expect(response.status()).toBe(204);
  }

  async validateResponseMultiStatus(response) {
    expect(response.status()).toBe(207);
  }

  async validateNotFoundResponse(response) {
    expect(response.status()).toBe(404);
  }

  async validateInternalServerErrorResponse(response) {
    expect(response.status()).toBe(500);
  }
}