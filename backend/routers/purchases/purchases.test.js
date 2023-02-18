const request = require("supertest");
const app = require("../../app");
const MercadolibreService = require("../../services/MercadoLibreService/MercadolibreService");

jest.mock('../../services/MercadoLibreService/MercadolibreService')
beforeEach(() => {
  MercadolibreService.mockClear()
})

describe("User purchases path", () => {
  test("It should respond with success to the GET method if given a proper user id", async () => {
    await request(app).get("/compras/compras_usuario?id_usuario=1")
    expect(MercadolibreService).toHaveBeenCalled()
    expect(MercadolibreService.mock.instances[0].getUserPurchases).toHaveBeenCalledWith("1", undefined, undefined)
  })

  test("It should respond with error to the GET method if not given a user id", async () => {
    const response = await request(app).get("/compras/compras_usuario");
    expect(response.statusCode).toBe(400)
    expect(response.error.text).toBe('Required query params missing')
    expect(MercadolibreService).not.toHaveBeenCalled()
  })

  test("It should pass limit and offset query params to service if given", async () => {
    await request(app).get("/compras/compras_usuario?id_usuario=1&limit=10&offset=5");
    expect(MercadolibreService).toHaveBeenCalled()
    expect(MercadolibreService.mock.instances[0].getUserPurchases).toHaveBeenCalledWith("1", '10', '5')
  })

  test("It should respond with success to GET shipment if given a valid shipmentId", async () => {
    await request(app).get("/compras/envio?id_envio=1");
    expect(MercadolibreService).toHaveBeenCalled()
    expect(MercadolibreService.mock.instances[0].getShipment).toHaveBeenCalledWith("1")
  })

  test("It should respond with error to GET shipment if not given a shipmentId", async () => {
    const response = await request(app).get("/compras/envio");
    expect(response.statusCode).toBe(400)
    expect(response.error.text).toBe('Required query params missing')
    expect(MercadolibreService).not.toHaveBeenCalled()
  })

  test("It should respond with success to GET paymet if given a valid paymentId", async () => {
    await request(app).get("/compras/pago?id_transaccion=1");
    expect(MercadolibreService).toHaveBeenCalled()
    expect(MercadolibreService.mock.instances[0].getPayment).toHaveBeenCalledWith("1")
  })

  test("It should respond with error to GET shipment if not given a shipmentId", async () => {
    const response = await request(app).get("/compras/pago");
    expect(response.statusCode).toBe(400)
    expect(response.error.text).toBe('Required query params missing')
    expect(MercadolibreService).not.toHaveBeenCalled()
  })
})