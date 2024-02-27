import passwordValidator from "password-validator";

export const validateFields = ({
  value,
  min,
  max,
  uppercase,
  lowercase,
  digits,
  includes,
  notIncludes,
  not,
  isEmail,
}) => {
  const schema = new passwordValidator();
  //   / Add properties to it
  if (min) {
    schema.is().min(min);
  }
  if (max) {
    schema.is().max(max);
  }
  if (uppercase) {
    schema.has().uppercase(uppercase);
  }
  if (lowercase) {
    schema.has().lowercase(lowercase);
  }
  if (digits && value !== "") {
    schema.has().digits(digits);
  }
  if (notIncludes) {
    schema.is().not().oneOf(notIncludes); // Blacklist these values
  }
  if (isEmail && value !== "") {
    schema.has(
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Invalid email address!"
    );
  }
  if (includes) {
    schema.is().oneOf(includes?.value, includes?.message); // Blacklist these values
  }
  if (not) {
    schema
      .is()
      .not()
      .oneOf(["undefined", "null", null, ""], "This field is required!");
  }
  return schema.validate(value, { details: true });
};
