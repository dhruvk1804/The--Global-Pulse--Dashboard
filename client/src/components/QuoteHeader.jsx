import { useState, useEffect } from 'react';
import axios from 'axios';

function QuoteHeader() {
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:8000/api/quote')
      .then(res => {
        setQuote(res.data);
        setLoading(false);
      })
      .catch(() => {
        setQuote({ q: 'Keep going.', a: 'Unknown' });
        setLoading(false);
      });
  }, []); // ← empty array = run ONCE only

  if (loading) return <div className="quote-header">Loading quote...</div>;

  return (
    <div className="quote-header">
      <p>"{quote.q}"</p>
      <span>— {quote.a}</span>
    </div>
  );
}

export default QuoteHeader;
