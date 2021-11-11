import React from 'react';

const Item = ({product, handleRemove}) => {
    const { _id, title, price, quantity } = product;
    return (
        <div>
            <div style={{border: '2px solid red'}}>
                <h4 className="product-name">{title}</h4>
                <p>Price: {price}</p>
                <p>Quantity: {quantity}</p>
                <button onClick={() => handleRemove(_id)} className="btn-regular">Remove</button>
            </div>
        </div>
    );
};

export default Item;