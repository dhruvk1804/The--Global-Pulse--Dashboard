import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import RegionFilter from '../components/RegionFilter';
import CountryCard from '../components/CountryCard';
import QuoteHeader from '../components/QuoteHeader';
import '../styles/Home.css';

function Home() {
    const [countries, setCountries] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [search, setSearch] = useState('');
    const [region, setRegion] = useState('All');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [favorites, setFavorites] = useState([]); // ✅ ADDED: favorites state
    const navigate = useNavigate();

    const fetchFavorites = async () => { // ✅ ADDED: fetch favorites function
        try {
            const res = await axios.get('http://localhost:8000/api/favorites');
            setFavorites(res.data);
        } catch (err) {
            console.error('Failed to fetch favorites:', err.message);
        }
    };

    useEffect(() => {
        axios.get('https://restcountries.com/v3.1/all?fields=name,flags,population,region,capital,currencies')
            .then(res => {
                setCountries(res.data);
                setFiltered(res.data);
                setLoading(false);
            })
            .catch(() => {
                setError('Failed to load countries.');
                setLoading(false);
            });

        fetchFavorites(); // ✅ ADDED: load favorites on mount
    }, []);

    useEffect(() => {
        let results = [...countries];
        if (region !== 'All') {
            results = results.filter(c => c.region === region);
        }
        if (search) {
            results = results.filter(c =>
                c.name.common.toLowerCase().includes(search.toLowerCase())
            );
        }
        setFiltered(results);
    }, [search, region, countries]);

    if (loading) return <p className="status-msg">Loading countries...</p>;
    if (error) return <p className="error-msg">{error}</p>;

    return (
        <div className="app">
            <h1>Global Pulse Dashboard</h1>
            <QuoteHeader />
            <div className="controls">
                <SearchBar search={search} setSearch={setSearch} />
                <RegionFilter region={region} setRegion={setRegion} />
            </div>
            <p className="count">{filtered.length} countries found</p>
            <div className="grid">
                {filtered.map(country => (
                    <CountryCard
                        key={country.name.common}
                        country={country}
                        onClick={() => navigate(`/country/${country.name.common}`)}
                        favorites={favorites}           // ✅ ADDED: passed favorites
                        fetchFavorites={fetchFavorites} // ✅ ADDED: passed fetchFavorites
                    />
                ))}
            </div>
            <button className="floating-btn" onClick={() => navigate('/favorites')}>
                ❤️ My Favorites
            </button>
        </div>
    );
}

export default Home;
