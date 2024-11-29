import React from 'react';

const Card = (props) => {
    return (
      <div className="w-100 rounded overflow-hidden shadow-lg">
        {props.children}
      </div>
    );
};
  

export default Card;