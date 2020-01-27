import React, {Component, Fragment} from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBAnimation,MDBIcon , MDBInput, MDBCardBody, MDBFreeBird, MDBEdgeHeader, MDBCardTitle} from 'mdbreact';
import {Link} from "react-router-dom";


class CreateForm extends Component {

    emptyItem = {
        employeeName: '',
        requestType: '',
        description: '',
        leaveType: '',
        fromDate: '',
        toDate: '',
        department:'',
        comment:''


    };

    errroItem = {
        employeeName: 'choose a employee name!',
        requestType: 'write a valid requestType!',
        description: 'write a valid description!',
        leaveType: 'write a valid leaveType!',
        fromDate: 'choose a valid date!',
        toDate: 'choose a valid date!',
        department:'write a valid department!',
        comment:'write a valid comment!'


    };

    constructor(props) {
        super(props);
        this.state = {
            errors:this.errroItem,
            item: this.emptyItem,
            employees: [],
            departments: [],
            leaveType: [],


        };
        this.handleChange = this.handleChange.bind(this);
        this.saveUser = this.saveUser.bind(this);
    }

    /* state = {

         employees: [],
         departments: [],
         leaveType: []
     };*/

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




    }

    handleChange(event) {

        const target = event.target;
        const value = target.value;
        const name = target.name;
        let item = {...this.state.item};
        let errors ={...this.state.errors};
        item[name] = value;
        errors[name] = value;



        switch (name) {
            case 'description':
                errors.description =
                    value.length < 1
                        ? 'write a valid description!'
                        : '';
                break;
            case 'requestType':
                errors.requestType =
                    value.length < 1
                        ? 'write a valid requestType!'
                        : '';
                break;
            case 'employeeName':
                errors.employeeName =
                    value.length < 1
                        ? 'choose a employee name!'
                        : '';
                break;
            case 'comment':
                errors.comment =
                    value.length < 1
                        ? 'write a valid comment!'
                        : '';
                break;
            case 'department':
                errors.department =
                    value.length < 1
                        ? 'choose a department!'
                        : '';
                break;
            case 'leaveType':
                errors.leaveType =
                    value.length < 1
                        ? 'choose a leaveType!'
                        : '';
                break;
            case 'fromDate':
                errors.fromDate =
                    value.length > 10
                        ? 'choose a valid date!'
                        : '';
                break;
            case 'toDate':
                errors.toDate =
                    value.length > 10
                        ? 'choose a valid date!'
                        : '';
                break;
            default:
                break;
        }





        this.setState({item , errors});

        console.log(item);
        console.log(errors);

    }
     validateForm = (errors) => {
        let valid = true;
        Object.values(errors).forEach(
            // if we have an error string set valid to false
            (val) => val.length > 0 && (valid = false)
        );
        return valid;
    }

    async saveUser (e) {
        e.preventDefault();

        e.target.className += " was-validated";

        if(this.validateForm(this.state.errors)) {
            console.info('Valid Form');
            const {item} = this.state;
            console.log(item);
            await fetch('/api/create', {
                method : 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(item),
            });
            this.props.history.push('/view');
        }else{
            console.error('Invalid Form')
        }



    /*    const {item} = this.state;
        console.log(item);
        await fetch('/api/create', {
            method : 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item),
        });
        this.props.history.push('/view');*/
    }




    render() {

        /*const {item} = this.state;
        const title = <h2>{item.id ? 'Edit Data' : 'Add Data'}</h2>;*/
        const {errors} = this.state;

        return (
            /*<MDBContainer>*/

            <MDBContainer className="mt-3">
                <MDBEdgeHeader color="mdb-color darken-2">
                    <br/>
                    <MDBAnimation type="pulse" infinite duration="800ms">

                    <MDBCardTitle className="h1-responsive pt-3 m-5 font-bold text-info">New Request</MDBCardTitle>
                    </MDBAnimation>



                </MDBEdgeHeader>
                <MDBAnimation type="slideInUp" duration="1s">
                <MDBFreeBird>
                    <MDBRow>
                        <MDBCol md="11" lg="11" className="mx-auto float-none white z-depth-1 py-2 px-2">
                            <MDBCardBody>
                                {/*<MDBCardTitle>New Request</MDBCardTitle>*/}
                                {/*<p className="pb-4">Example of Material Design Form</p>*/}


                                <form className="needs-validation" onSubmit={this.saveUser} noValidate>
                                    <p className="h4 text-center mb-4">Fill Up The Form</p>
                                    <MDBAnimation type="flipInY" duration="1s" delay="1s">

                                    <MDBBtn color="cyan"  type="submit">Create</MDBBtn>


                                    {/*<MDBBtn color="elegant"  tag={Link} to="/view">Cancel</MDBBtn>*/}

                                    <MDBBtn color="elegant"  onClick={this.props.history.goBack}>Cancel</MDBBtn>
                                    </MDBAnimation>


                                    <MDBRow>


                                        <MDBCol md="6">


                                            <label htmlFor="defaultFormContactNameEx" className="grey-text">
                                                Description
                                            </label>
                                            <input
                                                type="text"
                                                id="defaultFormContactNameEx"
                                                className="form-control"
                                                name="description"
                                                onChange={this.handleChange}
                                                value={this.state.item.description}
                                                required
                                            />
                                            {errors.description.length > 0 &&
                                            <div className="invalid-feedback">
                                                {errors.description}
                                            </div>}
                                            {/*<div className="valid-feedback">Looks good!</div>*/}
                                            <br />
                                            <label htmlFor="defaultFormContactEmailEx" className="grey-text">
                                                Leave Type
                                            </label>
                                            <div>

                                                <select className="browser-default custom-select" name="leaveType" onClick={this.handleChange}

                                                        required>

                                                    <option value="" selected disabled hidden>Choose Leave Type</option>

                                                    {this.state.leaveType.map(leave =>
                                                        <option>{leave}</option>
                                                    )}


                                                </select>

                                                {errors.leaveType.length > 0 &&
                                                <div className="invalid-feedback">
                                                    {errors.leaveType}
                                                </div>}

                                            </div>

                                            {/*<div className="valid-feedback">Looks good!</div>*/}
                                            <br />
                                            <label htmlFor="defaultFormContactNameEx"  className="grey-text">
                                                Start date
                                            </label>
                                            <input
                                                type="date"
                                                name="fromDate"

                                                id="defaultFormContactNameEx"
                                                className="form-control"
                                                onChange={this.handleChange}
                                                value={this.state.item.fromDate}
                                                required
                                            />
                                            {errors.fromDate.length > 0 &&
                                            <div className="invalid-feedback">
                                                {errors.fromDate}
                                            </div>}
                                            {/*<div className="valid-feedback">Looks good!</div>*/}
                                            <br />
                                            <label htmlFor="defaultFormContactNameEx"  className="grey-text">
                                                End date
                                            </label>
                                            <input
                                                type="date"
                                                name="toDate"
                                                id="defaultFormContactNameEx"
                                                className="form-control"
                                                onChange={this.handleChange}
                                                value={this.state.toDate}
                                                required
                                            />
                                            {errors.toDate.length > 0 &&
                                            <div className="invalid-feedback">
                                                {errors.toDate}
                                            </div>}
                                            {/*<div className="valid-feedback">Looks good!</div>*/}
                                        </MDBCol>

                                        <MDBCol md="6">
                                            <label htmlFor="defaultFormContactNameEx"  className="grey-text">
                                                Request Type
                                            </label>
                                            <input
                                                type="text"
                                                id="defaultFormContactNameEx"
                                                name="requestType"
                                                className="form-control"
                                                onChange={this.handleChange}
                                                value={this.state.requestType}
                                                required
                                            />
                                            {errors.requestType.length > 0 &&
                                            <div className="invalid-feedback">
                                                {errors.requestType}
                                            </div>}
                                            {/*<div className="valid-feedback">Looks good!</div>*/}
                                            <br />
                                            <label htmlFor="defaultFormContactEmailEx"  className="grey-text">
                                                By Employee
                                            </label>
                                            <div>
                                                <select className="browser-default custom-select" required name="employeeName" onClick={this.handleChange}>
                                                    <option value="" selected disabled hidden>Choose Employee</option>
                                                    {this.state.employees.map(employee =>
                                                        <option>{employee}</option>
                                                    )}
                                                </select>

                                                {errors.employeeName.length > 0 &&
                                                <div className="invalid-feedback">
                                                    {errors.employeeName}
                                                </div>}

                                            </div>

                                            {/*<div className="valid-feedback">Looks good!</div>*/}
                                            <br/>

                                            <label htmlFor="defaultFormContactEmailEx"  className="grey-text">
                                                Department
                                            </label>
                                            <div>
                                                <select  className="browser-default custom-select" required name="department" onClick={this.handleChange}>
                                                    <option value="" selected disabled hidden>Choose Department</option>


                                                    {this.state.departments.map(department =>
                                                        <option>{department}</option>
                                                    )}
                                                </select>
                                                {errors.department.length > 0 &&
                                                <div className="invalid-feedback">
                                                    {errors.department}
                                                </div>}
                                            </div>

                                            <br/>
                                            {/*<div className="valid-feedback">Looks good!</div>*/}
                                           {/* <MDBInput type="textarea" name="comment" label="Comment By Manager" rows="3"
                                                      onChange={this.handleChange}
                                                      value={this.state.comment}



                                            />*/}
                                            <div className="form-group">
                                                <label htmlFor="exampleFormControlTextarea1">
                                                    Comment By Manager
                                                </label>
                                                <textarea
                                                    className="form-control"
                                                    id="exampleFormControlTextarea1"
                                                    name="comment"
                                                    rows="3"
                                                    onChange={this.handleChange}
                                                    value={this.state.comment}
                                                    required
                                                />

                                                {errors.comment.length > 0 &&
                                                <div className="invalid-feedback">
                                                    {errors.comment}
                                                </div>}
                                            </div>

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

export default CreateForm;
