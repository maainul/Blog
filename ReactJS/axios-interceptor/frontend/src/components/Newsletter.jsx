const Newsletter = ({ loading }) => {
  console.log("Newsletter Components rendered")
  return (
    <>
      <div className=" p-4 rounded-lg  mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Subscribe</h3>
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full p-2 border rounded-md mb-2"
        />
        <button className="w-full bg-blue-600 text-white p-2 rounded-md">
          Subscribe
        </button>
      </div>
    </>
  );
};
export default Newsletter;
