import Cart from "../../models/Cart.js";
import CartDAO from "../../DAO/CartDAO.js";

const cartController = (app, db) => {
  const cartDAO = new CartDAO(db);

  // get
  app.get("/cart", async (req, res) => {
    try {
      const itemsOnCart = await cartDAO.GetAllItensOnCart();
      res
        .status(200)
        .json({ msg: "Here are all items on cart", items: itemsOnCart });
    } catch (error) {
      res.status(400).json({ msg: "Unable to complete the action" });
    }
  });

  // get id
  app.get("/cart/:id", async (req, res) => {
    const id = req.params.id;
    try {
      const itemOnCart = await cartDAO.GetAnItemOnCart(id);
      res.status(200).json({ msg: "Here is the item", item: itemOnCart });
    } catch (error) {
      res.status(400).json({ msg: "Unable to complete the action" });
    }
  });

  // post
  app.post("/cart", async (req, res) => {
    try {
      const newItem = new Cart(
        req.body.user_id,
        req.body.product_id,
        req.body.status
      );
      if (newItem.status === "purchased" || newItem.status === "saved") {
        const createNewItem = await cartDAO.InsertNewItemOnCart(newItem);
        res.status(200).json({
          msg: "New item entered successfully",
          newItem: createNewItem,
        });
      } else {
        res.status(400).json({ msg: "Unable to complete the action" });
      }
    } catch (error) {
      res.status(400).json({ msg: "Unable to complete the action" });
    }
  });

  // put
  app.put("/cart/:id", async (req, res) => {
    const id = req.params.id;
    try {
      const getItemOnCart = await cartDAO.GetAnItemOnCart(id);
      const updateItem = new Cart(
        req.body.user_id,
        req.body.product_id,
        req.body.status
      );

      if (
        getItemOnCart &&
        (updateItem.status === "purchased" || updateItem.status === "saved")
      ) {
        const itemOnCart = [
          {
            user_id: updateItem.user_id || getItemOnCart[0].user_id,
            product_id: updateItem.product_id || getItemOnCart[0].product_id,
            status: updateItem.status || getItemOnCart[0].status,
            id: id,
          },
        ];

        const changeItem = await cartDAO.ModifyItemOnCart(itemOnCart);
        res.status(200).json({
          msg: "Item on has been modified",
          updateCart: changeItem,
        });
      } else {
        res.status(400).json({ msg: "Unable to complete the action" });
      }
    } catch (error) {
      res.status(400).json({ msg: "Unable to complete the action" });
    }
  });

  // delete
  app.delete("/cart/:id", async (req, res) => {
    const id = req.params.id;
    try {
      const deleteItemOnCart = await cartDAO.DeleteItemOnCart(id);
      res.status(200).json({ msg: "Item deleted successfully" });
    } catch (error) {
      res.status(400).json({ msg: "Unable to complete the action" });
    }
  });
};

export default cartController;