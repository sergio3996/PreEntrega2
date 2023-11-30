import productModel from "./models/product.model.js";

export default class ProductsManager {
  static get() {
    return productModel.find();
  }

  static async getById(pid) {
    try {
      const product = await productModel.findById(pid);
      return product;
    } catch (error) {
      console.error(error.message);
    }
  }

  static async create(data) {
    try {
      const product = await productModel.create(data);
      console.log(`Producto agregado correctamente ${product._id}`);
      return product;
    } catch (error) {
      console.error(error.message);
      return error.message;
    }
  }

  static async updateById(pid, data) {
    try {
      await productModel.updateOne({ _id: pid }, { $set: data });
      console.log("Producto actualizado correctamente");
    } catch (error) {
      console.error(error.message);
    }
  }

  static async deleteById(pid) {
    try {
      await productModel.deleteOne({ _id: pid });
      console.log("Producto eliminado correctamente");
    } catch (error) {
      console.error(error.message);
    }
  }

  static async getProductsPaginated(criteria, options, sort, category, url) {
    try {
      const result = await productModel.paginate(criteria, options);
      let categoryQuery = "";
      let sortQuery = "";
      if (category) {
        categoryQuery = `&category=${category}`;
      }
      if (sort) {
        sortQuery = `&sort=${sort}`;
      }
      return {
        status: "success",
        payload: result.docs.map((doc) => doc.toJSON()),
        totalPages: result.totalPages,
        prevPage: result.prevPage,
        nextPage: result.nextPage,
        page: result.page,
        hasPrevPage: result.hasPrevPage,
        hasNextPage: result.hasNextPage,
        prevLink: result.hasPrevPage
          ? `${url}?limit=${result.limit}&page=${result.prevPage}${categoryQuery}${sortQuery}`
          : null,
        nextLink: result.hasNextPage
          ? `${url}?limit=${result.limit}&page=${result.nextPage}${categoryQuery}${sortQuery}`
          : null,
      };
    } catch (error) {
      console.error(error);
    }
  }
}
