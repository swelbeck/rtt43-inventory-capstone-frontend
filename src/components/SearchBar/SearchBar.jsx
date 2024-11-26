// SearchBar.jsx

import "./SearchBar.css";

function SearchBar({ searchFormData, setSearchFormData }) {
  function handleChange(e) {
    setSearchFormData({
      ...searchFormData,
      [e.target.name]: e.target.value,
    });
  }

  return (
    <form className="search-bar-form">
      <input
        id="text"
        onChange={handleChange}
        name="searchParams"
        type="text"
        value={searchFormData.searchParams}
        placeholder="Search..."
      />
      <br />
    </form>
  );
}

export default SearchBar;
