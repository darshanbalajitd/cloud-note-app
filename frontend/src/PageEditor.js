import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Menu from './Menu';

const BACKEND = "http://localhost:5000/"; // Replace with your IP

function PageEditor() {
  const { pageName } = useParams();
  const [text, setText] = useState("");
  const [saved, setSaved] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    axios.get(`${BACKEND}/page/${pageName}`)
      .then(res => {
        const joined = res.data.map(n => n.content).join("\n");
        setText(joined);
      });
  }, [pageName]);

  const handleChange = (e) => {
    setText(e.target.value);
    clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      axios.post(`${BACKEND}/page/${pageName}`, { content: e.target.value }).then(() => {
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
      });
    }, 1000);
  };

  return (
    <div className="editor-container">
      <Menu />
      <h1 className="header">Cloud Notes: <span>{pageName}</span></h1>
      {saved && <div className="autosave-popup">✓ Autosaved</div>}
      <textarea
        value={text}
        onChange={handleChange}
        placeholder="Start typing your note..."
      />
    </div>
  );
}

export default PageEditor;
