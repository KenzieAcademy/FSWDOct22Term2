export const newUserParams = (req) => {
  const { firstName, lastName, email, password, confirmPassword } = req.body;

  return [firstName, lastName, email, password, confirmPassword];
};

export const loginUserParams = (req) => {
  const { email, password } = req.body;
  return [email, password];
};
