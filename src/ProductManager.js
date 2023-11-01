import * as fs from "fs";
class ProductManager {
  constructor() {
    this.products = [];
    this.path = "./products.json";
  }

  getProducts() {
    if (!fs.existsSync(this.path)) {
      console.log("La lista de productos no existe");
      return this.products;
    } else {
      const data = fs.readFileSync(this.path, "utf8");
      this.products = JSON.parse(data);
      return this.products;
    }
  }

  generateProductId() {
    return Math.random().toString(36).slice(2, 11);
  }

  async addProduct(
    title,
    description,
    price,
    thumbnail,
    code,
    stock,
    status = true,
    category
  ) {
    try {
      await this.getProducts();

      const duplicate = this.products.find((item) => item.code === code);
      if (
        !title ||
        !description ||
        !price ||
        !thumbnail ||
        !code ||
        !stock ||
        !category
      ) {
        console.error("Debe rellenar todos los campos");
      } else {
        if (duplicate) {
          throw new Error("Ya existe un producto con ese código");
        } else {
          const uniqueId = this.generateProductId();
          const newProduct = {
            id: uniqueId,
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
            status,
            category,
          };

          this.products.push(newProduct);
          fs.writeFileSync(
            this.path,
            JSON.stringify(this.products, null, 2),
            "utf8"
          );
          console.log("El archivo se ha escrito correctamente.");
        }
      }
    } catch (err) {
      console.error(err);
    }
  }

  async getProductById(id) {
    try {
      await this.getProducts();

      const productFound = this.products.find((item) => item.id === id);
      if (productFound) {
        return productFound;
      } else {
        throw new Error("El producto no existe");
      }
    } catch (error) {
      console.error(error);
    }
  }

  async updateProduct(id, updatedFields) {
    try {
      await this.getProducts();

      const productIndex = this.products.findIndex((item) => item.id === id);

      if (productIndex !== -1) {
        const updatedProduct = { ...this.products[productIndex] };
        for (const key in updatedFields) {
          if (key !== "id") {
            updatedProduct[key] = updatedFields[key];
          }
        }
        this.products[productIndex] = updatedProduct;
        fs.writeFileSync(
          this.path,
          JSON.stringify(this.products, null, 2),
          "utf8"
        );
        console.log("Producto actualizado correctamente.");
      } else {
        console.log("Producto no encontrado");
      }
    } catch (error) {
      console.error(error);
    }
  }

  async deleteProduct(id) {
    try {
      await this.getProducts();

      const productIndex = this.products.findIndex((item) => item.id === id);

      if (productIndex !== -1) {
        this.products.splice(productIndex, 1);
        fs.writeFileSync(
          this.path,
          JSON.stringify(this.products, null, 2),
          "utf8"
        );
        console.log("Producto eliminado correctamente");
      } else {
        console.log("Producto no encontrado");
      }
    } catch (error) {
      console.error(error);
    }
  }
}

export default ProductManager;

// const productManagerInstance = new ProductManager();
// AGREGAR PRODUCTO

// productManagerInstance.addProduct(
//   "producto prueba1",
//   "Este es un producto prueba1",
//   20010,
//   "Sin imagen",
//   "abc12312312tt",
//   25,
//   true,
//   "Sincategoria"
// );

// productManagerInstance.addProduct(
//   "producto prueba2",
//   "Este es un producto prueba2",
//   2002,
//   "Sin imagen",
//   "abc1234dfdafv",
//   25,
//   true,
//   "Sincategoria"
// );

// productManagerInstance.addProduct(
//   "producto prueba3",
//   "Este es un producto prueba3",
//   2005,
//   "Sin imagen",
//   "abc12345345gz",
//   25,
//   true,
//   "Sincategoria"
// );

// productManagerInstance.addProduct(
//   "producto prueba4",
//   "Este es un producto prueba4",
//   2005,
//   "Sin imagen",
//   "abc12345345gx",
//   25,
//   true,
//   "Sincategoria"
// );

// productManagerInstance.addProduct(
//   "producto prueba5",
//   "Este es un producto prueba5",
//   2005,
//   "Sin imagen",
//   "abc12345345gw",
//   25,
//   true,
//   "Sincategoria"
// );
// productManagerInstance.addProduct(
//   "producto prueba6",
//   "Este es un producto prueba6",
//   2005,
//   "Sin imagen",
//   "abc12345345ge",
//   25,
//   true,
//   "Sincategoria"
// );
// productManagerInstance.addProduct(
//   "producto prueba7",
//   "Este es un producto prueba7",
//   2005,
//   "Sin imagen",
//   "abc12345345gu",
//   25,
//   true,
//   "Sincategoria"
// );
// productManagerInstance.addProduct(
//   "producto prueba8",
//   "Este es un producto prueba8",
//   2005,
//   "Sin imagen",
//   "abc12345345gb",
//   25,
//   true,
//   "Sincategoria"
// );
// productManagerInstance.addProduct(
//   "producto prueba9",
//   "Este es un producto prueba9",
//   2005,
//   "Sin imagen",
//   "abc12345345gd",
//   25,
//   true,
//   "Sincategoria"
// );
// productManagerInstance.addProduct(
//   "producto prueba10",
//   "Este es un producto prueba10",
//   2005,
//   "Sin imagen",
//   "abc12345345ga",
//   25,
//   true,
//   "Sincategoria"
// );

// console.log(productManagerInstance.getProducts());

// -----------------------------------------------------

// OBTENER TODOS LOS PRODUCTOS

// console.log(productManagerInstance.getProducts());

// -----------------------------------------------------

// OBTENER PRODUCTO POR ID

// productManagerInstance.getProductById("id");

// -----------------------------------------------------

// ACTUALIZAR PRODUCTO

// const product = {
//   id: "1234567",
//   title: "Producto actualizado",
//   description: "Producto actualizado",
//   price: 5000,
//   thumbnail: "asdasd2123",
//   code: "abc123555",
//   stock: 2523,
// };

// productManagerInstance.updateProduct("id", product);

// -----------------------------------------------------

// ELIMINAR PRODUCTO POR ID

// productManagerInstance.deleteProduct("id");
