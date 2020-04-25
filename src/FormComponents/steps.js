//  this file contains the logic for each of the steps that are part of the form

// each step has the following parameters
// @param inputType = the type property chosen for an input html element (e.g. email, text, password only these have implementation)
// @param inputPlaceholder = the placeholder property chosen for the input html element
// @param fieldName = the name property of the input element
// @param userFriendlyName = this name it will be shown in the dropdown for the Edit options
// @param optional = whether this field is required or not; if not mandatory Skip button will be shown together with Send button
// @param validationMessage = if the validation function returns false
// @param validationFunction = a function that will be run against the input to check if the input is valid (return type should be boolean),
// simply return true if no validation needed

function createStep(
  fieldName,
  inputPlaceholder,
  inputType = "text",
  userFriendlyName = fieldName,
  validationMessage = `Please type a valid ${fieldName}`,
  optional = true,
  validationFunction = () => true
) {
  return {
    fieldName,
    inputPlaceholder,
    inputType: inputType
      ? !["text", "email", "password"].includes(inputType)
        ? inputType
        : "text"
      : "text",
    userFriendlyName: userFriendlyName ? userFriendlyName : fieldName,
    validationMessage: validationMessage
      ? validationMessage
      : `Please type a valid ${fieldName}`,
    optional: Boolean(optional) ? !!optional : true,
    validationFunction:
      typeof validationFunction === "function"
        ? validationFunction
        : () => true,
  };
}

export default [
  createStep(
    "username",
    "Please type a username",
    "text",
    "Username",
    "Username must start with at least 2 letters and end with at least 2 digits",
    true,
    function (username) {
      const re = new RegExp(
        // eslint-disable-next-line no-useless-escape
        /^([a-zA-Z]{2,4})+([0-9]{2,4})$/
      );
      return re.test(username);
    }
  ),
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
