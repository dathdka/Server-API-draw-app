import loginTest from "./loginTest";
import registerTest from './registerTest'
import chai from "chai";
import chaiHttp from "chai-http";
import server from '../app'
chai.use(chaiHttp);
loginTest(server, chai)
registerTest(server,chai)