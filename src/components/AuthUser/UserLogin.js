
// register / login 
// conditional rendering
// state 

import React, {Component} from "react";
//npm i react-firebaseui
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from "../FirebaseConfig";
import UserProfile from "./UserProfile";


class UserLogin extends Component {

//via props
 state= {
     condition:true, 
     user:""
 }

uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: 'popup',
  // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
  signInSuccessUrl:'/userprofile',
  // We will display Google and Facebook as auth providers.
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    firebase.auth.TwitterAuthProvider.PROVIDER_ID, 
    firebase.auth.PhoneAuthProvider.PROVIDER_ID
  ]
};

componentDidMount(){
    firebase.auth().onAuthStateChanged((user)=>{
        if (user){
       this.setState({user:user.email}) //user:user
       console.log(user);
    }else{
        console.log("error");
    }
    
})
    //skicka data till parent
}
 
 onClickRegister(){
     this.setState({condition:false})
 }

 onClickLogin(){
    this.setState({condition:true})
 }
 onSubmitLogin(e){
    e.preventDefault();

const email= e.target.elements.email.value;
const password = e.target.elements.password.value;
    firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((res) => this.props.userCredential(res.user.email))


    //anropa showDisplayName




    //react-router 
    //navigate 
    // skydda routerna 

}
// reset password 
// mail och mailer reset länk och mall till användare 


onSubmitRegister(e) {

    e.preventDefault();

    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;
    const displayName = e.target.elements.username.value;

    

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        res.user.sendEmailVerification();
        this.props.userCredential(res.user.email);
        this.props.showDisplayName(displayName);
      });
  }
     //.then(()=>{
     /*      firebase.auth().onAuthStateChanged((user)=>{
            user.updateProfile({
         displayName :username
     })
  console.log("display name"+ this.state.displayName)}) */
    // })

 // aktivera verifering av email
 
 


 resetPassword(e){
     var auth = firebase.auth();
var emailAddress = e.target.elements.resetEmail.value;

auth.sendPasswordResetEmail(emailAddress).then(function() {
  // Email sent.
  console.log("email sent")
})
e.preventDefault();
 }

 /* componentDidMount(){

     firebase.auth().onAuthStateChanged((user)=>{
                            user.updateProfile({
                                displayName :username
                            }))

 }
 } */


 render(){
    return(
        <div className={"UserLogin"}>
            {this.state.condition  &&
            <form className={"login-form"} onSubmit={this.onSubmitLogin.bind(this)}>
              <h3 className={"login-text"}>Login</h3>
              <input type="email" name="email" className={"login-email"} placeholder="Mail"/>
              <input type="password" name="password" className={"login-password"} placeholder="Lösenord"/>
              <button className={"login-btn"}>Login</button>
            </form>}

              <br/>

            {this.state.condition &&
            <form onSubmit={this.resetPassword.bind(this)}>
              <h4 className={"reset-text"}>Reset Password</h4>
                <input type="email" name="resetEmail" className={"reset-email"} placeholder="Mail"></input>
                <button className={"reset-btn"}>Reset</button>
            </form>
            }

            {!this.state.condition &&
            <form onSubmit={this.onSubmitRegister.bind(this)}>
              <h3 className={"reg-text"}>Registrera</h3>
                <input type="text" name="username" className={"reg-name"} placeholder="Användarnamn"/>
                <input type="email" name="email" className={"reg-email"} placeholder="Mail"/>
                <input type="password" name="password" className={"reg-password"} placeholder="Lösenord"/>
                <button className={"reg-btn"}>Register</button>
            </form>}

            <div className={"UserLogin-btn"}>
              <button className={"btn-login"} onClick={this.onClickLogin.bind(this)}>Login</button>
              <button className={"btn-reg"} onClick={this.onClickRegister.bind(this)}>Register</button>
            </div>

            <hr className={"UserLogin-or"}/>
           
            <div className={"MyApp"}>
              <div className={"MyApp-text"}>
              <h1 className={"MyApp-h1"}>My App</h1>
              <p className={"MyApp-p"}>Please sign-in:</p>
              </div>
              <StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()}/>
            </div>

              {this.state.user? <UserProfile userData={this.state.displayName || this.state.user}/> : <div></div>}
           
        </div>
);
}
}

export default UserLogin;