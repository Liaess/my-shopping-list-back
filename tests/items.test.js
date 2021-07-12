import { beforeEach, expect, it } from "@jest/globals";
import { connect } from "superagent";
import supertest from "supertest";
import app from "../src/app";
import connection from "../src/database";


afterAll(()=>{
    connection.end();
})

describe("GET /list", ()=>{
    it("returns 200 for sucess", async ()=>{
        const result = await supertest(app).get("/list");
        expect(result.status).toEqual(200);
    });
});

describe("POST /list", ()=>{
    beforeEach( async ()=> {
        await connection.query(`DELETE from infos`);
    });
    it("returns 201 for sucess", async ()=>{
        const body = {text: "Pão"}
        const result = await supertest(app).post("/list").send(body);
        expect(result.status).toEqual(201);
    });
    it("returns 400 on sending", async ()=>{
        const body = {text: 4}
        const result = await supertest(app).post("/list").send(body);
        expect(result.status).toEqual(400);
    });
    it("returns 400 on empty string", async ()=>{
        const body = {text: ""}
        const result = await supertest(app).post("/list").send(body);
        expect(result.status).toEqual(400);
    });
});