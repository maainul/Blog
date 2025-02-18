import React from "react";

const MyComponent = ({ name }) => {
  console.log("My Component rendered");
  return <div>Hello, {name}</div>;
};

export default MyComponent;
