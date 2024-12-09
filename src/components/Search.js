import React, { useState } from 'react';
import axios from 'axios';

const Search = ({ token }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('track'); // Can be 'track' or 'artist'
  const [track, setTrack] = useState(null);
  const [artist, setArtist] = useState(null); // New state for artist details
  const [reviews, setReviews] = useState({}); // Store reviews for each track
  const [comment, setComment] = useState('');
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    if (!searchTerm) return;

    try {
      if (searchType === 'track') {
        const response = await axios.get(`http://localhost:8080/api/music/track/${searchTerm}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTrack(response.data);
        setArtist(null); // Clear artist data
        setError(null);
      } else if (searchType === 'artist') {
        const response = await axios.get(`http://localhost:8080/api/music/artist/${searchTerm}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setArtist(response.data);
        setTrack(null); // Clear track data
        setError(null);
      }
    } catch (error) {
      console.error('Search failed:', error);
      setError('Could not retrieve information.');
      setTrack(null);
      setArtist(null);
    }
  };

  const handleAddReview = () => {
    if (!comment.trim()) return;
    setReviews((prev) => ({
      ...prev,
      [track.id]: [...(prev[track.id] || []), comment],
    }));
    setComment('');
  };

  return (
    <div style={{ display: 'flex', gap: '20px' }}>
      {/* Search Section */}
      <div style={{ flex: 1 }}>
        <h2>Search for a Track or Artist</h2>
        <select onChange={(e) => setSearchType(e.target.value)} value={searchType}>
          <option value="track">Track</option>
          <option value="artist">Artist</option>
        </select>
        <input
          type="text"
          placeholder={`Enter ${searchType === 'track' ? 'Track' : 'Artist'} Name`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>

      {/* Track or Artist Details */}
      <div style={{ flex: 2 }}>
        {track && (
          <div className="track-details">
            <h3>Track Details</h3>
            <p><strong>Title:</strong> {track.name}</p>
            <p><strong>Album:</strong> {track.album.name}</p>
            <p><strong>Artists:</strong> {track.artists.map((artist) => artist.name).join(', ')}</p>
            <p><strong>Release Date:</strong> {track.album.release_date}</p>
            <audio controls src={track.preview_url}>
              Your browser does not support the audio element.
            </audio>

            {/* Comment Section for Tracks */}
            <div className="comment-section">
              <h3>Reviews</h3>
              <textarea
                rows="4"
                placeholder="Write your review here..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '8px',
                  border: '1px solid #ccc',
                  marginBottom: '10px',
                }}
              ></textarea>
              <button onClick={handleAddReview}>Submit Review</button>

              {/* Display Reviews */}
              <ul style={{ marginTop: '20px', listStyleType: 'none', padding: 0 }}>
                {(reviews[track.id] || []).map((review, index) => (
                  <li
                    key={index}
                    style={{
                      background: '#f9f9fb',
                      padding: '10px',
                      borderRadius: '8px',
                      marginBottom: '10px',
                      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                    }}
                  >
                    {review}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {artist && (
          <div className="artist-details">
            <h3>Artist Details</h3>
            <p><strong>Name:</strong> {artist.name}</p>
            <p><strong>Genres:</strong> {artist.genres.join(', ')}</p>
            <p><strong>Popularity:</strong> {artist.popularity}</p>
            <p><strong>Followers:</strong> {artist.followers.total}</p>
            {artist.images.length > 0 && (
              <img src={artist.images[0].url} alt={`${artist.name} image`} width="200" />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
