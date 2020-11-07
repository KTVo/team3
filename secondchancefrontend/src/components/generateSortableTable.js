import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search, columnToggle } from 'react-bootstrap-table2-toolkit';
import {Button, Container, Modal} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
const {SearchBar} = Search;

export class GenerateSortableTable extends React.Component
{

    constructor(props) {
        super(props);
        this.state = {
            parsedJSONObj: [], //this array will have everything parsedJSONObj and will include a url to caseID and cancel buttons
            error: null,
            showModal: false
        };

    }





    handleModal(status)
    {
        console.log("I am the handleModal function")
        this.setState({
            showModal: status
        })

    }

    CloseModalHandle()
    {
        //Closes the modal
        this.handleModal(false);
        //Refreshes Page
        window.location.reload(false);

    }

    CaseCancellationHandle(record_assessment_id, assessment, status)
    {


        //send to backend this.state.parsedJSONObj.record_id for deletion
        console.log("MF DELETE");
        //Call in fetch to delete case with id
        console.log("Testing_update_pending_records PUT");

        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({"record_assessment_id": 1, "assessment": 1, "status": "Complete"})
        };

        fetch("http://52.247.220.137:80/update_pending_records", requestOptions)
            .then(response=>response.text()).then(text => console.log(text));
        //Close Modal

        //Refreshes page
        window.location.reload(false);

    }


    ConfirmCancelButtonHandle(record_assessment_id, assessment, status)
    {
        console.log("I am the ConfirmCancelButtonHandle function");
        //Ask user to confirm
        return(
            <div>

                <Modal show = {this.state.showModal}
                       size = {'xl'}
                >
                    <Modal.Header>
                        Are you sure you want to delete this case?

                    </Modal.Header>
                    <Modal.Body>
                        <Button onClick={()=>{this.CaseCancellationHandle()}}>Yes</Button>
                        <Button onClick={()=>{this.CloseModalHandle()}}>No</Button>

                    </Modal.Body>
                    <Modal.Footer>

                    </Modal.Footer>
                </Modal>
            </div>
        )

    }

    componentDidMount() {

        console.log("Testing get_all_patient_records POST from Client Ongoing Table");


        fetch(this.props.incomingData.URL_for_Fetch, this.props.incomingData.requestOptions)
            .then(res => res.json())
            .then(
                (result) => {
                    let l = result.length;
                    for (let i = 0; i < l; i++){
                        result[i].cancelButton = <Button onClick={()=>{
                            this.handleModal(true, i)
                        }}>Cancel</Button>
                    }
                    this.setState({
                        parsedJSONObj: result
                    })
                },

                (error) => {
                    console.log("Error with JSON retrieval for Client Ongoing Case Table.");
                    console.log(error.data);

                }
            );


    }



    RunME(){
        console.log("GIVE IT TO0");
        this.state.parsedJSONObj.map((variableName,index) => { console.log(variableName.assessment) });

        //this.InsertData();
    }

    appendCancelButtonToArrayHandle(id)
    {
        //Send a request to backend to cancel case with id
        console.log("I am canceling Case# " + id);

        this.state.parsedJSONObj.map((eachElement) =>
            {
                this.setState({
                    //improvedArray.wf: eachElement.assessment;
                })
            }
        )
    }

    AppendButtonsToArray()
    {
        console.log("I am the AppendButtonsToArray")
        this.state.parsedJSONObj.map((eachEntry, index) =>
        {
            this.state.parsedJSONObj.push( "hello" )
        })
    }


    render() {
        return (
            <div>
                {this.AppendButtonsToArray()}
                {this.ConfirmCancelButtonHandle()}
                <Container>
                    <ToolkitProvider
                        keyField="id"
                        data={ this.state.parsedJSONObj }
                        columns={ this.props.incomingData.columns }
                        defaultSorted={ this.props.incomingData.defaultSorted }
                        columnToggle
                        search
                    >
                        {
                            props => (
                                <div>
                                    <h3>Input something at below input field:</h3>
                                    <SearchBar { ...props.searchProps } />
                                    <hr />
                                    <BootstrapTable
                                        { ...props.baseProps }
                                    />
                                </div>
                            )
                        }
                    </ToolkitProvider>
                </Container>

            </div>
        );
    }
}