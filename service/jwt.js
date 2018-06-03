const jwt = require("jsonwebtoken");
module.exports = {
  verify(ctx, next) {
    try {
      const token = ctx.request.header.authorization
        ? ctx.request.header.authorization.split(" ").pop()
        : "";
      console.log(ctx.request.header);
      const isValid = jwt.verify(token, process.env.SECRET || "");
      console.log(isValid);
      next();
    } catch (e) {
      //   console.log(e);
      ctx.body = {
        message: "Unauthorized Access"
      };
      ctx.status = 401;
    }
  },
  createToken(data) {
    return jwt.sign(data, process.env.SECRET || "");
  }
};