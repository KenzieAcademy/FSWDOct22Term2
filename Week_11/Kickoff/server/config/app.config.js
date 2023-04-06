export const port = process.env.PORT || 3001;
export const db_url =
  process.env.DB_URL ||
  "mongodb+srv://someperson:somepassword@cluster0.vljookl.mongodb.net/w11ko?retryWrites=true&w=majority";
export const jwt_key = process.env.JWT_SECRET || "secretpassword";
