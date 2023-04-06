/**
 * @typedef GetUrlOptions
 * @property {boolean} hash - Should the function return the URL with any hash
 * @property {boolean} query - Should the function return the URL with any query params
 */

/**
 * Helper function for determining the current URL
 * @param {GetUrlOptions} options
 */
const getCurrentUrl = (options = { hash: false, search: false }) => {
  const urlData = window.location;
  return (
    urlData.pathname +
    (options.hash ? urlData.hash : "") +
    (options.search ? urlData.search : "")
  );
};

export default getCurrentUrl;
