function SearchBar({ formData, setFormData }) {
  function handleChange(e) {
    if (e.target.name == "inStock") {
      setFormData({ ...formData, inStock: !formData.inStock });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  }

  return (
    <form>
      <input
        id="text"
        onChange={handleChange}
        name="searchParams"
        type="text"
        placeholder="Search..."
      />
      <br />
      <label>
        <input onChange={handleChange} name="inStock" type="checkbox" /> Only
        show products in stock
      </label>
    </form>
  );
}

export default SearchBar;
