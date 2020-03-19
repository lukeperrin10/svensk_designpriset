//process.env.NODE_ENV = 'test'
import * as chai from 'chai'
import {expect} from 'chai'
//import * as mocha from 'mocha'
//const chaiHttp = require('chai-http')
import chaiHttp from 'chai-http'
import {describe, it} from 'mocha'
import server from '../server'
import {Model} from '../src/models/model'
import * as db from '../src/db'

export interface Test_Data {
    id?: number
	secret?: string
}

export class Test<T extends Test_Data> {
    public model: Model<T>
    public name: string
    public endpoint: string
    public post_data: T
    public put_data: T
    public methods: Array<string>
    public query_data: T
    public server: typeof server
    public chai: typeof chai
    public agent: ChaiHttp.Agent
    public table_name: string
    constructor(model: Model<T>, post_data?: T, put_data?: T) {
        this.model = model
        this.post_data = post_data
        this.put_data = put_data || post_data
        chai.use(chaiHttp)
        this.chai = chai
        this.name = model.getName()
        this.endpoint = '/' + this.name.toLowerCase()
        this.methods = ['GET', 'GET_ID', 'POST', 'PUT', 'DELETE']
        this.server = server
    }

    get() {
        const agent = this.getAgent()
        describe(`/GET ${this.name}`, () => {
            it(`It should get all ${this.model.getName()}s`, async () => {
                await db.query('SET FOREIGN_KEY_CHECKS=0;')
                const res = await agent.get(this.endpoint)
                .query(this.query_data)
                expect(res.status).to.equal(200)
                expect(res.body).to.be.an('array')
                expect(res.body.length).to.be.greaterThan(0)
                await db.query('SET FOREIGN_KEY_CHECKS=1;')
            })
        })
    }
    getId() {
        const agent = this.getAgent()
        let id: number = null
        describe(`/GET/:id ${this.name}`, () => {
            it(`It should create a ${this.model.getName()}`, async () => {
                const new_record = await this.create()
                id = new_record.insertId
            })
            it(`It should GET the ${this.model.getName()}`, async () => {
                const res = await agent.get(`${this.endpoint}/${id}`)
                const body = Array.isArray(res.body) ? res.body[0] : res.body
                expect(res.status).to.equal(200)
                expect(body).to.be.an('object')
            })
            it(`It should remove the ${this.name}`, async () => {
                await this.remove(id)
            })
        })
    }
    post() {
        const agent = this.getAgent()
        let id: number = null
        describe(`/POST ${this.name}`, () => {
            it(`It should POST a ${this.name}`, async () => {
                const res = await agent.post(this.endpoint)
                .send(<any>this.post_data)
                if (res.status >= 400) {
                    expect(res.status, res.body.msg).to.equal(200) 
                }
                else expect(res.status, res.body.msg).to.equal(200) 
                expect(res.body).to.be.an('object')
                expect(res.body).have.property('id')
                expect(res.body.id).to.be.a('number')
                id = parseInt(res.body.id)
            })
            it(`It should remove the ${this.name}`, async () => {
                await this.remove(id)
            })
        })
    }
    put() {
        const agent = this.getAgent()
        describe(`/PUT ${this.name}`, () => {
            it(`It should create a ${this.name}`, async () => {
                this.put_data = await this.create()
            })
            it(`It should PUT the ${this.name}`, async () => {
                const res = await agent.put(this.endpoint)
                .send(<any>this.put_data )
                if (res.status >= 400) {
                    expect(res.status, res.body.msg).to.equal(200) 
                }
                else expect(res.status, res.body.msg).to.equal(200) 
                expect(res.body).to.be.an('object')
                expect(res.body).have.property('id')
            })
            it(`It should remove the ${this.name}`, async () => {
                await this.remove(this.put_data.id)
            })
        })
    }
    delete() {
        const agent = this.getAgent()
        let id: number = null
        describe(`/DELETE ${this.name}`, () => {
            it(`It should create a ${this.name}`, async () => {
                id  = (await this.create()).id
            })
            it(`It should DELETE the ${this.name}`, async () => {
                const res = await agent.del(`${this.endpoint}/${id}`)
                if (res.status >= 400) {
                    expect(res.status, res.body.msg).to.equal(200) 
                }
                else expect(res.status, res.body.msg).to.equal(200) 
                expect(res.body).to.be.an('object')
                expect(res.body).have.property('id')
                expect(parseInt(res.body.id)).to.equal(id)
            })
            it(`It should check that the ${this.name} is deleted`, async () => {
                expect(await this.model.getId(id)).to.be.undefined
            })
        })
    }
     runAll() {
        describe(this.name, () => {
            if(this.methods.includes('GET')) this.get()
            if(this.methods.includes('GET_ID')) this.getId()
            if(this.methods.includes('POST')) this.post()
            if(this.methods.includes('PUT')) this.put()
            if(this.methods.includes('DELETE')) this.delete()
        })
    }

    //Helpers
    async create() {
        const new_record = await db.query(`insert into ${this.table_name} set ?`, [this.post_data])
        expect(new_record).to.be.an('object')
        expect(new_record).to.have.property('insertId')
        expect(new_record.insertId).to.be.a('number')
        return new_record
    }
    async remove(id: number) {
        let o
        if ('remove' in this.model) {
            o = await this.model.remove(id)
        }
        else {
            o = await db.query(`delete from ${this.table_name} where id = ?`, [id])
        }
        expect(o).to.be.an('object')
        expect(o.affectedRows).equal(1)
        return o
    }
    getAgent() {
        if (!this.agent) this.agent = (<any>this.chai).default.request.agent(`http://localhost:${process.env.NODE_PORT}`)
        return this.agent
    }
}
