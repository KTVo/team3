import React from 'react';
import {MDBInput} from 'mdbreact';
import {Button, Form, Modal, Container, Row, Col} from 'react-bootstrap';
import {MultiBrowsePic} from '../multiBrowsePic';
import Cards from 'react-credit-cards';
import 'mdbreact/dist/css/mdb.css';
import 'mdbreact/dist/css/style.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import 'react-credit-cards/lib/styles.scss';
import major_credit_card_pics from './payment_pics/major_credit_cards_pic.png';




export class Payment_Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isShown: false,
            name_on_card: '',
            credit_card_num: '',
            exp_date: '',
            cv_code: '',
            focus: ''
        };

        this.subtotal = 150.00;
        this.taxRate = 0.08;
        this.total = this.subtotal + this.subtotal*this.taxRate;
    }
    componentDidMount() {
        //Insert API into here

    }

    handleInputChange = (event) =>
    {
        this.setState(
            {
                [event.target.name]: event.target.value
            })

        console.log(this.state);

    }

    showModalHandle()
    {
        this.setState(
            {
                isShown: !this.state.isShown
            }
        )
        console.log("aaa "+ this.state.isShown);
    }

    handleInputFocus = (e) => {
        this.setState({ focus: e.target.name });
    }

    render()
    {
        return(
            <div>

                <Button onClick={()=>{this.showModalHandle()}}>
                    Payment
                </Button>

                <Modal show = {this.state.isShown}
                       size = {'xl'}
                >
                    <Modal.Header>
                        <h4>Enter Payment Info</h4>
                    </Modal.Header>
                    <Modal.Body>

                        <Row>
                            <Col>
                                <Container style={{width: "100%", padding: "0px", margin: "0px", border:"1px", borderColor: "black", borderStyle: "solid"}}>
                                <Row>
                                    <img style={{height: "auto", width: "100-px", margin:"auto"}} src={major_credit_card_pics} />
                                </Row>
                                    <Form className={'paymentForm'} onSubmit={this.handleSubmit} style={{width: "50%", margin: "auto"}}>
                                        <Container style={{margin: "auto", width: "100%"}}>
                                            <Row style={{width: "100%", margin: "auto"}}>
                                                <Row>
                                                    <Col style={{paddingRight: "0px", margin:"auto", border:"0px"}}>
                                                    </Col>
                                                    <Cards
                                                        cvc={this.state.cv_code}
                                                        expiry={this.state.exp_date}
                                                        focused={this.state.focus}
                                                        name={this.state.name_on_card}
                                                        number={this.state.credit_card_num}
                                                    />
                                                        <Col>
                                                            <MDBInput as={"input"}
                                                                      style={{align:"right", width: "100%", margin: "auto"}}
                                                                      label={"Name on Card"}
                                                                      icon={"fas fa-user"}
                                                                      name="name_on_card"
                                                                      onChange={this.handleInputChange}
                                                                      onFocus={this.handleInputFocus}
                                                                      required/>
                                                        </Col>
                                                </Row>

                                            </Row>
                                            <Row style={{width: "50%", margin: "auto"}}>

                                                    <MDBInput as={"input"}
                                                              className="far fa-credit-card"
                                                              label={"Card Number"}
                                                              name="credit_card_num"
                                                              icon = "far fa-credit-card"
                                                              onChange={this.handleInputChange}
                                                              onFocus={this.handleInputFocus}
                                                              required/>
                                            </Row>
                                            <Row>
                                                <Row style={{width: "50%", margin: "auto"}}>

                                                    <MDBInput as={"input"}
                                                              label={"Expiration Date"}
                                                              name="exp_date"
                                                              prepend = "credit-card"
                                                              onChange={this.handleInputChange}
                                                              onFocus={this.handleInputFocus}
                                                              required/>

                                                </Row>
                                                <Row style={{paddingLeft:"50px"}}>

                                                    <MDBInput as={"input"}
                                                              label={"CV Code"}
                                                              name="cv_code"
                                                              prepend = "credit-card"
                                                              onChange={this.handleInputChange}
                                                              onFocus={this.handleInputFocus}
                                                              required/>

                                                </Row>
                                            </Row>
                                            <Button name="submit" style={{display:"inline"}} onClick={this.handleInputChange}>Submit</Button>
                                        </Container>


                                        </Form>
                                    </Container>
                                </Col>
                                <Col>
                                    <Container style={{padding: "0px", margin: "0px", border:"1px", width:"500px", borderColor: "black", borderStyle: "solid"}}>


                                        <h4 style={{paddingLeft: '10px'}}>Description:</h4>

                                        <Row style={{paddingRight:'0px', margin: 'auto', borderRight:'0px'}}>
                                            <Col>
                                                <h6 style={{paddingLeft: '30px'}}>Diagnosis Fee</h6>
                                            </Col>
                                            <Col>
                                                ${this.subtotal.toFixed(2)}
                                            </Col>
                                            <Col style={{paddingTop: "400px"}}>
                                                <h6>Subtotal: ${this.subtotal.toFixed(2)}</h6>
                                                <h6>Tax: ${(this.taxRate * this.subtotal).toFixed(2)}</h6>
                                                <h5>Total: ${this.total.toFixed(2)}</h5>
                                            </Col>
                                        </Row>
                                    </Container>
                                </Col>
                            </Row>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={()=>{this.showModalHandle()}}>
                            Cancel Payment
                        </Button>
                    </Modal.Footer>
                </Modal>

                <MultiBrowsePic />

            </div>
        )
    }
}