const router = require("express").Router();
const { regexp } = require("sequelize/types/lib/operators");
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tags = await Tag.findAll({
      include: [
        {
          model: Product,
          attributes: ["product_name", "price", "stock"],
        },
      ],
    });
    res.json(tags);
  } catch (err) {
    console.log(`[ERROR] - ${err.message}`);
    res.status(500).json({ error: "Failed to get tags" });
  }
});

router.get("/:id", async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tag = await Tag.findOne({
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
    if (!tag) {
      res.status(404).json({
        error: "Tag does not exist",
      });
    } else {
      res.json(tag);
    }
  } catch (err) {
    console.log(`[ERROR] - ${err.message}`);
    res.status(500).json({ error: "Failed to get tag" });
  }
});

router.post("/", async (req, res) => {
  // create a new tag
  try {
    if (req.body.tag_name) {
      const newTag = await Tag.create({
        tag_name: req.body.tag_name,
      });
      res.json(newTag);
    } else {
      res.status(400).json({ error: "tag_name is required" });
    }
  } catch (err) {
    console.log(`[ERROR] - ${err.message}`);
    res.status(500).json({ error: "Failed to create tag" });
  }
});

router.put("/:id", async (req, res) => {
  // update a tag's name by its `id` value
  try {
    if (req.body.tag_name) {
      const updatedTag = await Tag.update(
        {
          tag_name: req.body.tag_name,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );

      if (updatedTag === 0) {
        res.status(404).json({ error: "Tag does not exist" });
      } else {
        res.json({ success: true });
      }
    } else {
      res.status(400).json({ error: "tag_name is required" });
    }
  } catch (err) {
    console.log(`[ERROR] - ${err.message}`);
    res.status(500).json({ error: "Failed to update tag" });
  }
});

router.delete("/:id", (req, res) => {
  // delete on tag by its `id` value
});

module.exports = router;
