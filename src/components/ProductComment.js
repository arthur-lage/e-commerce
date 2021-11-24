import React from "react";

import "../styles/comment.css";

import Star from "../components/Star";

function ProductComment({ commentContent }) {
  let ratingText = 0

  for (let i = 0; i < commentContent.commentRating.length; i++) {
    if (commentContent.commentRating[i] === 0) {
      ratingText += 0;
    }
    if (commentContent.commentRating[i] === 1) {
      ratingText += 0.5;
    }
    if (commentContent.commentRating[i] === 2) {
      ratingText += 1;
    }
  }

  return (
    <div className="comment">
      <div className="info">
        <div className="authorAndRating">
          <div className="author">
            <p>{commentContent.author}</p>
          </div>
          <div className="rating">
            {commentContent.commentRating.map((star, key) => (
              <Star key={key} star={star} />
            ))}
            <div className="ratingText">
              {Number.isInteger(ratingText) ? ratingText + ".0" : ratingText}
            </div>
          </div>
        </div>
        <p>{new Date(commentContent.datetime).toLocaleString("en-US")}</p>
      </div>
      <div className="text">
        <p>{commentContent.description}</p>
      </div>
    </div>
  );
}

export default ProductComment;
