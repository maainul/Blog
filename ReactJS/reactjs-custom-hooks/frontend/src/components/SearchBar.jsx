const SearchBar = ({ loading }) => {
  console.log("SearchBar Components rendered")
  return (
    <>
      <div className="p-4 rounded-lg mb-6">
        <input
          type="text"
          placeholder="Search articles..."
          className="w-full p-2 border rounded-md"
        />
      </div>
    </>
  );
};
export default SearchBar;
