
## Simple Blog Application :
![Image](https://github.com/user-attachments/assets/e14cef8f-7dfa-4bdf-9a8f-bac5ad03632f)

### For Run Application :

1. Clone 
   
2. Open Mongodb and create db : test_db

3. cd backend 
    1. npm install
    2. npm run blog

4. cd frontend  
    1. npm install
    2. npm run dev

5. backend Port : 8081
6. Frontend Port : 5173

7. Backend API : 

    1. Create Blog : http://localhost:8081/blogs/create
    2. Get Blogs : http://localhost:8081/blogs/create
    3. Create Category : http://localhost:8081/category/create
    4. Get Category : http://localhost:8081/category/list

8. First Create Blog Category With this API :


9. Create Category :"http://localhost:8081/category/create"
    ```json
    {"name":"Docker"}
    ```
10. Create Blog : "http://localhost:8081/blogs/create"
    

```json
"formdata": [
    {
        "key": "image",
        "type": "file",
        "src": "https___dev-to-uploads.s3.amazonaws.com_uploads_articles_cmp01r90dsj7kuz2w1md.jpg"
    },
    {
        "key": "title",
        "value": "ReactJS Roadmap | Beginners to Advanced (Resource Compiled)🔥",
        "type": "text"
    },
    {
        "key": "content",
        "value": "Hello, In this blog I am gonna walk you through the roadmap for learning React, I've broken down the concept of React into small parts as modules so that It will be easier to understand. This is only for the beginners, Soon I'll publish another blog on advance roadmap of React and also this is just a roadmap(learning path), For learning these concepts I've added the official documentation links(for most of the concepts) where you can go and learn, One interesting thing is that I have also added what you gonna achieve by learning those concepts🎯.\n\nPre-requisites📝:\nI assume that you have some basic understanding of the following:\n\nBasics of HTML(such as HTML elements, form, table, div and list tags with their attributes).\nBasics of CSS(such as styling the html elements, CSS selectors and box model).\nBasics of JavaScript(such as variables, conditional statements, loops, data types, DOM manipulation and event triggering).\nRead More : ReactJS Roadmap | Beginners to Advanced (Resource Compiled)🔥\n\nI hope you found what you were looking for from this tutorial. If you want more Roadmap like this, then do join our Telegram channel for future updates.\n\nThanks for reading, have a nice day 🙂",
        "type": "text"
    },
    {
        "key": "category",
        "value": "67b955db73127adb85b2a33b",
        "type": "text"
    }
]
```
![Image](https://github.com/user-attachments/assets/baed1d93-cd87-4ff0-bcde-2ddb351c4213)

# React JS Custom Hook For Fetch Data 


1. Let's Fetch From Backend API :
   
   Fetch data from backend api : "http:localhost:8081/blogs"

**Blogs**

```JS
import React, { useEffect, useState } from "react";
import axios from "axios";

import BlogList from "./BlogList";
import SkeletonCard from "../../components/Skeleton/SkeletonCard";
import { toast } from "react-toastify";
import Error from "../../components/Error";

const Blogs = () => {

    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            setError(null)
            try {
                const res = await axios.get("http://localhost:8081/blogs")
                setPosts(res.data.data)
            } catch (error) {
                console.log(error)
                toast.error(error.message)
                setError(error.message)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [])

    if (error) {

    }

    return (
        <>
            <div className="container mx-auto bg-gray-50">
                <div className="flex flex-col sm:flex-row gap-4">
                    {error ? <Error error={error} /> : loading ? <SkeletonCard /> : <BlogList posts={posts?.categoryPosts || []} />}
                </div>
            </div>
        </>
    );
};

export default Blogs;

```
In this Scenerio User hit the home page and got error and error message is showing in the tost notification as well as withing a component.Based on your requirement you can use any of these.
But if you have large application you have to repeate these code every time.

#### What We can do ?

Use Custom Hooks for fetch Data from the API.

Let's Create that. Create folder in src directory hooks
File name : useFetch.js

```js
import axios from "axios";
import { useEffect, useState } from "react";

const useFetch = (URL) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {

    setLoading(true);
    setError(null)
    const fetchData = async () => {
      try {
        const result = await axios.get(URL)
        setData(result.data.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();

  }, [URL]);

  return { data, loading, error };
};

export default useFetch;
```


```js
import React from "react";

import BlogList from "./BlogList";
import SkeletonCard from "../../components/Skeleton/SkeletonCard";
import Error from "../../components/Error";
import useFetch from "../../hooks/useFetch";

const Blogs = () => {

    const { data, loading, error } = useFetch("http://localhost:8081/blogs")

    return (
        <>
            <div className="container mx-auto bg-gray-50">
                <div className="flex flex-col sm:flex-row gap-4">
                    {error ? <Error error={error} /> : loading ? <SkeletonCard /> : <BlogList posts={data?.categoryPosts || []} />}
                </div>
            </div>
        </>
    );
};

export default Blogs;
```

This way we can create custom hook and and can improve reactjs code quality and performance


## Mastering React: How to Build a Custom Hook for API Requests
To demonstrate the implementation of a custom React hook for data fetching, I developed a blog application that integrates a Node.js backend with a React frontend. Here's a concise overview:

**Backend Setup:**
- **Database:** Utilized MongoDB with a database named `test_db`.
- **Server:** Established a Node.js server running on port 8081.
- **API Endpoints:**
  - Create Blog: `POST http://localhost:8081/blogs/create`
  - Retrieve Blogs: `GET http://localhost:8081/blogs`
  - Create Category: `POST http://localhost:8081/category/create`
  - List Categories: `GET http://localhost:8081/category/list`

**Frontend Setup:**
- **Framework:** Built with React.js, operating on port 5173.
- **Features:** Implemented dynamic rendering of blog posts and categories.
- **Data Fetching:** Employed Axios for API interactions.

**Implementing a Custom Hook for Data Fetching:**
To enhance code reusability and manage side effects efficiently, I created a custom hook named `useFetch`. This hook centralizes the data fetching logic, promoting cleaner and more maintainable components.

*Example of the `useFetch` Hook:*

```js
import axios from "axios";
import { useEffect, useState } from "react";
const useFetch = (URL) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    setLoading(true);
    setError(null)
    const fetchData = async () => {
      try {
        const result = await axios.get(URL)
        setData(result.data.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [URL]);
  return { data, loading, error };
};
export default useFetch;
```


*Utilizing `useFetch` in a Component:*

```javascript
import React from 'react';
import useFetch from './hooks/useFetch';

const BlogList = () => {
  const { data: blogs, loading, error } = useFetch('http://localhost:8081/blogs');

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      {blogs.map((blog) => (
        <div key={blog.id}>
          <h2>{blog.title}</h2>
          <p>{blog.content}</p>
        </div>
      ))}
    </div>
  );
};

export default BlogList;
```


This approach not only streamlines the data fetching process but also ensures that components remain focused on rendering UI, adhering to the principle of separation of concerns.

*Note:* Ensure that your MongoDB instance is running and the backend server is active before starting the frontend application.

By adopting this structure, the application achieves a clean separation between data handling and presentation layers, facilitating easier maintenance and scalability. 