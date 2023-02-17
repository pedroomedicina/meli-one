const request = require("supertest");
const app = require("../../app");
const MercadolibreService = require("../../services/MercadoLibreService/MercadolibreService");
jest.mock('../../services/MercadoLibreService/MercadolibreService')

beforeEach(() => {
  MercadolibreService.mockClear();
});

describe("Root path", () => {
  test("It should respond to the GET method", async () => {
    await request(app).get("/");
    expect(MercadolibreService).toHaveBeenCalled()
    expect(MercadolibreService.mock.instances[0].getUser).toHaveBeenCalled()
  });
});

describe("User level path", () => {
  test("It should respond succesfully to the GET method when passed a level id", async () => {
    const response = await request(app).get("/nivel?id_nivel=ORO");
    expect(response.statusCode).toBe(200);
    expect(MercadolibreService).toHaveBeenCalled()
    expect(MercadolibreService.mock.instances[0].getLevel).toHaveBeenCalledWith("ORO")
  });

  test("It should respond with error to the GET method when not passed a level id", async () => {
    const response = await request(app).get("/nivel");
    expect(response.statusCode).toBe(400);
    expect(response.error.text).toEqual('Required query params missing');
    expect(MercadolibreService).not.toHaveBeenCalled();
  });
});

describe("User restrictions path", () => {
  test("It should respond successfully to the GET method when passed a valid user id", async () => {
    await request(app).get("/restricciones?id_usuario=1");
    expect(MercadolibreService).toHaveBeenCalled()
    expect(MercadolibreService.mock.instances[0].getUserRestrictions).toHaveBeenCalledWith("1")
  });

  test("It should respond with error to the GET method when not passed a user id", async () => {
    const response = await request(app).get("/restricciones");
    expect(response.statusCode).toBe(400);
    expect(response.error.text).toEqual('Required query params missing');
  });
})