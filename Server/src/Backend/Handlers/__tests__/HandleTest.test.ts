
import  Request  from "supertest"
import server from "../../../Server"
import Database from "../../Config/Mysql"
import { ConexionDB } from "../../Config/ConexionBD"


beforeAll(async () =>{
    await Database.authenticate()
 })
 
 afterAll(async () =>{
    await Database.close()
 })

describe('POST /Api', () => {

    test('Validacion de errores', async () => {
        const response = await Request(server).post('/api').send({})
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(4)

        expect(response.status).not.toBe(404)
        expect(response.body.errors).not.toHaveLength(2)
    })
    
    test('validacion del precio', async () => {
        const response = await Request(server).post('/api').send({
            name:"mouse rapido",
            price: 0
        })
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(1)

        expect(response.status).not.toBe(404)
        expect(response.body.errors).not.toHaveLength(2)
    })
   
    test('validacion del precio', async () => {
        const response = await Request(server).post('/api').send({
            name:"mouse rapido",
            price: "hola"
        })
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(2)

        expect(response.status).not.toBe(404)
        expect(response.body.errors).not.toHaveLength(4)
    })

    test('nuevo producto creado', async () => {
        const response = await Request(server).post('/api').send({name:'mouse',price:2400})

        expect(response.status).toBe(201)
        expect(response.body).toHaveProperty('data')

        expect(response.status).not.toBe(404)
        expect(response.status).not.toBe(200)
        expect(response.body).not.toBe('errors')
    })
})


describe('Get',() => {

    test('Revisar primero si', async  () => {
        const response = await Request(server).get('/api')
        
        expect(response.status).not.toBe(404)
    })

    test('Respuesta de Get a Json', async () =>{
        const response = await Request(server).get('/api')

        expect(response.status).toBe(200)
    
        expect(response.header['content-type']).toMatch(/json/)
    
        expect(response.body).toHaveProperty('data')
    
        expect(response.body).not.toHaveProperty('errors')
    
        
    })
})


describe("Get a api/productos/:id", () => {
    
    test('Retorna a 404 y responde su no existe el id', async () => {
        const productosid = 3400
        const responde = await Request(server).get(`/api/${productosid}`)
        expect(responde.status).toBe(404)
        expect(responde.body).toHaveProperty('error')
        expect(responde.body.error).toBe('Producto no encontrado')

    })
    test('Retorna cuando no exista esta url', async () => {
        
        const responde = await Request(server).get('/api/no_valido')
        expect(responde.status).toBe(400)
        expect(responde.body).toHaveProperty('errors')
        expect(responde.body.errors).toHaveLength(1)
        
    })
    
    test('Get a Json a un solo producto ', async () => {
        
        const responde = await Request(server).get('/api/1')
        expect(responde.status).toBe(200)
        expect(responde.body).toHaveProperty('data')
      
        
    })
        
})


describe('PUT',() => {
    test('Validacion para que el precio solo sea positivo', async() => {
        const responde = await Request(server).put('/api/1').send({})

       
        expect(responde.status).toBe(400)

        expect(responde.body).toHaveProperty('errors')

        expect(responde.body.errors).toBeTruthy()

        expect(responde.body.errors.length).toBeGreaterThan(0)


    })
})


describe('PATCH', () => {
    test('no existe',async() => {
        const produID = 3400
        const response = await Request(server).patch(`/api/${produID}`)
        expect(response.status).toBe(404)
        expect(response.body.error).toBe('Producto no encontrado....')

        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty('data')
    })

    test('v2',async () => {
        const response = await Request(server).patch(`/api/1`)
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('data')
        expect(response.body.data.valido).toBe(false)

        expect(response.status).not.toBe(400)
        expect(response.status).not.toBe(404)
    })
})


describe("Delete", () => {

    test('Eliminacion ', async () => {

        const responde = await Request(server)
            .delete('/api/not_valido')

        expect(responde.status).toBe(400)

        expect(responde.body).toHaveProperty('errors')

        expect(responde.body.errors).toHaveLength(1)

        expect(responde.body.errors[0].msg)
            .toBe('ID no valido...')

    })

   test('404 responda ', async () => {
    const produID = 3400
    const response = await Request(server).delete(`/api/${produID}`)

    expect(response.status).toBe(404)
    expect(response.body.error).toBe('Producto no encontrado....')

   })
    test('eliminacion del producto', async () => {
        const response = await Request(server).delete('/api/1')
        
        expect(response.status).toBe(200)
        expect(response.body.data).toBe('Producto eliminado')

        expect(response.status).not.toBe(404)
        expect(response.status).not.toBe(400)
    })

})


describe('base de datos',() => {
    test('conexion a la base', async () => {
        jest.spyOn(Database,'authenticate').mockRejectedValueOnce(new Error('Hubo un error al conectarce a la base de datos'))
        const consolespy = jest.spyOn(console,'log')

        await ConexionDB()

        expect(consolespy).toHaveBeenCalledWith(expect.stringContaining('Hubo un error al conectarce a la base de datos'))
    })
})



