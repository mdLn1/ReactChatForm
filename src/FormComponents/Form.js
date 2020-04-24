import React, { Component, Fragment } from "react";
import Message from "./Message";
import PropTypes from "prop-types";
import defaultMessages from "./predefinedMessages";

// function that returns an object with properties for a Message component
function createMessage(text, spanType = "", side = "left") {
  return {
    side,
    spanType,
    text,
  };
}

class ChatForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
      currentStep: 0,
      lastStepDone: 0,
      maxSteps: this.props.steps.length,
      fields: this.props.fields,
      editing: false,
    };
  }

  componentDidMount() {
    this.setState({
      messages: [
        ...this.props.firstMessages,
        createMessage(
          this.props.steps[0].inputPlaceholder,
          "left-no-top-radius"
        ),
      ],
    });
  }

  handleInputChange = (e) => {
    this.setState({ fields: { [e.target.name]: e.target.value } });
  };

  handleFormSubmission = (e) => {
    e.preventDefault();
    const { steps } = this.props;
    let { maxSteps, lastStepDone, editing, currentStep, messages } = this.state;
    if (!editing && currentStep > lastStepDone) {
      lastStepDone = currentStep;
    }
    // pressing skip button
    if (e.target.name === "skip") {
      if (editing) {
        messages.push(
          createMessage("I am leaving this one empty", "", "right")
        );
        messages.push(
          createMessage("OK!", "correct-input left-no-bottom-radius")
        );
        messages.push(
          createMessage("Going back to where you left off", "left-no-radius")
        );
        messages.push({
          text: steps[lastStepDone].inputPlaceholder,
          spanType: "left-no-top-radius",
          side: "left",
        });
        this.setState((prevState) => ({
          fields: { ...prevState.fields, [steps[currentStep].fieldName]: "" },
          currentStep: lastStepDone,
          lastStepDone: lastStepDone,
          messages: messages,
          editing: false,
        }));
      } else if (currentStep < maxSteps - 1) {
        currentStep += 1;
        messages.push(createMessage("I am skipping this one", "", "right"));
        messages.push(
          createMessage("OK!", "correct-input left-no-bottom-radius")
        );
        messages.push(
          createMessage(
            steps[currentStep].inputPlaceholder,
            "left-no-top-radius"
          )
        );
        this.setState((prevState) => ({
          fields: { ...prevState.fields, [steps[currentStep].fieldName]: "" },
          currentStep: currentStep,
          messages: messages,
          lastStepDone: currentStep,
        }));
      }
    } else {
      // pressing send button
      const { validationFunction, fieldName, validationMessage } = steps[
        currentStep
      ];

      const fieldValue = this.state.fields[fieldName];
      if (Boolean(fieldValue) && validationFunction(fieldValue)) {
        if (/password/gi.test(fieldName))
          messages.push({
            side: "right",
            spanType: "",
            text:
              fieldValue.length > 0
                ? Array(fieldValue.length).fill("*").join("")
                : "Nothing typed",
          });
        else messages.push(createMessage(fieldValue, "", "right"));
        messages.push(
          createMessage("Thanks!", "correct-input left-no-bottom-radius")
        );
        if (editing) {
          if (lastStepDone < maxSteps) {
            messages.push(
              createMessage(
                "Going back to where you left off",
                "left-no-radius"
              )
            );
            messages.push(
              createMessage(
                steps[lastStepDone].inputPlaceholder,
                "left-no-top-radius"
              )
            );
            this.setState({
              messages: messages,
              currentStep: lastStepDone,
              lastStepDone: lastStepDone,
              editing: false,
            });
          }
        } else if (currentStep < maxSteps) {
          lastStepDone = currentStep + 1;
          if (lastStepDone < maxSteps)
            messages.push(
              createMessage(
                steps[lastStepDone].inputPlaceholder,
                "left-no-top-radius"
              )
            );
          this.setState({
            messages: messages,
            currentStep: lastStepDone,
            lastStepDone: lastStepDone,
            editing: false,
          });
        }
      } else {
        // field containing password word will show its value with asterisks
        if (/password/gi.test(fieldName))
          messages.push({
            side: "right",
            spanType: "",
            text:
              fieldValue.length > 0
                ? Array(fieldValue.length).fill("*").join("")
                : "Nothing typed",
          });
        else {
          messages.push(
            createMessage(fieldValue || "Nothing typed", "", "right")
          );
        }
        messages.push(createMessage(validationMessage, "error-input"));
        this.setState({ messages: messages });
      }
    }
    this.updateForm();
  };

  updateForm = () => {
    // clearing the input field
    try {
      document.getElementById("input-element").value = "";
    } catch (error) {
      console.log(error);
    }
    // automatically scrolling to the bottom to see the latest messages
    setTimeout(() => {
      var chatContainer = document.getElementById("chat-container");
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }, 150);
  };

  resetForm = () => {
    this.setState({
      messages: [
        ...this.props.firstMessages,
        createMessage(
          this.props.steps[0].inputPlaceholder,
          "left-no-top-radius"
        ),
      ],
      fields: this.props.fields,
      currentStep: 0,
      lastStepDone: 0,
      editing: false,
    });
  };

  editField = (fieldName) => {
    const { steps } = this.props;
    const requiredStep = steps.findIndex((el) => el.fieldName === fieldName);
    let { messages, editing, lastStepDone, currentStep } = this.state;
    messages.push(
      createMessage(
        `I want to update ${steps[requiredStep].userFriendlyName}`,
        "",
        "right"
      )
    );
    messages.push(createMessage("OK!", "correct-input left-no-bottom-radius"));
    messages.push(
      createMessage(steps[requiredStep].inputPlaceholder, "left-no-top-radius")
    );
    if (!editing) {
      lastStepDone = currentStep;
    }
    this.setState({
      messages: messages,
      currentStep: requiredStep,
      fields: { [fieldName]: "" },
      editing: true,
      lastStepDone: lastStepDone,
    });
    this.updateForm();
  };

  sendFormData = () => {
    this.props.getData(this.state.fields);
  };

  render() {
    const { steps, title } = this.props;
    const {
      currentStep,
      maxSteps,
      messages,
      fields,
      lastStepDone,
    } = this.state;
    const { inputType, inputPlaceholder, fieldName, optional } =
      currentStep < maxSteps ? steps[currentStep] : {};
    return (
      <div className="chat-form-container">
        <h1>{title}</h1>

        <div className="flex-container" id="chat-container">
          {messages.length > 0 &&
            messages.map((el, index) => <Message key={index} {...el} />)}
        </div>

        <div className="flex-container">
          {currentStep !== maxSteps ? (
            <Fragment>
            <div className="input-container">
              <input
                name={fieldName}
                type={inputType}
                id="input-element"
                placeholder={inputPlaceholder}
                onChange={this.handleInputChange}
              />
              {optional && (
                <button
                  className="bcg-success"
                  onClick={this.handleFormSubmission}
                  name="skip"
                >
                  Skip
                </button>
              )}
              {fields[fieldName] ? (
                <button
                  id="sendButton"
                  onClick={this.handleFormSubmission}
                  name="send"
                >
                  Send
                </button>
              ) : (
                <button
                  style={{
                    cursor: "not-allowed",
                  }}
                  id="sendButton"
                  className="bcg-disabled"
                >
                  Send
                </button>
              )}
            </div>
            <div className="flex-container" style={{ flexDirection: "row" }}>
          <span style={{ display: "inline-flex", marginRight: ".5rem" }}>
            Progress:
          </span>
          <span id="progress-bar" style={{ display: "inline-flex" }}>
            <span
              id="progress"
              style={{ width: `${(currentStep * 100) / maxSteps}%` }}
            ></span>
          </span>
        </div>
        </Fragment>
          ) : (
            <Fragment>
              <h3
                style={{
                  backgroundColor: "#e5f9e7",
                  color: "#1ebc30",
                  padding: ".5rem 1rem",
                }}
              >
                That was it for today, amazing job
              </h3>
              <button onClick={this.sendFormData} className="bcg-success">
                Submit Data
              </button>
            </Fragment>
          )}
        </div>
        
        {lastStepDone > 0 && (
          <div className="flex-container" id="twin-buttons-container">
            <button className="bcg-primary left-twin dropdown">
              Edit
              <span
                className="chevron right"
                style={{ marginLeft: ".5rem" }}
              ></span>
              <div className="dropdown-content">
                {steps
                  .filter((el, index) => index < lastStepDone)
                  .map((el, index) => (
                    <p key={index} onClick={() => this.editField(el.fieldName)}>
                      {el.userFriendlyName}
                    </p>
                  ))}
              </div>
            </button>
            <button className="bcg-danger right-twin" onClick={this.resetForm}>
              Reset
            </button>
          </div>
        )}
      </div>
    );
  }
}

ChatForm.defaultProps = {
  steps: [
    {
      inputType: "text",
      inputPlaceholder: "Please type a value",
      fieldName: "defaultTextValue",
      validationMessage: "This is the default validation message",
      optional: true,
      validationFunction: function (textValue) {
        return textValue.length > 0;
      },
    },
  ],
  firstMessages: defaultMessages,
  fields: [{ defaultTextValue: "" }],
  title: "Default title",
  getData: (data) => console.log(data),
};

ChatForm.propTypes = {
  steps: PropTypes.arrayOf(PropTypes.object),
  firstMessages: PropTypes.arrayOf(PropTypes.object),
  fields: PropTypes.object,
  title: PropTypes.string,
  getData: PropTypes.func,
};

export default ChatForm;
