import React, { useState } from 'react';
import axios from 'axios';

const Feedback = () => {
  const [feedback, setFeedback] = useState(null);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);
  const [validationError, setValidationError] = useState(null);

  const binId = 'pste here';
  const apiKey = `pst here `

  const handleFeedback = (value) => setFeedback(value);
  const handleCommentChange = (event) => setComment(event.target.value);

  function validateComment() {
    if (!comment.trim() && comment.length > 0) {
      setValidationError('Comment cannot be empty or contain only whitespace.');
      return false;
    }
    if (comment.length > 0 && comment.length < 5) {
      setValidationError('Comment must be at least 5 characters.');
      return false;
    }
    setValidationError(null);
    return true;
  };

  const validateFeedback = (feedback) => {
    if (!['up', 'down'].includes(feedback)) {
      setError('Invalid feedback choice. Please select thumbs up or down.');
      return false;
    }
    setError(null);
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateFeedback(feedback) && validateComment()) {
      try {
        const response = await axios.put(`https://api.jsonbin.io/v3/b/${binId}/meta/privacy`, {
          // feedback,
          // comment: comment.trim(), // Remove leading/trailing whitespace
          // timestamp: new Date().toISOString(),
        }, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'X-Master-Key': apiKey,
            'X-Bin-Private': 'true',
          },
        });
        console.log(response.data);
        setSubmitted(true);
      } catch (error) {
        setError('Failed to submit feedback. Please try again.');
      }
    }
  };

  return (
    <div>
      <h3>Was this page helpful?</h3>
      <button onClick={() => handleFeedback('up')}>👍</button>
      <button onClick={() => handleFeedback('down')}>👎</button>
      {feedback && (
        <div>
          <textarea
            value={comment}
            onChange={handleCommentChange}
            placeholder="Leave a comment (optional)..."
            rows={4}
          />
          {validationError && (
            <p style={{ color: 'red' }}>{validationError}</p>
          )}
          <button onClick={handleSubmit}>Submit</button>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          {submitted && <p>Thank you for your feedback!</p>}
        </div>
      )}
    </div>
  );
};

export default Feedback;