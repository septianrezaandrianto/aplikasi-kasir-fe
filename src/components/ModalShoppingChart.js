import {  faMinus, faPlus, faSave, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import { Modal, Button, Form } from 'react-bootstrap';
import { numberWithCommas } from '../utils/util';

const ModalShoppingChart = ({ showModal, handleClose, shoppingChartDetail, totalOrder}) => {

    if (shoppingChartDetail) {
        return (
            <Modal show={showModal} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {shoppingChartDetail.product.productName} {" - "}
                        <strong>Rp. {numberWithCommas(shoppingChartDetail.product.productPrice)}</strong>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="exampleForm.ControlInput1">
                            <Form.Label>Total Harga :</Form.Label>
                            <p>
                                <strong>Rp. {numberWithCommas(shoppingChartDetail.price)}</strong>
                            </p>
                        </Form.Group>
                        <Form.Group controlId="exampleForm.ControlInput1">
                            <Form.Label>Jumlah :</Form.Label>
                            <br />
                            <Button variant="success" size="sm" className="mr-2">
                                <FontAwesomeIcon icon={faMinus} />
                            </Button>
                            <strong>{totalOrder}</strong>
                            <Button variant="success" size="sm" className="ml-2">
                                <FontAwesomeIcon icon={faPlus} />
                            </Button>
                        </Form.Group>
                        <Form.Group controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Keterangan :</Form.Label>
                            <Form.Control as="textarea" rows={3} name="note" placeholder="Contoh : kuah jangan terlalu asin" />
                        </Form.Group>
                        <Button variant ="success" type="submit">
                            <FontAwesomeIcon icon={faSave}/>Simpan
                        </Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" >
                        <FontAwesomeIcon icon={faTrash}/>Hapus Pesanan
                    </Button>                    
                </Modal.Footer>
            </Modal>
        )
    }
    else {
        <Modal show={showModal} onHide={handleClose} animation={false}>
            <Modal.Header closeButton>
                <Modal.Title> Kosong </Modal.Title>
            </Modal.Header>
            <Modal.Body>Kosong</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
            </Button>
                <Button variant="primary" onClick={handleClose}>
                    Save Changes
            </Button>
            </Modal.Footer>
        </Modal>
    }
}

export default ModalShoppingChart
