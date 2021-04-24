import React, { Component } from 'react'
import { Col, ListGroup, Row, Badge } from 'react-bootstrap';
import { numberWithCommas } from '../utils/util'

class Result extends Component {
    render() {
        const { shoppingCharts } = this.props
        return (
            <Col md={3} mt="2">
                <h4>Keranjang Belanja</h4>
                <hr />

                {shoppingCharts.length !== 0 && (
                    <ListGroup variant="flush">
                        {shoppingCharts.map((shoppingChart) => (
                            <ListGroup.Item>
                                <Row>
                                    <Col xs="2">
                                        <Badge pill variant="success" >
                                            {shoppingChart.total}
                                        </Badge>
                                    </Col>
                                    <Col>
                                        <h5>{shoppingChart.product.productName}</h5>
                                        <p>Rp. {numberWithCommas(shoppingChart.product.productPrice)}</p>
                                    </Col>
                                    <Col>
                                        <strong className = "float-right">Rp. {numberWithCommas(shoppingChart.price)}</strong>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                )}
            </Col>
        );
    }
}
export default Result;