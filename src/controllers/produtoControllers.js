import Product from "../../models/Product.js";
import ProductDAO from "../../dao/ProductDAO.js";

const productController = (app, db) => {
  const productDAO = new ProductDAO(db);

  // get
  app.get("/product", async (req, res) => {
    try {
      const products = await productDAO.GetAllProducts();
      res
        .status(200)
        .json({ msg: "Here are all products", products: products });
    } catch (error) {
      res.status(400).json({ msg: "Unable to complete the action" });
    }
  });

  // get id
  app.get("/product/:id", async (req, res) => {
    const id = req.params.id;
    try {
      const product = await productDAO.GetAnProduct(id);
      res.status(200).json({ msg: "Here is the product", product: product });
    } catch (error) {
      res.status(400).json({ msg: "Unable to complete the action" });
    }
  });

  // post
  app.post("/product", async (req, res) => {
    try {
      const newProduct = new Product(
        req.body.title,
        req.body.description,
        req.body.value
      );

      const createProduct = await productDAO.InsertNewProduct(newProduct);
      res.status(200).json({
        msg: "New product entered successfully",
        newProduct: createProduct,
      });
    } catch (error) {
      res.status(400).json({ msg: "Unable to complete the action" });
    }
  });

  // put
  app.put("/product/:id", async (req, res) => {
    const id = req.params.id;
    try {
      const getProduct = await productDAO.GetAnProduct(id);
      if (getProduct) {
        const updateProduct = new Product(
          req.body.title,
          req.body.description,
          req.body.value
        );

        const product = [
          {
            title: updateProduct.title || getProduct[0].title,
            description: updateProduct.description || getProduct[0].description,
            value: updateProduct.value || getProduct[0].value,
            id: id,
          },
        ];

        const changeProduct = await productDAO.ModifyProduct(product[0]);

        res.status(200).json({
          msg: "Product has been modified",
          updateProduct: changeProduct,
        });
      } else {
        res.status(404).json({ msg: "Product not found" });
      }
    } catch (error) {
      res.status(400).json({ msg: "Unable to complete the action" });
    }
  });

  //delete
  app.delete("/product/:id", async (req, res) => {
    const id = req.params.id;
    try {
      const getProduct = await productDAO.GetAnProduct(id);
      const deleteProduct = await productDAO.DeleteProduct(id);
      res
        .status(200)
        .json({ msg: `${getProduct[0].title} deleted successfully` });
    } catch (error) {
      res.status(400).json({ msg: "Unable to complete the action" });
    }
  });
};

export default productController;