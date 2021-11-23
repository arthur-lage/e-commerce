import React from "react";

function Star({ star }) {
  return (
    <div>
      {star === 0 ? <i className="far fa-star"></i> : ""}
      {star === 1 ? <i className="fas fa-star-half-alt"></i> : ""}
      {star === 2 ? <i className="fas fa-star"></i> : ""}
    </div>
  );
}

export default Star;
