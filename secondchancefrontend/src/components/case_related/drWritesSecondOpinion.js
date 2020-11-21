import React from 'react';
import {Button, Form, Container, Row, Col, Modal} from 'react-bootstrap';
import {MDBInput} from 'mdbreact';
import '../../css/modalLarge.css';


export class DrWritesSecondOpinion extends React.Component
{
    constructor(props) {
        super(props);

        this.state =
            {
                secondDiagnosisMessage: '',
                parsedJSON: [],
                show: true

            };

        this.correctCase = [];

    }

    componentDidMount() {
        //Convert these to props later
        let doctorID = 1;
        let allCaseInfo = [];
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({"phy_id": this.props.phy_id})
        };

        fetch("http://52.247.220.137:80/get_all_physician_records",requestOptions)
            .then(response => response.json())
            .then(json => {
                for(let i = 0; i < json.length; i++)
                {

                    if(this.props.phy_id == json[i].phy_id)
                    {
                        allCaseInfo = json[i];
                        i = json.length;
                    }
                }
                this.setState(
                    {
                        parsedJSON: allCaseInfo
                    }
                )
            });
    }

    OpenCloseModalHandler()
    {
        this.setState(
            {
                show: this.props.showAssessmentPageModal
            }
        )
    }



    handleInputChange = (event) =>
    {
        this.setState(
            {

                [event.target.name]: event.target.value
            })

    }

    SelectTitle()
    {
        /*
        if(this.props.data.userMode === 'Doctor')
        {
            return(<Form.Label><u className={"display-4"}>Case Diagnosis</u></Form.Label>);
        }
        else
        {
            return(<Form.Label><u className={"display-4"}>Case Review</u></Form.Label>);
        }
        */

    }




    showDrEditView = () =>
    {
        return(
            <Container style={{width:"50%", margin:"auto"}}>
                <Form className={'loginForm'} onSubmit={this.handleSubmit}>
                    {this.SelectTitle()}
                    <br />

                    <Container style={{width: "50%", margin:"auto"}}>
                        <Form.Label>
                            <Row>
                                <Col  style={{width: "50%", margin:"auto", border: "1px", padding:"25px", borderStyle: "solid", borderColor: "black"}}>
                                    <h3 style={{padding: "2px"}}>Fill in Second Diagnosis</h3>
                                    <Row style={{padding:"5px"}}>Patient Name: {this.state.parsedJSON.pat_name}</Row>
                                    <Row style={{padding:"5px"}}>Patient Sex: {this.state.parsedJSON.pat_sex}</Row>
                                    <Row style={{padding:"5px"}}>Patient Age: {this.state.parsedJSON.pat_age}</Row>
                                    <Row style={{padding:"5px"}}>Patient Email: {this.state.parsedJSON.email}</Row>
                                    <Row style={{padding:"5px"}}>Record ID: {this.state.parsedJSON.record_id}</Row>
                                    <br />
                                    Patient Medical History:
                                    <Container>
                                        <Row style={{border: "2px", padding:"25px", borderStyle: "solid", borderColor: "black"}}>
                                            {this.state.parsedJSON.pat_medical_history}</Row>
                                    </Container>
                                    <br />
                                    Primary Diagnosis:
                                    <Container>
                                        <Row style={{border: "2px", padding:"25px", borderStyle: "solid", borderColor: "black"}}>
                                            {this.state.parsedJSON.comment}</Row>
                                    </Container>
                                </Col>
                            </Row>
                        </Form.Label>
                    </Container>

                    <MDBInput  type={"textarea"}
                               name="secondDiagnosisMessage"
                               label={"Enter Second Diagnosis Here"}
                               value={this.state.secondDiagnosisMessage}
                               onChange={this.handleInputChange}
                               rows={10}
                               cols={100}
                               required/>


                    <br />


                    <Button type="button" onClick={()=>this.handleSubmit()}>Submit</Button>
                </Form>
            </Container>
        );
    }


    handleSubmit()
    {

        //Submit to the backend the assessment and mark status as complete

        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({"record_assessment_id": this.props.recordID, "assessment": this.state.secondDiagnosisMessage,
                "status": "Complete"})
        };

        fetch("http://52.247.220.137:80/update_pending_records", requestOptions)
            .then(response=>response.text()).then(text => console.log(text))
            .then(() => this.props.reload_tables());


    }

    render() {

        return(
            <div>

                <Modal show ={this.state.show}  dialogClassName="modal-xl" role="document"
                    >
                    <Modal.Header>Case Assessment</Modal.Header>
                    <Modal.Body>

                        {this.showDrEditView()}

                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.props.ShowAssessmentPageModalHandle}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>


        );
    }

}