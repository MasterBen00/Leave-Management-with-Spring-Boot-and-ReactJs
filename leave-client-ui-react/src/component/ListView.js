import React, {Component} from 'react';
import {
    MDBCardBody, MDBCardTitle,
    MDBCol,
    MDBContainer,
    MDBDataTable,
    MDBEdgeHeader,
    MDBFreeBird, MDBJumbotron,
    MDBRow,
    MDBTable,
    MDBTableBody,
    MDBTableHead,
    MDBAnimation
} from "mdbreact";
import {Fragment} from "react";
import {MDBBtn} from "mdbreact";
import {Link} from "react-router-dom";

class ListView extends Component {
    state = {
        isLoading: false,
        leaves: []
    };

    async componentDidMount() {
        const response = await fetch('/api/allApp');
        const body = await response.json();
        this.setState({leaves: body, isLoading: false});
    }



    render() {
        const {leaves, isLoading} = this.state;

        if (isLoading) {
            return <p>Loading...</p>;
        }


        return (

            <MDBContainer className="mt-3">

               {/* <MDBEdgeHeader color="mdb-color unique-color"></MDBEdgeHeader>
                <MDBFreeBird>
                    <MDBRow>
                        <MDBCol md="10" lg="10" className="mx-auto float-none white z-depth-1 py-2 px-2">
                            <MDBCardBody>
                                <MDBCardTitle>All Leave Appliaction Details</MDBCardTitle>
                                <p className="pb-4">Leaves Summary</p>*/}





                                <Fragment>

                                    <MDBAnimation type="pulse" infinite duration="800ms" delay="1s">
                                        <Link to="/create">
                                            <MDBBtn  color="cyan darken-4">CREATE</MDBBtn>
                                        </Link>
                                    </MDBAnimation>






                                </Fragment>
                                <hr/>
                <MDBAnimation type="lightSpeedIn" duration="1s" >
                                <MDBTable scrollY maxHeight="400px"
                                          striped
                                          bordered>
                                    <MDBTableHead color=" mdb-color darken-1" textWhite>

                                        <tr>
                                            <th>Employee</th>
                                            <th>Request Type</th>
                                            <th>Description</th>
                                            <th>Number of Days</th>
                                            <th>Start Date</th>
                                            <th>End Date</th>
                                            <th>Leave Type</th>
                                            <th>Status</th>
                                            <th>Action</th>
                                        </tr>

                                    </MDBTableHead>
                                    <MDBTableBody >
                                        {leaves.map(leave =>

                                            <tr key={leave.leaveid}   >

                                                <td>{leave.employeeName}</td>
                                                <td>{leave.requestType}</td>
                                                <td>{leave.description}</td>
                                                <td>{leave.numberOfDays}</td>
                                                <td>{leave.fromDate}</td>
                                                <td>{leave.toDate}</td>
                                                <td>{leave.leaveType}</td>
                                                <td>{leave.status}</td>
                                                <td>
                                                    <MDBAnimation type="flipInY" duration="2s" delay="1s">
                                                        <MDBBtn color="unique" tag={Link} to={"/detail/" + leave.leaveid}>Detail</MDBBtn>
                                                    </MDBAnimation>
                                                </td>
                                            </tr>

                                        )}
                                    </MDBTableBody>
                                </MDBTable>
                </MDBAnimation>
                         {/*   </MDBCardBody>
                        </MDBCol>
                    </MDBRow>
                </MDBFreeBird>*/}

            </MDBContainer>



        );
    }
}

export default ListView;
