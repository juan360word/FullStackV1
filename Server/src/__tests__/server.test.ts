

import server from "../Server";
import  Request  from "supertest";
import Database from "../Backend/Config/Mysql";

beforeAll(async () =>{
    await Database.authenticate()
 })
 
 afterAll(async () =>{
    await Database.close()
 })


describe('GET /api', () => {
    test('send a json',async() => {
        const res = await Request(server).get('/api')
        expect(res.status).toBe(200)
        expect(res.header['content-type']).toMatch(/json/)

        // Evitar los falsos positivos

        expect(res.body.mensaje).not.toBe(404)
        expect(res.body.mensaje).not.toBe('Esta mal...')

    })
})
