const request = require("supertest");
const app = require("../app");

describe("Root path", () => {
  test("It should respond to the GET method", async () => {
    const response = await request(app).get("/");
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      "apellido": "User",
      "id_usuario": 1,
      "imagen": "https://http2.mlstatic.com/frontend-assets/ui-navigation/5.19.1/mercadolibre/180x180.png",
      "nivel": "ORO",
      "nombre": "Mercadolibre"
    });
  });
});

describe("User level path", () => {
  test("It should respond succesfully to the GET method when passed a level id", async () => {
    const response = await request(app).get("/nivel?id_nivel=ORO");
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      "descripción": "Nivel Oro - Mercadopuntos",
      "id_nivel": "ORO",
    });
  });

  test("It should respond with error to the GET method when passed a wrong level id", async () => {
    const response = await request(app).get("/nivel?id_nivel=some_wrong_level_id");
    expect(response.statusCode).toBe(404);
    expect(response.error.text).toEqual('Could not find level of id \"some_wrong_level_id\"');
  });

  test("It should respond with error to the GET method when not passed a level id", async () => {
    const response = await request(app).get("/nivel");
    expect(response.statusCode).toBe(400);
    expect(response.error.text).toEqual('Required query params missing');
  });
});

describe("User restrictions path", () => {
  test("It should respond successfully to the GET method when passed a valid user id", async () => {
    const response = await request(app).get("/restricciones?id_usuario=1");
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual([
      {"mensaje": "Tu cuenta no ha sido verificada aún. Revisa tu mail", "tipo": "warning"}
    ]);
  });

  test("It should respond with error to the GET method when not passed a user id", async () => {
    const response = await request(app).get("/restricciones");
    expect(response.statusCode).toBe(400);
    expect(response.error.text).toEqual('Required query params missing');
  });

  test("It should respond with error to the GET method when passed a wrong user id", async () => {
    const response = await request(app).get("/restricciones?id_usuario=some_wrong_user_id");
    expect(response.statusCode).toBe(404);
    expect(response.error.text).toEqual('Could not find restrictions for user of id some_wrong_user_id');
  });
})