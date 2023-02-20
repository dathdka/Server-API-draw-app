const drawTest = (server: any, chai: Chai.ChaiStatic) => {
  let should = chai.should();

  describe("draw request", () => {
    it("successfully get my collection", done => {
      chai
        .request(server)
        .get("/get-my-collection")
        .auth(`${process.env.TEMP_TOKEN}`, { type: "bearer" })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an("array");
          done();
        });
    });

    it("successfully get collection of everyone", done => {
      chai
        .request(server)
        .get("/explore")
        .auth(`${process.env.TEMP_TOKEN}`, { type: "bearer" })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an("object");
          done();
        });
    });
  });
};

export default drawTest;
