import React, { Component} from "react";
import firebase from "firebase";

//paginas derivadas
import Services from "./Services.js";
import Posts from "./Posts.js";
import EditProfile from "./EditProfile.js";
import Navigation from "./Navigation";
import CerrajeriaPosts from "./CerrajeriaPosts.js";
import {
    BrowserRouter,
    Switch,
    Route,
    Link,
    NavLink
  } from "react-router-dom";
import FileUpload from "./FileUpload.js";

const BodyStatus = 'null';

class BodyPages extends Component {



    renderWithBodyStatus(){
        
        return(
            <BrowserRouter>

                <Navigation/>

                <div className = "container mt-5">
              
                  
                    <hr/>
                    <Switch>
                        <Route path="/Services">
                            <Services/>
                        </Route>

                        <Route path="/EditProfile">
                            <EditProfile/>
                        </Route>

                        <Route path="/Posts">
                            <CerrajeriaPosts/>
                        </Route>

                        <Route path="/FileUpload">
                            <FileUpload/>
                        </Route>
                    </Switch>

                </div>
            </BrowserRouter>

        );
    }
    
    /* renderWithBodyStatus(){
        if (BodyStatus == 'Services') {
            return (
                <div>
                    <Services />
                </div>
            )

        } else if (BodyStatus == 'Posts') {
            return (
                <div>
                    <Posts />
                </div>
            )

        } else if (BodyStatus == 'EditProfile') {
            return (
                <div>
                    <EditProfile />
                </div>
            )

        } else {
            return (
                <div>
                     <Services />
                </div>
            )
        };
        
    } */
    
    //gestor de estados

    
    render() {
        return (
            <div>
                {this.renderWithBodyStatus()}
            </div>
        )
    }

        
};

export default BodyPages;