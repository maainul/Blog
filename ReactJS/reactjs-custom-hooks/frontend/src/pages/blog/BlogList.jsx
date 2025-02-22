import Card from "../../components/Card";

const BlogList = ({ posts }) => {
    return (
        <div className="mx-auto ">
            {posts.map((category) => (
                <div key={category.category} className="mb-10">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                        {category.category}
                    </h2>
                    <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
                        <Card blogs={category.posts} />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default BlogList;
