import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const BACKEND = "http://localhost:5000"; // Replace with your EC2 IP

function Menu() {
  const [pages, setPages] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showNewOptions, setShowNewOptions] = useState(false);
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [customName, setCustomName] = useState('');
  const timeoutRef = useRef(null);
  const navigate = useNavigate();

  const startCloseTimer = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setShowDropdown(false);
      setShowNewOptions(false);
      setShowCustomInput(false);
      setCustomName('');
    }, 300);
  };

  const clearCloseTimer = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  const fetchPages = () => {
    axios.get(`${BACKEND}/pages`).then(res => setPages(res.data));
  };

  useEffect(() => {
    fetchPages();
  }, []);

  const createPage = (name) => {
    navigate(`/${name}`);
  };

  const deletePage = (name) => {
    axios.delete(`${BACKEND}/page/${name}`).then(() => fetchPages());
  };

  return (
    <div className="menu-container">
      <div 
        className="menu-btn" 
        onMouseEnter={() => {
          clearCloseTimer();
          setShowDropdown(true);
        }}
        onClick={() => setShowDropdown(!showDropdown)}>☰</div>
      {showDropdown && (
        <div 
          className="dropdown"
          onMouseEnter={clearCloseTimer}
          onMouseLeave={startCloseTimer}>
          {pages.map(p => (
            <div className="note-item" key={p}>
              <div className="domain-box" onClick={() => navigate(`/${p}`)}>{p}</div>
              <button onClick={() => deletePage(p)}>❌</button>
            </div>
          ))}
          <div className="create-new" onClick={() => setShowNewOptions(!showNewOptions)}>+ Create New</div>

          {showNewOptions && (
            <div className="new-options">
              <div className="option blue" onClick={() => createPage(Math.random().toString(36).substring(2, 8))}>
                ➕ Random Domain
              </div>
              <div className="option green" onClick={() => setShowCustomInput(!showCustomInput)}>
                📝 Custom Domain
              </div>
              {showCustomInput && (
                <input
                  className="custom-domain-input"
                  placeholder="Enter custom domain"
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      createPage(customName.trim());
                      setCustomName('');
                      setShowCustomInput(false);
                      setShowNewOptions(false);
                    }
                  }}
                />
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Menu;
