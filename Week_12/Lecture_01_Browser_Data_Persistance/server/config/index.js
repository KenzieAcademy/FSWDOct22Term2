export default {
  mongoDB: {
    port: process.env.PORT || 3001,
    url:
      process.env.DB_URL ||
      "mongodb+srv://someperson:somepassword@cluster0.vljookl.mongodb.net/persistDB?retryWrites=true&w=majority",
  },
};
