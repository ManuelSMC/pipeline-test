const request = require('supertest')
const app = require('../app')
const { calculateValue } = require('../lib/logic')

describe('Suite de Pruebas de Calidad de Software', () => {
  describe('Pruebas Unitarias - Lógica de Inventario', () => {
    test('Debe calcular correctamente el valor total (10 * 5 = 50)', () => {
      const result = calculateValue(10, 5)
      expect(result).toBe(50)
    })

    test('Debe retornar 0 si se ingresan valores negativos', () => {
      const result = calculateValue(-10, 5)
      expect(result).toBe(0)
    })

    test('Validaciónn extra: Debe retornar 0 cuando stock es negativo', () => {
      const result = calculateValue(10, -1)
      expect(result).toBe(0)
    })

    test('Validación extra: Debe retornar 0 cuando precio y stock son 0', () => {
      const result = calculateValue(0, 0)
      expect(result).toBe(0)
    })
  })

  describe('Pruebas de Integración - API Endpoints - test2', () => {
    test('GET /health - Debe responder con status 200 y JSON correcto', async () => {
      const response = await request(app).get('/health')
      expect(response.statusCode).toBe(200)
      expect(response.body).toHaveProperty('status', 'OKK')
    })

    test('GET /items - Debe validar la estructura del inventario', async () => {
      const response = await request(app).get('/items')
      expect(response.statusCode).toBe(200)
      expect(Array.isArray(response.body)).toBe(true)
      expect(response.body[0]).toHaveProperty('id')
      expect(response.body[0]).toHaveProperty('stock')
    })

    test('Validación extra: GET /items debe retornar exactamente 2 productos iniciales', async () => {
      const response = await request(app).get('/items')
      expect(response.statusCode).toBe(200)
      expect(response.body).toHaveLength(2)
    })

    test('Validación extra: GET /ruta-inexistente debe retornar 404', async () => {
      const response = await request(app).get('/ruta-inexistente')
      expect(response.statusCode).toBe(404)
    })
  })
})
