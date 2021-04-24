import React, { Component } from 'react'
import { Col } from 'react-bootstrap'
import axios from 'axios'
import { CATEGORY_URL } from '../utils/constant'
import { ListGroup } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUtensils,faCoffee, faCheese } from '@fortawesome/free-solid-svg-icons'

const Icon = ({ categoryName }) => {
    if (categoryName === "Makanan") return <FontAwesomeIcon icon={faUtensils} className="mr-2" />
    if (categoryName === "Minuman") return <FontAwesomeIcon icon={faCoffee} />
    if (categoryName === "Cemilan") return <FontAwesomeIcon icon={faCheese} className="mr-2" />
    
    return <FontAwesomeIcon icon={faUtensils} className="mr-2" />   
}
export default class Categories extends Component {
    constructor(props) {
        super(props)

        this.state = {
            categories: [],
        }
    }

    componentDidMount() {
        axios.get(CATEGORY_URL + "readAll")
            .then(res => {
                // console.log(res)
                const categories = res.data.data
                this.setState({ categories });
            })
            .catch(error => {
                console.log(error);
            })
    }
    render() {
        const { categories } = this.state;
        const { changeCategory, currentCategory } = this.props;

        return (
            <Col md={2} mt="2">
                <h4>Kategori Menu</h4>
                <hr />
                <ListGroup>
                    {categories && categories.map((category) => (
                        <ListGroup.Item
                            key={category.categoryId}
                            onClick={() => changeCategory(category.categoryId)} 
                            className ={currentCategory === category.categoryId && "category-active"} 
                            style={{cursor:'pointer'}}>
                            <h5>
                                <Icon categoryName={category.categoryName} /> {category.categoryName}
                            </h5>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </Col>
        );
    }
}
