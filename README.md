# React Chat Form

![React Chat form](https://raw.githubusercontent.com/mdLn1/ReactChatForm/master/public/images/bck_react_chat.png "React Chat form background image")

A project that shows a sample of how to built chat-like forms in react

![Example form](https://raw.githubusercontent.com/mdLn1/ReactChatForm/master/public/images/form_example.png "React Chat form example")

**If you want to try it, all you need to do is to clone the repository and run `npm install` inside the root directory of the repository.**

__If there are any issues that you find and you can fix them please go ahead and make a pull request.__

**Please open an issue if you find any bugs and write instructions how it can be reproduced.**

## Documentation

The components needed for creating a form in a chat-like manner can be found in `src/FormComponents`

![Form Components](https://raw.githubusercontent.com/mdLn1/ReactChatForm/master/public/images/form_components.png "elements for a chat form")

Each component is explained below:

## Message - component

The message component is used to display messages in the form:

A default message created using `<Message />` inside the chat form looks like this:

![Default Message](https://raw.githubusercontent.com/mdLn1/ReactChatForm/master/public/images/default_message.png "default message img")

There are different types of messages style that you can create based on the properties you pass to the message component, you can achieve all the following, just use the code next to the message wanted:

![Message types](https://raw.githubusercontent.com/mdLn1/ReactChatForm/master/public/images/message_types.png "messages types img")

## predefinedMessages - component

This component is a list of messages that will show at the top of the form by default

In the default form, you can see those in the image below:

![Predefined messages](https://raw.githubusercontent.com/mdLn1/ReactChatForm/master/public/images/message_types.png "predefined messages img")

## steps - component

This component contains all the details of the form, you can edit this depending on the data that it is required for your form

There is function `createStep()` inside the file that can help you create steps.

**All the information regarding the parameters for a step can be found inside the file on the first lines.**

## Form - component

The form component is what can be seen in the picture close to the top of this file.

It has a title, the chat box, the input container, progress bar and buttons for various actions.

Inside `src/App.js` you can see how this component is used and all the properties that can be passed.

**title** - type string, located at the top of the container
**hideProgress** - type boolean, whether you want the progress bar to be shown or not; it records how many steps have been done;
**steps** - type Array, a number of steps for the form, by default using the ones from `src/FormComponents/steps.js`;
**fields** - type Object, uses all the `fieldName` property from steps Array, so that they can all be updated within state;
**firstMessages** - type Array, shows the first messages in the form, such as introduction messages; by default using the ones from `src/FormComponents/predefinedMessages.js`;
**getData** - type function, the function passed here will receive an object that is the sam type as **fields** containing all the data received after completing the form
