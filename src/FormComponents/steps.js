//  this file contains the logic for each of the steps that are part of the form

// each step has the following parameters
// inputType = the type property chosen for an input html element (e.g. email, text, password only these have implementation)
// inputPlaceholder = the placeholder property chosen for the input html element
// fieldName = the name property of the input element
// optional = whether this field is required or not; if not mandatory Skip button will be shown together with Send button
// validationFunction = a function that will be run against the input to check if the input is valid, simply return true if no validation needed

export default [
  {
    inputType: "text",
    inputPlaceholder: "Please type a username",
    fieldName: "username",
    userFriendlyName: "Username",
    validationMessage:
      "Username must start with at least 2 letters and end with at least 2 digits",
    optional: true,
    validationFunction: function (username) {
      const re = new RegExp(
        // eslint-disable-next-line no-useless-escape
        /^([a-zA-Z]{2,4})+([0-9]{2,4})$/
      );
      return re.test(username);
    },
  },
  {
    inputType: "text",
    inputPlaceholder: "Please say whether you are male(m) or female(f)",
    fieldName: "gender",
    userFriendlyName: "Gender",
    validationMessage: "You must write either Male(M) or Female(F)",
    optional: true,
    validationFunction: function (gender) {
      return ["male", "m", "female", "f"].includes(gender.toLowerCase());
    },
  },
  {
    inputType: "email",
    inputPlaceholder: "Please type your email address",
    validationMessage: "A valid email address is required",
    userFriendlyName: "Email Address",
    fieldName: "email",
    optional: false,
    validationFunction: function (email) {
      const re = new RegExp(
        // eslint-disable-next-line no-useless-escape
        /^([\w\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})$/
      );
      return re.test(email);
    },
  },
  {
    inputType: "password",
    userFriendlyName: "Password",
    inputPlaceholder: "Please type a password",
    validationMessage: `Your password must contain at least 8 characters, including at least one uppercase letter, one lowercase letter,
      and one digit`,
    optional: false,
    fieldName: "password",
    validationFunction: function (password) {
      const re = new RegExp(/^.*(?=.{8,})(?=.*[A-Z])(?=.*[a-z])(?=.*\d).*$/);
      return re.test(password);
    },
  },
];
