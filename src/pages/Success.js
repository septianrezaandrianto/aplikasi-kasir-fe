import { Button, Image } from 'react-bootstrap'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import {SHOPPING_CHART_URL} from '../utils/constant'

export default class Success extends Component {

    componentDidMount() {
        axios.get(SHOPPING_CHART_URL+ "readAll")
        .then((res) => {
            const shoppingCharts = res.data.data;
            shoppingCharts.map(function(item){
                return axios.delete(SHOPPING_CHART_URL + "delete?shoppingChartId=" + item.shoppingChartId)
                .then((res) => {
                    console.log(res)
                })
                .catch((error) => {
                    console.log(error)
                })
            });
        })
        .catch((error) =>{
            console.log("error ya ", error);
        })
    }
    render() {
        return (
            <div className="mt-4 text-center">
                <Image src="images/success.png" width="500" />
                <h2>Sukses Pesan</h2>
                <p>Terima kasih sudah memesan</p>
                <Button variant="success" as={Link} to="/">
                    Kembali
                </Button>
            </div>
        )
    }
}
