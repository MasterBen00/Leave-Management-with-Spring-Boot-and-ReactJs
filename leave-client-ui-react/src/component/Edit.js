import React, {Component} from 'react';
import {
    MDBAnimation,
    MDBBtn,
    MDBCardBody, MDBCardText,
    MDBCardTitle,
    MDBCol,
    MDBContainer,
    MDBEdgeHeader,
    MDBFreeBird,
    MDBInput,
    MDBRow
} from "mdbreact";

class Edit extends Component {



    constructor(props) {
        super(props);
        this.state = {
            show:false,
            item: [],
            employees: [],
            departments: [],
            leaveType: []

        };
        this.handleChange = this.handleChange.bind(this);
        this.saveUser = this.saveUser.bind(this);
    }

    async componentDidMount() {

        const response1 = await fetch('/api/employee');
        const body1 = await response1.json();
        this.setState({ employees: body1 });

        const response2 = await fetch('/api/department');
        const body2 = await response2.json();
        this.setState({ departments: body2 });

        const response3 = await fetch('/api/leaveType');
        const body3 = await response3.json();
        this.setState({ leaveType: body3 });



        if (this.props.match.params.leaveid !== 'new') {
            const data = await (await fetch(`/api/appDetail/${this.props.match.params.leaveid}`)).json();
            this.setState({item: data});

        }
    }

    show(){
        this.setState({
            show:true
        });
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let item = {...this.state.item};
        item[name] = value;

        this.setState({item});
    }
    async saveUser (e) {
        e.preventDefault();
        const {item} = this.state;
        console.log(item, "lol");
        await fetch(`/api/app/edit/${item.leaveid}`, {
            method : 'PUT',
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
        return (
            <MDBContainer className="mt-3">
                <MDBEdgeHeader color="mdb-color darken-2">
                    <br/>
                    <MDBAnimation type="pulse" infinite duration="800ms">

                    <MDBCardTitle className="h1-responsive pt-3 m-5 font-bold text-info">Edit Your Request</MDBCardTitle>
                    </MDBAnimation>
                </MDBEdgeHeader>
                <MDBAnimation type="slideInUp" duration="1s">
                <MDBFreeBird>
                    <MDBRow>
                        <MDBCol md="11" lg="11" className="mx-auto float-none white z-depth-1 py-2 px-2">
                            <MDBCardBody>
                                {/*<MDBCardTitle>Edit Your Request</MDBCardTitle>*/}
                              {/*  <p className="pb-4">Example of Material Design Form</p>*/}
                                <form>
                                    <div className="text-center mt-4">
                                        <MDBAnimation type="flipInY" duration="1s" delay="1s">
                                        <MDBBtn color="pink darken-4"  onClick={this.saveUser}>Edit</MDBBtn>
                                        <MDBBtn color="elegant"  onClick={this.props.history.goBack}>Cancel</MDBBtn>
                                        </MDBAnimation>
                                    </div>
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


                                                        <input
                                                            type="text"
                                                            id="defaultFormContactNameEx"
                                                            className="form-control"
                                                            name="description"
                                                            onChange={this.handleChange}
                                                            value={item.description}

                                                        />


                                                    </MDBCol>

                                                </MDBRow>
                                                <br/>

                                                <MDBRow>
                                                    <MDBCol md={"4"}>
                                                        <p className="font-weight-bold text-right">Leave Type :</p>

                                                    </MDBCol>

                                                    <MDBCol md={"8"}>


                                                        <div>

                                                            <select className="browser-default custom-select" name="leaveType" onChange={this.handleChange}
                                                                    value={item.leaveType}
                                                            >


                                                                {this.state.leaveType.map(leave =>
                                                                    <option>{leave}</option>
                                                                )}


                                                            </select>

                                                        </div>


                                                    </MDBCol>
                                                </MDBRow>
                                                <br/>
                                                <MDBRow>
                                                    <MDBCol md={"4"}>

                                                        <p className="font-weight-bold text-right">Duration :</p>

                                                    </MDBCol>

                                                    <MDBCol md={"8"}>
                                                        <input
                                                            type="date"
                                                            name="fromDate"

                                                            id="defaultFormContactNameEx"
                                                            className="form-control"
                                                            onChange={this.handleChange}
                                                            value={item.fromDate}
                                                        />
                                                        <br/>

                                                        <input
                                                            type="date"
                                                            name="toDate"
                                                            id="defaultFormContactNameEx"
                                                            className="form-control"
                                                            onChange={this.handleChange}
                                                            value={item.toDate}
                                                        />
                                                        <br/>

                                                        <p className="font-weight-normal text-left">{item.numberOfDays}</p>


                                                    </MDBCol>
                                                </MDBRow>
                                                <br/>
                                                <MDBRow>
                                                    <MDBCol md={"4"}>
                                                        <p className="font-weight-bold text-right">Mode:</p>

                                                    </MDBCol>

                                                    <MDBCol md={"8"}>


                                                        <p className="font-weight-normal text-left">{item.mode}</p>


                                                    </MDBCol>
                                                </MDBRow>
                                                <br/>
                                                <MDBRow>
                                                    <MDBCol md={"4"}>
                                                        <p className="font-weight-bold text-right">Employee :</p>

                                                    </MDBCol>

                                                    <MDBCol md={"8"}>


                                                        <div>
                                                            <select className="browser-default custom-select" name="employeeName" onChange={this.handleChange}
                                                                    value={item.employeeName}>

                                                                {this.state.employees.map(employee =>
                                                                    <option>{employee}</option>
                                                                )}
                                                            </select>

                                                        </div>


                                                    </MDBCol>
                                                </MDBRow>
                                                <br/>
                                                <MDBRow>
                                                    <MDBCol md={"4"}>
                                                        <p className="font-weight-bold text-right">Department:</p>

                                                    </MDBCol>

                                                    <MDBCol md={"8"}>


                                                        <div>
                                                            <select className="browser-default custom-select" name="department" onChange={this.handleChange}
                                                                    value={item.department}>

                                                                {this.state.departments.map(department =>
                                                                    <option>{department}</option>
                                                                )}
                                                            </select>
                                                        </div>


                                                    </MDBCol>
                                                </MDBRow>
                                                <br/>
                                                <MDBRow>
                                                    <MDBCol md={"4"}>
                                                        <p className="font-weight-bold text-right">Comment By Manager:</p>

                                                    </MDBCol>

                                                    <MDBCol md={"8"}>


                                                        <MDBInput type="textarea" name="comment"  rows="3"
                                                                  onChange={this.handleChange}
                                                                  value={item.comment}
                                                        />


                                                    </MDBCol>
                                                </MDBRow>

                                            </MDBCardText>
                                        </MDBCol>
                                    </MDBRow>


                                </form>

                                <div className="my-2">
                                    <p style={{ fontWeight: "300", fontSize: "0.75rem" }}>Never submit your passwords here</p>
                                </div>
                            </MDBCardBody>
                        </MDBCol>
                    </MDBRow>
                </MDBFreeBird>
                </MDBAnimation>
            </MDBContainer>
        );
    }
}

export default Edit;
