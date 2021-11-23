import React from "react";

import '../styles/comment.css'

function ProductComment({ commentContent }) {
  console.log(typeof(commentContent.datetime))

  return (
    <div className="comment">
      <div className="info">
        <p>{commentContent.author}</p>
        <p>{new Date(commentContent.datetime).toLocaleString('en-US')}</p>
      </div>
      <div className="text">
        <p>{commentContent.description}</p>
      </div>
    </div>
  );
}

export default ProductComment;
