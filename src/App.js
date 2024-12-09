import React, { useState } from 'react';
import Register from './components/Register';
import Login from './components/Login';
import Search from './components/Search';
import './styles.css';

function App() {
  const [token, setToken] = useState(null);

  const handleLogin = (newToken) => {
    setToken(newToken);
  };

  return (
    <div className="App">
      <h1>Bootleg Spotify</h1>
      {!token ? (
        <>
          <Register onLogin={handleLogin} />
          <Login onLogin={handleLogin} />
        </>
      ) : (
        <Search token={token} />
      )}
    </div>
  );
}

export default App;