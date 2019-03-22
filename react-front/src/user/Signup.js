import React, { Component } from 'react';

class Signup extends Component {
    constructor(){
        super()
        this.state = {
            name: "",
            email: "",
            password: "",
            error: ""
        }
    };


    handleChange=(name)=> (event) =>{
        this.setState({[name]:event.target.value})
    };

    clickSubmit=(event)=>{
        event.preventDefault();
        const {name, email, password} = this.state;
        const user ={
            name: name,
            email: email,
            password: password
        };
       // console.log(user)
       fetch("http://localhost:8080/signup",
       {
           method: "POST",
           headers: {
               Accept: "application/json",
               "Content-Type": "application/json"
           },
           body: JSON.stringify(user)       
        })
        .then(response=>{
            return response.json()
        })
        .catch(err=> console.log("errror" + err))
    }

    render() {
        return (
            <div className="container">
                <h2 className = "mt-5 mb-5">signup</h2>
                <form>
                    <div className="form-group">
                        <label className="text-muted">Name</label>
                        <input onChange = {this.handleChange("name")} type="text" value = {this.state.name} className="form-control"/>
  
                    </div>
                    <div className="form-group">
                        <label className="text-muted">Email</label>
                        <input onChange = {this.handleChange("email")} type="text" value = {this.state.email} className="form-control"/>
                    </div>
                    <div className="form-group">
                        <label className="text-muted">Password</label>
                        <input onChange = {this.handleChange("password")} type="password" value = {this.state.password} className="form-control"/>
                    </div>
                    <button onClick ={this.clickSubmit} className="btn btn-raised btn-primary">Submit</button>
                </form>
            </div>
        );
    }
}

export default Signup;