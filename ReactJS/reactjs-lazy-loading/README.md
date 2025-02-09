# 🚀 Boosting React Performance with Lazy Loading  

## What is Lazy Loading?  
Lazy loading allows React to load components **only when they are needed**, reducing the initial bundle size and improving page load speed.

## Practical Scenario  
Imagine you have a **medium to large-scale app** like an **eCommerce platform** with multiple pages:

- `/` (Home)  
- `/products`  
- `/about`  
- `/contact`  
- `/profile`  

When the app first loads and the user visits the **Home page**, it should **only load the Home component**, not all other pages like **Products**, **About**, **Contact**, or **Profile**.  

By using **lazy loading**, you ensure that components are loaded **on demand**, improving efficiency and performance. This is especially crucial in larger apps where loading everything at once can slow down the user experience.

## Benefits of Lazy Loading  

✅ **Faster initial load time**  
✅ **Improved performance**, especially in large apps  
✅ **Reduced unnecessary resource usage**

---

#ReactJS #WebPerformance #LazyLoading #FrontendDevelopment #MERN #JavaScript  

---


## Update App.jsx
```jsx
import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import Home from './components/Home';
import Navbar from './components/Navbar';

const Products = React.lazy(() => import('./components/Products'));
const About = React.lazy(() => import('./components/About'));
const Contact = React.lazy(() => import('./components/Contact'));
const Profile = React.lazy(() => import('./components/Profile'));

function App() {
  return (
    <Router>
      <Navbar />  
      <Suspense fallback={<div>Loading .....</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;

```

### 2. Create components folder and create components 

##### About
```jsx

const About =()=>{
    return(
        <>
        <h1>About Page</h1>
        </>
    )
}

export default About
```
##### Contact
```jsx

const Contact =()=>{
    return(
        <>
        <h1>Contact Page</h1>
        </>
    )
}

export default Contact
```

##### Home
```jsx

const Home =()=>{
    return(
        <>
        <h1>Home Page</h1>
        </>
    )
}

export default Home
```
#### Profile
```jsx

const Profile =()=>{
    return(
        <>
        <h1>Profile Page</h1>
        </>
    )
}

export default Profile
```

##### Products
```jsx

const Products =()=>{
    return(
        <>
        <h1>Products Page</h1>
        </>
    )
}

export default Products
```
##### Navbar
```jsx
import { Link } from "react-router-dom"

const Navbar = () => {
    return (
        <>
            <div >
                <ul style={{ display: "flex", justifyContent: "space-around", listStyle: "none" }}>
                    <li>
                        <Link to="/products">Products</Link>
                    </li>
                    <li>
                        <Link to="/contact">Contact</Link>
                    </li>
                    <li>
                        <Link to="/about">About</Link>
                    </li>
                    <li>
                        <Link to="/profile">Profile</Link>
                    </li>
                </ul>
            </div>
        </>
    )
}

export default Navbar

```


### Run App :

    npm run dev



http://localhost:5173/
![Image](https://github.com/user-attachments/assets/60e2c377-69ac-49ef-ae7f-43c5eed5c7af)

http://localhost:5173/contact
![Image](https://github.com/user-attachments/assets/f1014608-2026-4e8f-ad08-90c461ed1490)

http://localhost:5173/profile
![Image](https://github.com/user-attachments/assets/fca1c9e0-ddad-4d3e-8226-90227397e394)

http://localhost:5173/about
![Image](https://github.com/user-attachments/assets/50197df2-2455-47f8-b3de-c7b153016f2a)
