const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categories = await Category.findAll({
      include: [
        {
          model: Product,
          attributes: ["product_name", "price", "stock"],
        },
      ],
    });
    res.json(categories);
  } catch (err) {
    console.log(`[ERROR] - ${err.message}`);
    res.status(500).json({ error: "Failed to get categories" });
  }
});

router.get("/:id", async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const category = await Category.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: Product,
          attributes: ["product_name", "price", "stock"],
        },
      ],
    });
    if (!category) {
      res.status(404).json({
        error: "Category does not exist",
      });
    } else {
      res.json(category);
    }
  } catch (err) {
    console.log(`[ERROR] - ${err.message}`);
    res.status(500).json({ error: "Failed to get category" });
  }
});

router.post("/", async (req, res) => {
  // create a new category
  try {
    if (req.body.category_name) {
      const newCategory = await Category.create({
        category_name: req.body.category_name,
      });
      res.json(newCategory);
    } else {
      res.status(400).json({ error: "category_name is required" });
    }
  } catch (err) {
    console.log(`[ERROR] - ${err.message}`);
    res.status(500).json({ error: "Failed to create category" });
  }
});

router.put("/:id", async (req, res) => {
  // update a category by its `id` value
  try {
    if (req.body.category_name) {
      const updatedCategory = await Category.update(
        {
          category_name: req.body.category_name,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );

      if (updatedCategory === 0) {
        res.status(404).json({ error: "Category does not exist" });
      } else {
        res.json({ success: true });
      }
    } else {
      res.status(400).json({ error: "category_name is required" });
    }
  } catch (err) {
    console.log(`[ERROR] - ${err.message}`);
    res.status(500).json({ error: "Failed to update category" });
  }
});

router.delete("/:id", async (req, res) => {
  // delete a category by its `id` value
  try {
    const affectedCategory = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (affectedCategory === 0) {
      res.status(404).json({ error: "Category does not exist" });
    } else {
      res.json({ success: true });
    }
  } catch (err) {
    console.log(`[ERROR] - ${err.message}`);
    res.status(500).json({ error: "Failed to delete category" });
  }
});

module.exports = router;
