const regions = ['All', 'Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

function RegionFilter({ region, setRegion }) {
    return (
        <select
            value={region}
            onChange={e => setRegion(e.target.value)}
            style={{ padding: '0.6rem 1rem', fontSize: '1rem', borderRadius: '8px', border: '1px solid #ccc' }}
        >
            {regions.map(r => (
                <option key={r} value={r}>{r}</option>
            ))}
        </select>
    );
}

export default RegionFilter;
