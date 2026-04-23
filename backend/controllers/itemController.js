const Item = require("../models/Item");

// Add Item
exports.addItem = async (req, res) => {
  try {
    const item = new Item({ ...req.body, user: req.user.id });
    await item.save();
    res.json(item);
  } catch {
    res.status(500).json({ msg: "Error adding item" });
  }
};

// Get All Items
exports.getItems = async (req, res) => {
  const items = await Item.find().populate("user", "name email");
  res.json(items);
};

// Get Item by ID
exports.getItemById = async (req, res) => {
  const item = await Item.findById(req.params.id);
  res.json(item);
};

// Update Item
exports.updateItem = async (req, res) => {
  const item = await Item.findById(req.params.id);

  if (!item) return res.status(404).json({ msg: "Item not found" });

  if (item.user.toString() !== req.user.id)
    return res.status(401).json({ msg: "Unauthorized" });

  const updated = await Item.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.json(updated);
};

// Delete Item
exports.deleteItem = async (req, res) => {
  const item = await Item.findById(req.params.id);

  if (item.user.toString() !== req.user.id)
    return res.status(401).json({ msg: "Unauthorized" });

  await item.deleteOne();
  res.json({ msg: "Item deleted" });
};

// Search
exports.searchItems = async (req, res) => {
  const { name } = req.query;
  const items = await Item.find({
    itemName: { $regex: name, $options: "i" },
  });
  res.json(items);
};