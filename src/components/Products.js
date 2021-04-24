import React from 'react'
import { Col, Card } from 'react-bootstrap'
import { numberWithCommas } from '../utils/util'


const Products = ({ product, insertShoppingChart }) => {
    return (
        <Col md={6} xs={6} className="mb-4">
            <Card className="shadow"  
                onClick={() => insertShoppingChart(product)}>
                <Card.Img
                    variant="top"
                    src={"images/" +
                        product.category.categoryName.toLowerCase() + "/" +
                        product.productPhoto} />
                <Card.Body>
                    <Card.Title>{product.productName} <strong>{product.productCode}</strong></Card.Title>
                    <Card.Text>
                        Rp. {numberWithCommas(product.productPrice)}
                    </Card.Text>
                </Card.Body>
            </Card>
        </Col>
    )
}

export default Products
