interface loginBody {
  email: string,
  password: string
}

const loginTest = (server: any, chai: Chai.ChaiStatic) => {
    let should = chai.should()
  describe("login request", () => {
    it("success should get token, id and username", (done) => {
      const loginSuccess : loginBody = {
        email: 'dat@gmail.com',
        password : '123456'
      }
      chai
        .request(server)
        .post("/login")
        .set("content-type", "application/json")
        .send(loginSuccess)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an("object");
          done();
        });
    });
    it("wrong password and it should return error", (done) => {
      const loginWrongPassword : loginBody = {
        email: 'dat@gmail.com',
        password : '1234567'
      }
      chai
        .request(server)
        .post("/login")
        // .auth('asd',{type : 'bearer'})
        .set("content-type", "application/json")
        .send(loginWrongPassword)
        .end((err, res) => {
          res.should.have.status(401);
          done(err);
        });
    });
    it("wrong email and it should return error", (done) => {
      const loginWrongEmail : loginBody = {
        email: 'dat100@gmail.com',
        password : '123456'
      }
      chai
        .request(server)
        .post("/login")
        .set("content-type", "application/json")
        .send(loginWrongEmail)
        .end((err, res) => {
          res.should.have.status(401);
          done(err);
        });
    });
  });
};

export default loginTest;
