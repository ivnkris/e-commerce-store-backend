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

router.post("/", (req, res) => {
  // create a new category
});

router.put("/:id", (req, res) => {
  // update a category by its `id` value
});

router.delete("/:id", (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
