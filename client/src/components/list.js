import React from 'react';

import deleteIcon from '../assets/delete.svg';
import product from '../assets/product.jpg';

function Product(props) {

  /*props.deleteProduct(id)*/

    return (<li className="product" data-id={props.details._id}>
        <img alt="product" src={product}/>
        <div className="detail">
            <span className="product-name">{props.details.name}</span>
            <span className="price">&#x20B9; {props.details.price}</span>
        </div>
        <div className="UD" id={product._id}>
            <img alt="delete" src={deleteIcon} onClick={()=>props.deleteProduct(props.details._id)} />
        </div>
    </li>)
}

export default Product;