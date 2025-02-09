import { useState } from 'react'
import ChildComponents from "./ChildComponents"

function ParentComponents() {

  const [count, setCount] = useState(0);
  const [name, setName] = useState('John');

  return (
    <>

      <h1>Parent Component</h1>
      <button onClick={() => setCount(count + 1)}>Increment Count</button>
      <button onClick={() => setName(name === 'John' ? 'Jane' : 'John')}>
        Change Name
      </button>
      <p>Count: {count}</p>

      {/* ChildComponent will only re-render when `name` changes */}
      <ChildComponents name={name} /> 
    </>
  )
}

export default ParentComponents
