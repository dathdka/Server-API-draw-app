interface registerBody {
    email : string,
    username : string,
    password : string
}

const registerTest = (server: any, chai: Chai.ChaiStatic) => {
  let should = chai.should();
  describe("register request", () => {
    it("success register and return token, id, username", (done) => {
        const successRegister : registerBody = {
            email : 'dat5@gmail.com',
            username: 'dathdka',
            password : '123456'
        } 
      chai.request(server)
      .post("/register")
      .set('content-type', 'application/json')
      .send(successRegister)
      .end((err,res) =>{
        res.should.have.status(201)
        res.body.should.be.a('object')
        done()
      })
    });
    it('duplicate email should return error',(done) =>{
        const duplicateEmail : registerBody = {
            email : 'dat@gmail.com',
            username : 'dathdka',
            password : '123456'
        }
        chai.request(server)
        .post('/register')
        .set('content-type','application/json')
        .send(duplicateEmail)
        .end((err, res) =>{
            res.should.have.status(400)
            done(err)
        })
    })
  });
};
export default registerTest;
