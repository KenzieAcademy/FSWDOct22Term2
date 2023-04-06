export const port = process.env.PORT || 3001;
export const db_url =
  process.env.DB_URL ||
  "mongodb+srv://someperson:somepassword@cluster0.vljookl.mongodb.net/reducereuserecycle?retryWrites=true&w=majority";
export const jwt_secret = process.env.JWT_SECRET || "totallysecretpw";
