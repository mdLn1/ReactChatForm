import React, { Fragment } from "react";
import ChatForm from "./FormComponents/Form";
import steps from "./FormComponents/steps";
import startingMessages from "./FormComponents/predefinedMessages";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      finishedForm: false,
    };
  }
  render() {
    return (
      <Fragment>
        {this.state.finishedForm ? (
          <div style={{ margin: "auto" }}>
            <h1>You finished for today</h1>
          </div>
        ) : (
          <ChatForm
            title={"Form"}
            steps={steps}
            firstMessages={startingMessages}
            fields={steps.reduce((obj, currEl) => {
              obj[currEl.fieldName] = "";
              return obj;
            }, {})}
            getData={(data) => {
              console.log(data);
              this.setState({ finishedForm: true });
            }}
            hideProgress={false}
          />
        )}
      </Fragment>
    );
  }
}

export default App;
