import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from 'react'
import { Col, Row, Button } from 'react-bootstrap'
import { numberWithCommas } from '../utils/util'
import { ORDER_URL} from '../utils/constant'
import axios from 'axios'

export default class PayTotal extends Component {

    submitPayTotal =(totalPay)=> {
        const order = {
            total : totalPay,
            orderProduct : this.props.shoppingCharts 
        }

        axios.post(ORDER_URL + "create" , order)
        .then((res) => {
            console.log("Order ", res.data.data);
            this.props.history.push('/success')
        })
        .catch((error) => {
            console.log("Order error", error);
        })
    }

    render() {
            const payTotal = this.props.shoppingCharts.reduce(function(result, item){
                return result + item.price;
            }, 0); 
        return (
            <div className="fixed-bottom">
                <Row>
                    <Col md={{span:3, offset:9}} className="px-4">
                    <h4>Total Harga : Rp. <strong className="float-right mr-2">{numberWithCommas(payTotal)}</strong></h4>
                    <Button 
                    variant="success" 
                    block 
                    className="mb-2 mt-4 mr-2" 
                    size="lg"
                    onClick= {() => this.submitPayTotal(payTotal)} >
                        <FontAwesomeIcon icon={faShoppingCart}/> <strong>BAYAR</strong>
                    </Button>
                    </Col>
                </Row>                
            </div>
        )
    }
}
