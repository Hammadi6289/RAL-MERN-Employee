import Users from "../models/userModel.js";

//login
export const loginController = async (req, res) => {
  try {
    const { userId, password } = req.body;
    const user = await Users.findOne({ userId, password, verified: false });
    if (user) {
      res.status(200).send("Login success");
    } else {
      res.json({
        message: "Login Fail",
        user,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

//signup
export const signupController = async (req, res) => {
  try {
    const newUser = new Users(...req.body, verified);
    await newUser.save();
    res.status(201).send("Registration Successful");
  } catch (error) {
    console.log(error);
    res.status(400).send("unable to POST", error);
  }
};
