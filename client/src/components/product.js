import React from 'react';
import Product from './list';
import '../styles/products.css';
import logout from '../assets/logout.svg';
import axios from 'axios';

class Products extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: "",
            price: "",
            products: []
        }


        this.addProduct = this.addProduct.bind(this);
        this.handleChanges = this.handleChanges.bind(this);
        this.deleteProduct = this.deleteProduct.bind(this);

    }

    //get products
    componentDidMount() {

        axios
            .get(`/api/products/`)
            .then(res => res.data)
            .then(product => this.setState({ products: product.data }))
            .catch(err => console.log(err));

    }

    handleChanges = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    //add product
    addProduct = (e) => {
        e.preventDefault();
        const { name, price } = this.state;
        if (name && price) {
            axios
                .post(`/api/products/`, { name, price })
                .then(res => res.data)
                .then(data => {
                    this.setState({ name: "", price: "", products: [...this.state.products, data.data] });
                })
                .catch(err => console.log(err));
        }

    }

    //delete product
    deleteProduct = (id) => {

        axios
            .delete(`/api/products/${id}`)
            .then(res => res.data)
            .then(data => {
                const id = data.data;
                const index = this.state.products.findIndex(product => product._id === id);
                let newProducts = this.state.products;
                newProducts.splice(index, 1);
                this.setState({products:[...newProducts]})
                newProducts = [];
            })
            .catch(err => console.log(err));
    }


    render() {

        return (<div className="main">
            <header>
                <h2>XYZ Products</h2>
                <img src={logout} alt="logout" onClick={this.props.logout}/>
            </header>
            <h3>Products</h3>
            <ul className="products">
                {this.state.products.map((product, i) => (<Product key={i} details={product} deleteProduct={this.deleteProduct} />))}
            </ul>
            <form onSubmit={this.addProduct}>
                <input
                    name="name"
                    onChange={this.handleChanges}
                    value={this.state.name}
                    placeholder="Product Name"
                />
                <input
                    name="price"
                    onChange={this.handleChanges}
                    value={this.state.price}
                    placeholder="Product Price"
                />
                <button>Add</button>
            </form>
        </div>);
    }
}

export default Products;