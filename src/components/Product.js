import React from 'react'

function Product({ product }) {
    return (
        <div>
            <h1>{product.name}</h1>
            <h2>{product.price}</h2>
            <h3>{product.description}</h3>
        </div>
    )
}

export default Product
