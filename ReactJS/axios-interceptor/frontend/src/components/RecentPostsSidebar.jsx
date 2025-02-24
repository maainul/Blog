import { Link } from 'react-router-dom';

const RecentPostsSidebar = ({ posts, loading }) => {
  console.log("Recent Posts Components rendered")
  return (
    <div className=" p-4 rounded-lg mb-6">
      <h3 className="text-lg font-semibold text-gray-900 border-b pb-2 mb-3">
        Recent Posts
      </h3>
      <ul className="space-y-4">
        {posts.map((post, index) => (
          <Link to={`/blogs/${post._id}`} key={index} >
            <li key={index} className="hover:cursor-pointer hover:font-bold pb-2 lg:text-[18px] md:text-[16px]">
              {post.title}
            </li>
          </Link>
        ))}
      </ul>

    </div>
  );
};

export default RecentPostsSidebar;
