import Items from "../models/itemModel.js";

//get items
export const getItemController = async (req, res) => {
  try {
    const items = await Items.find();
    res.status(200).send(items);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

//post items
export const addItemController = async (req, res) => {
  try {
    const newItem = new Items(req.body);
    await newItem.save();
    res.status(201).send("item created successfully");
  } catch (error) {
    console.log(error);
    res.status(400).send("unable to POST", error);
  }
};

//put / edit items
export const editItemController = async (req, res) => {
  try {
    await Items.findOneAndUpdate({ _id: req.body.itemId }, req.body);
    res.status(201).send("item updated successfully");
  } catch (error) {
    console.log(error);
    res.status(400).send("unable to Edit", error);
  }
};

//Delete items
export const deleteItemController = async (req, res) => {
  try {
    const { itemId } = req.body;
    console.log(itemId);
    await Items.findOneAndDelete({ _id: itemId });
    res.status(200).json("item Deleted");
  } catch (error) {
    res.status(400).send(error);
    console.log(error);
  }
};
