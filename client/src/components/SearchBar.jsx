function SearchBar({ search, setSearch }) {
    return (
        <input
            type="text"
            placeholder="🔍 Search countries..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ padding: '0.6rem 1rem', fontSize: '1rem', width: '100%', borderRadius: '8px', border: '1px solid #ccc' }}
        />
    );
}

export default SearchBar;
