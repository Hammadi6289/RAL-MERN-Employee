import Bills from "../models/billsModel.js";

//post bills
export const addBillsController = async (req, res) => {
  try {
    const newBill = new Bills(req.body);
    await newBill.save();
    res.send("Bill created successfully");
  } catch (error) {
    console.log(error);
    res.status(400).send("unable to POST", error);
  }
};

//get bills
export const getBillsController = async (req, res) => {
  try {
    const bills = await Bills.find();
    res.send(bills);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};
