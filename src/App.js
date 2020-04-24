import React from "react";
import ChatForm from "./FormComponents/Form";
import steps from "./FormComponents/steps";
import startingMessages from "./FormComponents/predefinedMessages";

function App() {
  return (
    <ChatForm
      title={"Register"}
      steps={steps}
      firstMessages={startingMessages}
      fields={steps.reduce((obj, currEl) => {
        obj[currEl.fieldName] = "";
        return obj;
      }, {})}
    />
  );
}

export default App;
