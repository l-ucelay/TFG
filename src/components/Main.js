import React, { Component } from 'react';
class Main extends Component {
  render() {
    return (
      <div id="content">
        <h1>Añadir Inmueble</h1>
        <form onSubmit={(event) => {
          event.preventDefault()
          const name = this.productName.value
          const caracteristics = this.productCaracteristics.value
          const price = window.web3.utils.toWei(this.productPrice.value.toString(), 'Ether')
          this.props.createProduct(name, caracteristics, price)
        }}>
          <div className="form-group mr-sm-2">
            <input
              id="productName"
              type="text"
              ref={(input) => { this.productName = input }}
              className="form-control"
              placeholder="Dirección"
              required />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="productCaracteristics"
              type="text"
              ref={(input) => { this.productCaracteristics = input }}
              className="form-control"
              placeholder="Caracteristicas"
              required />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="productPrice"
              type="text"
              ref={(input) => { this.productPrice = input }}
              className="form-control"
              placeholder="Precio"
              required />
          </div>
          <button type="submit" className="btn btn-primary">Add Product</button>
        </form>
        <p> </p>
        <h2>Comprar Inmueble</h2>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Dirección</th>
              <th scope="col">Caracteristicas</th>
              <th scope="col">Precio</th>
              <th scope="col">Propietario</th>
              <th scope="col"></th>
            </tr>
          </thead>
          { this.props.products.map((product, key) => {
  return(
    <tr key={key}>
      <th scope="row">{product.id.toString()}</th>
      <td>{product.name}</td>
      <td>{product.carac}</td>
      <td>{window.web3.utils.fromWei(product.price.toString(), 'Ether')} Eth</td>
      <td>{product.owner}</td>
      <td>
        { !product.purchased
          ? <button
              name={product.id}
              value={product.price}
              onClick={(event) => {
                this.props.purchaseProduct(event.target.name, event.target.value)
              }}
            >
              Buy
            </button>
          : null
        }
        </td>
    </tr>
  )
})}
        </table>
      </div>
    );
  }
}
export default Main;