import React, { useState, useEffect } from 'react';
import { backend } from 'declarations/backend';

const App: React.FC = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const [errorCount, setErrorCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchErrorMessages = async () => {
    setLoading(true);
    try {
      const messages = await backend.getErrorMessages();
      setErrorMessages(messages);
      const count = await backend.getErrorCount();
      setErrorCount(Number(count));
    } catch (error) {
      console.error('Error fetching error messages:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchErrorMessages();
  }, []);

  const handleAddError = async () => {
    if (errorMessage.trim()) {
      setLoading(true);
      try {
        await backend.addErrorMessage(errorMessage);
        setErrorMessage('');
        await fetchErrorMessages();
      } catch (error) {
        console.error('Error adding error message:', error);
      }
      setLoading(false);
    }
  };

  const handleClearErrors = async () => {
    setLoading(true);
    try {
      await backend.clearErrorMessages();
      await fetchErrorMessages();
    } catch (error) {
      console.error('Error clearing error messages:', error);
    }
    setLoading(false);
  };

  return (
    <div className="container">
      <h1 className="header">Error Logger</h1>
      <div className="input-group">
        <input
          type="text"
          value={errorMessage}
          onChange={(e) => setErrorMessage(e.target.value)}
          placeholder="Enter error message"
          className="input"
        />
        <button onClick={handleAddError} className="button ml-2" disabled={loading}>
          {loading ? 'Adding...' : 'Add Error'}
        </button>
      </div>
      <button onClick={handleClearErrors} className="button" disabled={loading}>
        {loading ? 'Clearing...' : 'Clear All Errors'}
      </button>
      <div className="error-list">
        <p className="error-count">Total Errors: {errorCount}</p>
        {errorMessages.map((msg, index) => (
          <div key={index} className="error-item">
            {msg}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;