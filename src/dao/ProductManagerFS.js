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

  async addProduct(product) {
    try {
      await this.getProducts();

      const duplicate = this.products.find(
        (item) => item.code === product.code
      );
      if (
        !product.title ||
        !product.description ||
        !product.price ||
        !product.thumbnail ||
        !product.code ||
        !product.stock ||
        !product.category
      ) {
        console.error("Debe rellenar todos los campos");
      } else {
        if (duplicate) {
          throw new Error("Ya existe un producto con ese código");
        } else {
          const uniqueId = this.generateProductId();
          const newProduct = {
            id: uniqueId,
            ...product,
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
