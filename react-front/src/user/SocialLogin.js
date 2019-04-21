import React, { Component } from "react";
import FacebookLogin from 'react-facebook-login';
import { Redirect } from "react-router-dom";
import GoogleLogin from "react-google-login";
import { socialLogin, authenticate } from "../auth";
 
class SocialLogin extends Component {
    constructor() {
        super();
        this.state = {
            redirectToReferrer: false
        };
    }
 
    responseGoogle = response => {
        console.log(response);
        const { googleId, name, email, imageUrl } = response.profileObj;
        const user = {
            password: googleId,
            name: name,
            email: email,
            imageUrl: imageUrl
        };
         console.log("user obj to social login: ", user);
        socialLogin(user).then(data => {
            console.log("signin data: ", data);
            if (data.error) {
                console.log("Error Login. Please try again..");
            } else {
                console.log("signin success - setting jwt: ", data);
                authenticate(data, () => {
                    this.setState({ redirectToReferrer: true });
                });
            }
        });
    };

    responseFacebook = response => {
        console.log(response);
        const { name, email, picture } = response;
        const user = {
            
            name: name,
            email: email,
            picture: picture
        };
        socialLogin(user).then(data => {
            console.log("signin data: ", data);
            if (data.error) {
                console.log("Error Login. Please try again..");
            } else {
                console.log("signin success - setting jwt: ", data);
                authenticate(data, () => {
                    this.setState({ redirectToReferrer: true });
                });
            }
        });
      };
      
 componentClicked = () => {
        console.log( "Clicked!" )
      };
 
    render() {
        // redirect
        const { redirectToReferrer } = this.state;
        if (redirectToReferrer) {
            return <Redirect to="/" />;
        }
 
        return (
            <>
            <GoogleLogin
                clientId="590589910815-gb1hotl5nnh2ooh5q8177jk50nshojpk.apps.googleusercontent.com"
                buttonText="Login with Google"
                onSuccess={this.responseGoogle}
                onFailure={this.responseGoogle}
            />

            <FacebookLogin
                appId="1353682264756862"
                autoLoad={true}
                fields="name,email,picture"
                buttonText="Facebook Login"
                onClick={this.componentClicked}
                callback={this.responseFacebook}
            />
            </>
        );
    }
}
 
export default SocialLogin;


