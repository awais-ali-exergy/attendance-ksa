export default (err) => {
  const customError = err?.response?.data?.errors;
  const serverError = err?.response?.data?.errors?.message;
  if (customError) return customError;
  else if (serverError) return serverError;
  else return "Oops! Something went wrong.";
};
