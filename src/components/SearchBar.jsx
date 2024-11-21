function SearchBar({ formData, setFormData }) {
  function handleChange(e) {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

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

    </form>
  );
}

export default SearchBar;
