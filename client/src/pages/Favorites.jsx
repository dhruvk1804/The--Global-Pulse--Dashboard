import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/Favorites.css';

function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchFavorites = () => {
    axios.get('http://localhost:8000/api/favorites')
      .then(res => {
        setFavorites(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/favorites/${id}`); // ✅ CHANGED: delete by _id
      setFavorites(prev => prev.filter(f => f._id !== id)); // ✅ CHANGED: filter by _id not countryName
    } catch (err) {
      alert('Failed to delete favorite.');
    }
  };

  if (loading) return <p className="status-msg">Loading favorites...</p>;

  return (
    <div className="app">
      <button className="back-btn" onClick={() => navigate('/')}>← Back to Dashboard</button>
      <h1>❤️ My Favorites</h1>

      {favorites.length === 0 ? (
        <p className="status-msg">No favorites yet!</p>
      ) : (
        <div className="favorites-grid">
          {favorites.map(fav => (
            <div key={fav._id} className="card">
              <img src={fav.flagUrl} alt={fav.countryName} />
              <h3>{fav.countryName}</h3>
              <button className="delete-btn" onClick={() => handleDelete(fav._id)}> {/* ✅ CHANGED: pass fav._id not fav.countryName */}
                🗑️ Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorites;
