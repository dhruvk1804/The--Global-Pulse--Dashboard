import axios from 'axios';

function CountryCard({ country, onClick }) {
  const handleFavorite = async (e) => {
    e.stopPropagation();
    try {
      await axios.post('http://localhost:8000/api/favorites', {
        countryName: country.name.common,
        flagUrl: country.flags.png,
      });
      alert(`❤️ ${country.name.common} added to favorites!`);
    } catch (err) {
      alert('Failed to add favorite.');
    }
  };

  return (
    <div className="card" onClick={onClick}>
      <img src={country.flags.png} alt={`${country.name.common} flag`} />
      <h3>{country.name.common}</h3>
      <p>👥 {country.population.toLocaleString()}</p>
      <p>🌍 {country.region}</p>
      <button className="fav-btn" onClick={handleFavorite}>❤️ Favorite</button>
    </div>
  );
}

export default CountryCard;
