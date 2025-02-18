import { useState } from "react";
import "./App.css";
import MyComponent from "./components/MyComponent";
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <MyComponent name={"Mainul"} />
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        Click Me {count}
      </button>
    </>
  );
}

export default App;
