import React from "react";


const ChildComponents = React.memo(({ name }) => {
    console.log('ChildComponent rendered');
    return <h2>Child Component - Name: {name}</h2>;
  });

export default ChildComponents