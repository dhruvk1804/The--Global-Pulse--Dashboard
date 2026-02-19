import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/CountryDetail.css';


function CountryDetail() {
    const { name } = useParams();
    const navigate = useNavigate();
    const [country, setCountry] = useState(null);
    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch country details
        axios.get(`https://restcountries.com/v3.1/name/${name}?fields=name,flags,population,region,capital,currencies,languages,area`)
            .then(res => {
                setCountry(res.data[0]);
                setLoading(false);
            })
            .catch(() => setLoading(false));

        // Fetch top 3 coins from CoinGecko
        axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=3&page=1')
            .then(res => setCoins(res.data))
            .catch(() => { });
    }, [name]);

    if (loading) return <p style={{ textAlign: 'center' }}>Loading...</p>;
    if (!country) return <p style={{ textAlign: 'center' }}>Country not found.</p>;

    const currencies = country.currencies
        ? Object.values(country.currencies).map(c => c.name).join(', ')
        : 'N/A';

    return (
        <div className="app">
            <button onClick={() => navigate(-1)} style={{ marginBottom: '1rem', cursor: 'pointer' }}>← Back</button>
            <div className="card" style={{ maxWidth: '500px', margin: '0 auto' }}>
                <img src={country.flags.png} alt={country.name.common} />
                <h2 style={{ margin: '1rem 0 0.5rem' }}>{country.name.common}</h2>
                <p>👥 Population: {country.population.toLocaleString()}</p>
                <p>🌍 Region: {country.region}</p>
                <p>🏙️ Capital: {country.capital?.[0] || 'N/A'}</p>
                <p>💰 Currency: {currencies}</p>
                <p>📐 Area: {country.area?.toLocaleString()} km²</p>
            </div>

            <h3 style={{ textAlign: 'center', margin: '2rem 0 1rem' }}>📈 Trending Coins</h3>
            <div className="grid" style={{ maxWidth: '700px', margin: '0 auto' }}>
                {coins.map(coin => (
                    <div key={coin.id} className="card">
                        <img src={coin.image} alt={coin.name} style={{ height: '60px', objectFit: 'contain' }} />
                        <h3>{coin.name}</h3>
                        <p>${coin.current_price.toLocaleString()}</p>
                        <p style={{ color: coin.price_change_percentage_24h > 0 ? 'green' : 'red' }}>
                            {coin.price_change_percentage_24h?.toFixed(2)}% (24h)
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CountryDetail;
