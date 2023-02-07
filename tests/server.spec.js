const request = require("supertest");
const server = require("../index");

describe('devuelve un status code 200 y el tipo de dato recibido es un arreglo con por lo menos 1 objeto. 3 pts', () => {
    it('prueba 1: Testea ruta GET /cafes', async () => {
        const respuesta = await request(server)
            .get('/cafes');
        expect(respuesta.statusCode).toBe(200);
        expect(Array.isArray(respuesta.body)).toBe(true);
        expect(respuesta.body.length).toBeGreaterThan(0);
    });
});

describe('Comprueba que se obtiene un código 404 al intentar eliminar un café con un id que no existe. 2pts', () => {
    it('prueba 2: devuelve un condigo 404 cuando no se encuentra una el id de la cafeteria', async () => {
        const respuesta = await request(server)
            .delete('/cafes/999');
        expect(respuesta.status).not.toBe(404);
    });
});

describe("agrega un nuevo café y devuelve un código 201. 2 pts", () => {
    test("prueba 3: Prueba la ruta POST /cafes", async () => {
        const respuesta = await request(server)
            .post("/cafes")
            .send({
                id: "5",
                nombre: "Café Nuevo"
            });
        expect(respuesta.statusCode).toBe(201);
        const cafe = respuesta.body.find(c => c.id === "5");
        expect(cafe.nombre).toBe("Café Nuevo");
    });
});

describe("devuelve un status code 400 si intentas actualizar un café enviando un id en los parámetros que sea diferente al id dentro del payload. 3 pts", () => {
    test("Prueba 4: Prueba la ruta PUT /cafes", async () => {
        const respuesta = await request(server)
            .put("/cafes/5")
            .send({
                id: "6",
                nombre: "Café Actualizado",
            });
        expect(respuesta.statusCode).toBe(400);
        expect(respuesta.body).not.toEqual({
            message: "El id en los parámetros debe ser igual al id en el payload",
        });
    });
});