import React from "react";
export const FieldValidation = ({ validations, isTransparent }) => {
  return validations?.length ? (
    <ul className={`fieldValidation ${isTransparent && "isTransparent"}`}>
      {validations?.map((item, index) => {
        return (
          <li className="text-danger mt-1" key={index}>
            {item?.message}
          </li>
        );
      })}
    </ul>
  ) : (
    <div />
  );
};

export const validatePassword2 = (password) => {
  //JavaScript declaration
  const strongRegex = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
  );
  //use for JavaScript
  return strongRegex.test(password);
};
