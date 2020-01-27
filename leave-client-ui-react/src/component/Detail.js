import React, {Component} from 'react';
import {
    MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBCardTitle,
    MDBCardText,
    MDBCol,
    MDBContainer,
    MDBRow, MDBFreeBird, MDBEdgeHeader,MDBAnimation
} from 'mdbreact';
import {async} from "fast-glob";
import {Link} from "react-router-dom";


class Detail extends Component {


    emptyItem = {
        employeeName: '',
        requestType: '',
        description: '',
        leaveType: '',
        fromDate: '',
        toDate: '',
        department: '',
        comment: ''


    };



    constructor(props) {
        super(props);
        this.state = {
            item: this.emptyItem,
            items: []
        }
        this.delete = this.delete.bind(this);
    };

    async componentDidMount() {
        if (this.props.match.params.leaveid !== 'new') {
            const data = await (await fetch(`/api/appDetail/${this.props.match.params.leaveid}`)).json();
            this.setState({item: data});
            console.log(data)
        }
    }

    async delete(id) {
        await fetch(`/api/app/delete/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(() => {
            let updatedItems = [...this.state.items].filter(i => i.id !== id);
            this.setState({items: updatedItems});
        });
    }

    async approve(id) {

        const {item} = this.state;

        await fetch(`/api/app/updateStatus/${id}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item),
        });
        this.props.history.push('/view');
    }

    async toApprove(id) {

        const {item} = this.state;

        await fetch(`/api/app/updateStatustoApproved/${id}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item),
        });
        this.props.history.push('/view');
    }

    async refuse(id) {

        const {item} = this.state;

        await fetch(`/api/app/updateStatustoRefuse/${id}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item),
        });
        this.props.history.push('/view');
    }


    render() {

        const {item} = this.state;
        let comp;

        if (item.status == "TOAPPROVED"){
            comp = <><MDBBtn color="purple" onClick={() => this.approve(item.leaveid)}>Approve</MDBBtn>
                <MDBBtn color="deep-purple"  onClick={() => this.refuse(item.leaveid)}>Refuse</MDBBtn>
                </>
        }
        else if (item.status == "APPROVED"){
            comp = <><MDBBtn color="purple" onClick={() => this.toApprove(item.leaveid)}>Pending</MDBBtn>
                <MDBBtn color="deep-purple"  onClick={() => this.refuse(item.leaveid)}>Refuse</MDBBtn>
            </>
        }

        else if (item.status == "REFUSED"){
            comp = <><MDBBtn color="deep-purple" onClick={() => this.toApprove(item.leaveid)}>Pending</MDBBtn>
                <MDBBtn color="purple" onClick={() => this.approve(item.leaveid)}>Approve</MDBBtn>

            </>
        }



        return (
            <MDBContainer className="mt-3">
                <MDBEdgeHeader color="mdb-color darken-2">

                    <br/>
                    <MDBAnimation type="pulse" infinite duration="800ms">

                    <MDBCardTitle className="h1-responsive pt-3 m-5 font-bold text-info">Request Detail</MDBCardTitle>
                    </MDBAnimation>
                </MDBEdgeHeader>
                <MDBAnimation type="slideInUp" duration="1s">
                <MDBFreeBird>
                    <MDBRow>
                        <MDBCol md="10" lg="10" className="mx-auto float-none white z-depth-1 py-2 px-2">
                            <MDBCardBody>
                                <MDBAnimation type="flipInX" duration="1s" delay="1s">
                               {/* <MDBCardTitle>Request Details</MDBCardTitle>*/}
                                {/*<p className="pb-4">Example of Material Design Form</p>*/}
                                <MDBBtn color="unique" tag={Link} to={"/create/"}>Create</MDBBtn>
                                <MDBBtn color="pink" tag={Link} to={"/edit/" + item.leaveid}>Edit</MDBBtn>
                                {comp}
                                </MDBAnimation>

                              {/*  <MDBBtn color="purple" onClick={() => this.approve(item.leaveid)}>Approve</MDBBtn>
                                <MDBBtn color="deep-purple" onClick={() => this.refuse(item.leaveid)}>Refuse</MDBBtn>*/}
                                <hr/>
                                <MDBRow>


                                    <MDBCol>

                                        <MDBCardTitle>{item.employeeName} on {item.leaveType}. Days :
                                            ({item.numberOfDays})</MDBCardTitle>
                                        <hr/>
                                        <MDBCardText>
                                            <MDBRow>


                                                <MDBCol md={"4"}>

                                                    <p className="font-weight-bold text-right">Description :</p>

                                                </MDBCol>

                                                <MDBCol md={"8"}>


                                                    <p className="font-weight-normal text-left">{item.description}</p>


                                                </MDBCol>


                                            </MDBRow>

                                            <MDBRow>
                                                <MDBCol md={"4"}>
                                                    <p className="font-weight-bold text-right">Leave Type :</p>

                                                </MDBCol>

                                                <MDBCol md={"8"}>


                                                    <p className="font-weight-normal text-left">{item.leaveType}</p>


                                                </MDBCol>
                                            </MDBRow>


                                            <MDBRow>
                                                <MDBCol md={"4"}>

                                                    <p className="font-weight-bold text-right">Duration :</p>

                                                </MDBCol>

                                                <MDBCol md={"8"}>
                                                    <p className="font-weight-normal text-left">{item.fromDate}</p>

                                                    <p className="font-weight-normal text-left">{item.toDate}</p>

                                                    <p className="font-weight-normal text-left">{item.numberOfDays}</p>


                                                </MDBCol>
                                            </MDBRow>

                                            <MDBRow>
                                                <MDBCol md={"4"}>
                                                    <p className="font-weight-bold text-right">Mode:</p>

                                                </MDBCol>

                                                <MDBCol md={"8"}>


                                                    <p className="font-weight-normal text-left">{item.mode}</p>


                                                </MDBCol>
                                            </MDBRow>



                                            <MDBRow>
                                                <MDBCol md={"4"}>
                                                    <p className="font-weight-bold text-right">Employee :</p>

                                                </MDBCol>

                                                <MDBCol md={"8"}>


                                                    <p className="font-weight-normal text-left">{item.employeeName}</p>


                                                </MDBCol>
                                            </MDBRow>


                                            <MDBRow>
                                                <MDBCol md={"4"}>
                                                    <p className="font-weight-bold text-right">Department:</p>

                                                </MDBCol>

                                                <MDBCol md={"8"}>


                                                    <p className="font-weight-normal text-left">{item.department}</p>


                                                </MDBCol>
                                            </MDBRow>

                                            <MDBRow>
                                                <MDBCol md={"4"}>
                                                    <p className="font-weight-bold text-right">Status :</p>

                                                </MDBCol>

                                                <MDBCol md={"8"}>


                                                    <p className="font-weight-normal text-left">{item.status}</p>


                                                </MDBCol>
                                            </MDBRow>


                                            <MDBRow>
                                                <MDBCol md={"4"}>
                                                    <p className="font-weight-bold text-right">Comment By Manager:</p>

                                                </MDBCol>

                                                <MDBCol md={"8"}>


                                                    <p className="font-weight-normal text-left">{item.comment}</p>


                                                </MDBCol>
                                            </MDBRow>


                                        </MDBCardText>
                                        <MDBBtn outline color={"danger"} onClick={() => this.delete(item.leaveid)}
                                                tag={Link} to={"/view"}>Delete Permanently</MDBBtn>

                                    </MDBCol>


                                </MDBRow>
                            </MDBCardBody>
                        </MDBCol>
                    </MDBRow>
                </MDBFreeBird>
                </MDBAnimation>
            </MDBContainer>

        );
    }
}

export default Detail;
