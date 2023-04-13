import "dotenv/config";

export default {
  /**
   * The port on which the server will run
   */
  port: process.env.PORT || 3001,
  db: {
    auth_db_url: process.env.AUTH_DB_URL || "mongodb://localhost/sample-auth",
  },
  patterns: {
    username: /[a-zA-Z0-9_]/,
    email:
      /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
  },
  tokens: {
    access_secret: process.env.ACCESS_TOKEN_SECRET || "plsdonthackme",
    refresh_secret: process.env.REFRESH_TOKEN_SECRET || "srslyiaskednicely",
  },
  cookies: {
    secret: process.env.COOKIE_SECRET || "whostolethecookiefromthecookiejar",
    options: {
      signed: true,
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production" ? true : false,
      maxAge: 60 * 24 * 60 * 60 * 1000,
    },
  },
};
