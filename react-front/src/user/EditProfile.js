import React, { Component } from 'react';
import {isAuthenticated} from '../auth';
import {read, update} from './apiUser';
import {Redirect} from 'react-router-dom';



class EditProfile extends Component {
    constructor(){
        super()
        this.state={
            user: "",
            name: "",
            password: "", 
            redirectToProfile: false
        }
    }

    init = userId=>{
        const token = isAuthenticated().token;
        
       read(userId, token)
        .then(data=>{
            if(data.error){
                console.log("error")
                this.setState({redirectToProfile:true})
            } else {
               this.setState({
                    id: data._id, 
                    name: data.name, 
                    email: data.email,
                    password: data.password,
                    error: ''
                });
            }
        });
    };
    
    //to someone's profile
    componentDidMount(){
        const userId = this.props.match.params.userId;
        this.init(userId);
    
    };


    handleChange=(name)=> (event) =>{
        this.setState({[name]:event.target.value})
    };

    clickSubmit=(event)=>{
        event.preventDefault();
        const {name, email, password} = this.state;
        const userId = this.props.match.params.userId;
        const token = isAuthenticated().token;
        const user ={
            name: name,
            email: email,
            password: password || undefined
        };     
    update(userId, token, user)
            .then(data=>{
            if(data.error) this.setState({error: data.error})
            else this.setState({
                redirectToProfile: true
                })    
        })
    };



    signupForm=(name, email, password)=>(
        <form>
        <div className="form-group">
            <label className="text-muted">Name</label>
            <input onChange = {this.handleChange("name")} type="text" value = {name} className="form-control"/>
        </div>

        <div className="form-group">
            <label className="text-muted">Email</label>
            <input onChange = {this.handleChange("email")} type="text" value = {email} className="form-control"/>
        </div>

        <div className="form-group">
            <label className="text-muted">Password</label>
            <input onChange = {this.handleChange("password")} type="password" value = {password} className="form-control"/>
        </div>

           <button onClick ={this.clickSubmit} className="btn btn-raised btn-primary">Update</button>
       </form>
    )


    render() {

        const {id, name, email, password, redirectToProfile} = this.state;
            if(redirectToProfile){
               return <Redirect to={`/user/${id}`}/>
            }
        return (
            <div>
              <div className="container">
              <h2 className = "mt-5 mb-5">edit</h2>
              {this.signupForm(name, email, password)}
              </div>
                 
            </div>
        );
    }
}

export default EditProfile;