import { IconSearch } from "@/icons";

const Search = ({handleSearchChange}) => {
  return (
    <div className="relative">
      <input
        onChange={handleSearchChange}
        placeholder="Search"
        type="text"
        className="w-[320px] pl-11 p-[14px] bg-transparent border-2 border-gray-200 rounded-lg placeholder:text-base placeholder:text-gray-500 placeholder:font-normal focus:outline-none"
      />
      <span className="absolute left-4 top-[50%] -translate-y-[50%] cursor-pointer">
        <IconSearch />
      </span>
    </div>
  );
};

export default Search;
