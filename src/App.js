import './App.css';
import React, { Component } from 'react';
import { Result, Categories, NavbarComponent, Products } from './components';
import { Col, Container, Row } from 'react-bootstrap';
import { PRODUCT_URL, SHOPPING_CHART_URL } from './utils/constant.js';
import axios from 'axios';
import swal from 'sweetalert'

export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      products: [],
      currentCategory: 3,
      shoppingCharts: []
    }
  }

  readAllCategory(value) {
    axios.get(PRODUCT_URL + "readAll?categoryId=" + value)
      .then(res => {
        // console.log("response: ", res)
        const products = res.data.data
        this.setState({ products });
      })
      .catch(error => {
        console.log("kategori ", error);
      })
  }

  readAllShoppingChart() {
    axios.get(SHOPPING_CHART_URL + "readAll")
      .then(res => {
        const shoppingCharts = res.data.data
        this.setState({shoppingCharts});
      })
      .catch(error => {
        console.log("keranjang ", error);
      })
  }

  componentDidMount() {
    this.readAllCategory(this.state.currentCategory);
    this.readAllShoppingChart();
  }

  componentDidUpdate(prevState) {
    if(this.state.shoppingCharts !== prevState.shoppingCharts) {
      this.readAllShoppingChart();
    }
  }

  insertShoppingChart(value) {
    axios.get(SHOPPING_CHART_URL + "read?productId=" + value.productId)
      .then(res => {
        console.log("mana datanya? ", res.data.data)
        if (res.data.data === null) {
          const shoppingChart = {
            total: 1,
            price: value.productPrice,
            product: value
          }

          axios.post(SHOPPING_CHART_URL + "create", shoppingChart)
            .then(res => {
              swal({
                title: "Sukses",
                text: "Masuk ke keranjang belanja " + shoppingChart.product.productName,
                icon: "success",
                button: false,
                timer: 1000
              });
            })
            .catch(error => {
              console.log(error);
            })
        }
        else {
          const shoppingChart = {
            total: res.data.data.total + 1,
            price: res.data.data.price + value.productPrice,
            product: value
          }

          axios.put(SHOPPING_CHART_URL + "update/" + res.data.data.shoppingChartId, shoppingChart)
            .then(res => {
              swal({
                title: "Sukses",
                text: "Masuk ke keranjang belanja " + shoppingChart.product.productName,
                icon: "success",
                button: false,
                timer: 1000,
              });
            })
            .catch(error => {
              console.log(error);
            })
        }
      })
      .catch((error) => {
        console.log("Error ", error);
      })
  }

  changeCategory = (value) => {
    this.setState({
      currentCategory: value,
      products: [],
    })

    this.readAllCategory(value);
  }

  render() {
    //  console.log("product: ", this.state.products);
    const { products, currentCategory, shoppingCharts } = this.state

    return (
      <div>
        <NavbarComponent />
        <div className="mt-3">
          <Container fluid>
            <Row>
              <Categories changeCategory={this.changeCategory} currentCategory={currentCategory} />
              <Col>
                <h4>Daftar Menu</h4>
                <hr />
                <Row>
                  {products && products.map((product) => (
                    <Products
                      key={product.productId}
                      product={product}
                      insertShoppingChart={this.insertShoppingChart}
                    />
                  ))}
                </Row>
              </Col>
              <Result shoppingCharts={shoppingCharts} />
            </Row>
          </Container>
        </div>
      </div>
    )
  }
}
