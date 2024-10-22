const { expect } = require('@playwright/test');
const Ajv=require('ajv');

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
    return await this.request.post(path,{headers:{'Content-Type':'application/json'},data:apiBase.requestData});
  }

  async makeAuthorizationPutRequest(path) {
    return await this.request.put(path,{headers:{'Content-Type':'application/json'},data:apiBase.requestData});
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

  async validateApiResponse(schema, responseData) {
    const ajv = new Ajv(); // Options can be passed if needed
    const validate = ajv.compile(schema); // Compile the provided schema
    const valid = validate(responseData); // Validate the response data

    if (!valid) {
        console.log(validate.errors); // Log validation errors if there are any
    }

    expect(valid).toBe(true); // Ensure the response is valid based on schema
}
}