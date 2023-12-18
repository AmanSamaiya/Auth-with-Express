const signupMiddleware = async (req, res, next) => {
  const { name, username, bio, email, password } = req.body;

  try {
    if (!name || !username || !bio || !email || !password) {
      res.status(400).json({msg:"All fields are required"})
    } else {
      req.user = { name, username, bio, email, password };
      next();
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = signupMiddleware;
