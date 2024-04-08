import mongoose from "mongoose";
import ProductMongoDbDao from "../src/dao/product.mongodb.dao.js";
import Assert from "assert";

const assert = Assert.strict;

describe("Prueba al modulo Product Dao", function () {
  before(async function () {
    await mongoose.connect(
      "mongodb+srv://sergio3996:0TTjb8MIEjVSGmQd@e-commerce.l1db79v.mongodb.net/?retryWrites=true&w=majority"
    );
  });

  it("El dao debe devolver un array con los productos", async function () {
    const result = await ProductMongoDbDao.get();
    assert.strictEqual(Array.isArray(result), true);
  });
});
