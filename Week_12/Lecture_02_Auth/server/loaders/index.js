import authDb from "./authDb";
import middleware from "./middleware";

export default async (app) => {
  /**
   * Initialize my auth database
   */
  const authConnection = await authDb();
  /**
   * Add our middleware to the app
   */
  middleware(app);
};
