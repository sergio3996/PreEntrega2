import ProductDao from "../dao/product.mongodb.dao.js";
import { generatorProductError } from "../utils/CauseMessageError.js";
import CustomError from "../utils/CustomError.js";
import EnumsError from "../utils/EnumsError.js";
import { generateProduct } from "../utils/utils.js";
import emailService from "./email.service.js";

export default class ProductService {
  static async get() {
    const products = await ProductDao.get();
    if (!products) {
      throw new Error("No existe ningun producto");
    }
    return products;
  }

  static async getById(pid) {
    const product = await ProductDao.getById(pid);
    if (!product) {
      throw new Error("Producto no encontrado");
    }
    return product;
  }

  static create(data) {
    const { title, description, price, code, stock, category } = data;
    if (!title || !description || !price || !code || !stock || !category) {
      CustomError.create({
        name: "Invalid data product",
        cause: generatorProductError({
          title,
          description,
          price,
          code,
          stock,
          category,
        }),
        message: "Ocurrio un error al intentar crear el producto 😓",
        code: EnumsError.BAD_REQUEST_ERROR,
      });
    }
    return ProductDao.create(data);
  }

  static async updateById(pid, data) {
    const product = await ProductDao.updateById(pid, data);
    if (!product) {
      throw new Error("No se ha podido actualizar el producto");
    }
  }

  static async deleteById(pid, user) {
    const product = await ProductDao.getById(pid);
    if (!product) {
      throw new Error("Producto no encontrado");
    }
    if (user.role === "premium" && user.email != product.owner) {
      throw new Error("No tienes permiso para eliminar este producto");
    }
    if (user.role === "premium" && user.email == product.owner) {
      await emailService.sendMail(
        user.email,
        "Producto Eliminado",
        `<p>Se ha eliminado el producto con el nombre ${product.title}</p>`
      );
    }
    return await ProductDao.delete(pid);
  }

  static async getProductsPaginated(limit, page, sort, category, status, url) {
    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);
    const filter = {};
    const options = { limit, page };

    if (
      isNaN(pageNumber) ||
      isNaN(limitNumber) ||
      pageNumber < 1 ||
      limitNumber < 1
    ) {
      throw new Error("Parametros de busqueda invalidos.");
    }

    if (sort) {
      options.sort = { price: sort };
    }
    if (category) {
      filter.category = category;
    }
    if (status) {
      if (status === "false" || status === "true") {
        let statusQuery;
        if (status === "true") {
          statusQuery = true;
        } else {
          statusQuery = false;
        }
        filter.status = statusQuery;
      } else {
        throw new Error("Parametros de busqueda invalidos.");
      }
    }
    const result = await ProductDao.paginate(filter, options);

    if (pageNumber < 1 || pageNumber > result.totalPages) {
      throw new Error("Esta pagina no existe!");
    }

    let categoryQuery = "";
    let sortQuery = "";
    let statusQuery = "";
    if (category) {
      categoryQuery = `&category=${category}`;
    }
    if (sort) {
      sortQuery = `&sort=${sort}`;
    }
    if (status) {
      statusQuery = `&status=${status}`;
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
        ? `${url}?limit=${result.limit}&page=${result.prevPage}${categoryQuery}${sortQuery}${statusQuery}`
        : null,
      nextLink: result.hasNextPage
        ? `${url}?limit=${result.limit}&page=${result.nextPage}${categoryQuery}${sortQuery}${statusQuery}`
        : null,
    };
  }

  static generateMockingProducts() {
    let products = [];
    for (let index = 0; index < 100; index++) {
      products.push(generateProduct());
    }
    return products;
  }
}
