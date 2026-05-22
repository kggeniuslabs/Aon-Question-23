import React, { useState } from 'react';
import './App.css';

const DEFAULT_AVATAR =
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="%233b82f6"/><stop offset="100%" stop-color="%230ea5e9"/></linearGradient></defs><circle cx="60" cy="60" r="58" fill="url(%23g)"/><circle cx="60" cy="45" r="21" fill="%23e2e8f0"/><path d="M22 97c7-17 20-26 38-26s31 9 38 26" fill="%23e2e8f0"/></svg>';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [playerInfo, setPlayerInfo] = useState({
    name: 'MS Dhoni',
    sport: 'Cricket',
    score: '17805',
    team: 'Chennai Super Kings',
    position: 'Wicket Keeper',
    country: 'India',
    matches: '350',
    average: '38.09',
    achievement: 'World Cup Champion'
  });

  const [formData, setFormData] = useState({
    name: '',
    sport: '',
    score: '',
    team: '',
    position: '',
    country: '',
    matches: '',
    average: '',
    achievement: ''
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Player name is required';
    if (!formData.sport.trim()) newErrors.sport = 'Sport type is required';
    if (!formData.team.trim()) newErrors.team = 'Team is required';
    if (!formData.position.trim()) newErrors.position = 'Position is required';
    if (!formData.country.trim()) newErrors.country = 'Country is required';
    
    if (!formData.score.toString().trim()) {
      newErrors.score = 'Score/Statistics is required';
    } else if (isNaN(formData.score) || Number(formData.score) < 0) {
      newErrors.score = 'Must be a valid positive number';
    }

    if (!formData.matches.toString().trim()) {
      newErrors.matches = 'Matches played is required';
    } else if (isNaN(formData.matches) || Number(formData.matches) < 0) {
      newErrors.matches = 'Must be a valid positive number';
    }
    if (!formData.average.trim()) newErrors.average = 'Average is required';
    if (!formData.achievement.trim()) newErrors.achievement = 'Achievement is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setPlayerInfo({
        name: formData.name.trim(),
        sport: formData.sport.trim(),
        score: formData.score.trim(),
        team: formData.team.trim(),
        position: formData.position.trim(),
        country: formData.country.trim(),
        matches: formData.matches.trim(),
        average: formData.average.trim(),
        achievement: formData.achievement.trim()
      });
      setIsModalOpen(false);
      setFormData({
        name: '',
        sport: '',
        score: '',
        team: '',
        position: '',
        country: '',
        matches: '',
        average: '',
        achievement: ''
      });
    }
  };

  return (
    <div className="container">
      

      {/* Player Card Display */}
      <div className="player-card">
        <div className="card-header">
          <div className="avatar-container">
            <img 
              src={DEFAULT_AVATAR}
              alt={`${playerInfo.name}'s profile`} 
              className="player-image" 
            />
            <span className="verification-badge">✓</span>
          </div>
          <div className="header-info">
            <h2>{playerInfo.name}</h2>
            <span className="sport-badge">{playerInfo.sport}</span>
          </div>
        </div>
        
        <div className="achievement-banner">
          <span className="achievement-icon">⭐</span>
          <span className="achievement-text">{playerInfo.achievement}</span>
        </div>
        
        <div className="player-details">
          <div className="team-position">
            <p className="position-badge">{playerInfo.position}</p>
            <p className="team-name">{playerInfo.team}</p>
            <p className="country-flag">🌍 {playerInfo.country}</p>
          </div>
          
          <div className="player-stats-grid">
            <div className="player-stat">
              <span className="stat-label">Score</span>
              <span className="stat-value">{playerInfo.score}</span>
            </div>
            <div className="player-stat">
              <span className="stat-label">Matches</span>
              <span className="stat-value">{playerInfo.matches}</span>
            </div>
            <div className="player-stat">
              <span className="stat-label">Average</span>
              <span className="stat-value">{playerInfo.average}</span>
            </div>
            <div className="player-stat">
              <span className="stat-label">Peak Rating</span>
              <span className="stat-value">1</span>
            </div>
          </div>
        </div>
      </div>
      <button className="primary-btn" onClick={() => setIsModalOpen(true)}>
        Create Player Card
      </button>


      {/* Modal Overlay and Form */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <span className="close-btn" onClick={() => setIsModalOpen(false)}>&times;</span>
            <h2>Enter Player Details</h2>
            <form onSubmit={handleSubmit} noValidate>
              <div className="form-group">
                <label htmlFor="name">Player Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g. MS Dhoni"
                />
                {errors.name && <span className="error-text">{errors.name}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="sport">Sport Type</label>
                <input
                  type="text"
                  id="sport"
                  name="sport"
                  value={formData.sport}
                  onChange={handleInputChange}
                  placeholder="e.g. Cricket"
                />
                {errors.sport && <span className="error-text">{errors.sport}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="score">Score/Statistics</label>
                <input
                  type="number"
                  id="score"
                  name="score"
                  value={formData.score}
                  onChange={handleInputChange}
                  placeholder="e.g. 17,805"
                />
                {errors.score && <span className="error-text">{errors.score}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="team">Team</label>
                <input
                  type="text"
                  id="team"
                  name="team"
                  value={formData.team}
                  onChange={handleInputChange}
                  placeholder="e.g. Chennai Super Kings"
                />
                {errors.team && <span className="error-text">{errors.team}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="position">Position</label>
                <input
                  type="text"
                  id="position"
                  name="position"
                  value={formData.position}
                  onChange={handleInputChange}
                  placeholder="e.g. Wicket Keeper"
                />
                {errors.position && <span className="error-text">{errors.position}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="country">Country</label>
                <input
                  type="text"
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  placeholder="e.g. India"
                />
                {errors.country && <span className="error-text">{errors.country}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="matches">Matches Played</label>
                <input
                  type="number"
                  id="matches"
                  name="matches"
                  value={formData.matches}
                  onChange={handleInputChange}
                  placeholder="e.g. 350"
                />
                {errors.matches && <span className="error-text">{errors.matches}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="average">Average</label>
                <input
                  type="number"
                  id="average"
                  name="average"
                  value={formData.average}
                  onChange={handleInputChange}
                  placeholder="e.g. 38.09"
                  step="0.01"
                />
                {errors.average && <span className="error-text">{errors.average}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="achievement">Key Achievement</label>
                <input
                  type="text"
                  id="achievement"
                  name="achievement"
                  value={formData.achievement}
                  onChange={handleInputChange}
                  placeholder="e.g. World Cup Champion"
                />
                {errors.achievement && <span className="error-text">{errors.achievement}</span>}
              </div>

              <button type="submit" className="submit-btn">Generate Card</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
