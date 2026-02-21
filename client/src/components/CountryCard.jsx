import axios from 'axios';

function CountryCard({ country, onClick, favorites, fetchFavorites }) { // ✅ ADDED: favorites, fetchFavorites props
  const isFav = favorites?.some(f => f.countryName === country.name.common); // ✅ ADDED: check if already favorited

  const handleFavorite = async (e) => {
    e.stopPropagation();
    try {
      await axios.post('http://localhost:8000/api/favorites', {
        countryName: country.name.common,
        flagUrl: country.flags.png,
      });
      alert(`❤️ ${country.name.common} added to favorites!`);
      await fetchFavorites(); // ✅ ADDED: refresh favorites after adding
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to add favorite.'); // ✅ CHANGED: shows actual backend error message
    }
  };

  const handleRemove = async (e) => { // ✅ ADDED: remove handler
    e.stopPropagation();
    try {
      const fav = favorites.find(f => f.countryName === country.name.common);
      await axios.delete(`http://localhost:8000/api/favorites/${fav._id}`); // ✅ ADDED: delete by _id
      alert(`💔 ${country.name.common} removed from favorites!`);
      await fetchFavorites(); // ✅ ADDED: refresh favorites after removing
    } catch (err) {
      alert('Failed to remove favorite.');
    }
  };

  return (
    <div className="card" onClick={onClick}>
      <img src={country.flags.png} alt={`${country.name.common} flag`} />
      <h3>{country.name.common}</h3>
      <p>👥 {country.population.toLocaleString()}</p>
      <p>🌍 {country.region}</p>

      {isFav ? ( // ✅ ADDED: toggle button based on favorite status
        <button className="fav-btn remove" onClick={handleRemove}>💔 Remove Favorite</button>
      ) : (
        <button className="fav-btn" onClick={handleFavorite}>❤️ Favorite</button>
      )}
    </div>
  );
}

export default CountryCard;
