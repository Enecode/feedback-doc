import React, { useState } from 'react';
import "./custom.css"

const Feedback = () => {
  const [feedback, setFeedback] = useState(null);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleFeedback = (value) => {
    setFeedback(value);
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = () => {
    // feedback data to backend with api or handle it here (optional)
    console.log({
      feedback,
      comment,
    });
    setSubmitted(true);
  };

  if (submitted) {
    return <p>Thank you for your feedback!</p>;
  }

  return (
    <div className="feedback">
      <h3>Was this page helpful?</h3>
      <button onClick={() => handleFeedback('up')}>👍</button>
      <button onClick={() => handleFeedback('down')}>👎</button>

      {feedback && (
        <div className="comment-box">
          <textarea
            value={comment}
            onChange={handleCommentChange}
            placeholder="Leave a comment..."
            rows="4"
          />
          <button onClick={handleSubmit}>Submit</button>
        </div>
      )}
    </div>
  );
};

export default Feedback;
