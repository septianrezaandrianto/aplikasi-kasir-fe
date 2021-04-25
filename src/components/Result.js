import React, { Component } from 'react'
import { Col, ListGroup, Row, Badge } from 'react-bootstrap';
import { numberWithCommas } from '../utils/util'
import ModalShoppingChart from './ModalShoppingChart';
import PayTotal from './PayTotal';

class Result extends Component {
    constructor(props) {
        super(props)

        this.state = {
            showModal: false,
            shoppingChartDetail: false,
            totalOrder: 0,
            notes: '',
        }
    }

    handleShow = (shoppingChart) => {
        this.setState({
            showModal: true,
            shoppingChartDetail: shoppingChart,
            totalOrder: shoppingChart.total,

        })
    }

    handleClose = () => {
        this.setState({
            showModal: false
        })
    }


    render() {
        const { shoppingCharts } = this.props
        return (
            <Col md={3} mt="2">
                <h4>Keranjang Belanja</h4>
                <hr />

                {shoppingCharts.length !== 0 && (
                    <ListGroup variant="flush">
                        {shoppingCharts.map((shoppingChart) => (
                            <ListGroup.Item key={shoppingChart.shoppingChartId}
                                onClick={() => this.handleShow(shoppingChart)}>
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
                                        <strong className="float-right">Rp. {numberWithCommas(shoppingChart.price)}</strong>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        ))}
                        {/* <ModalShoppingChart handleClose={this.handleClose} {...this.state}/>                         */}
                    </ListGroup>
                )}

                <PayTotal shoppingCharts={shoppingCharts} {...this.props} />
            </Col>
        );
    }
}
export default Result;