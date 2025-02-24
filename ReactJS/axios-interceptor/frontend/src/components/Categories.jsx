const Categories = ({ categories,loading }) => {
  console.log("Category Components rendered")
  return (
    <>
      <div className="p-4 rounded-lg  mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Categories</h3>
        <div className="flex flex-wrap gap-3">
          {categories.map((category) => (
            <a
              key={category._id}
              href={`/blogs/category/${category._id}`}
              className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              {category.name}
            </a>
          ))}
        </div>
      </div>
    </>
  );
};

export default Categories;
