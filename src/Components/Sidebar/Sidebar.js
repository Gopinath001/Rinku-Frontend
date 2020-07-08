import React from "react";
import {
    BrowserRouter as Router,
    NavLink
} from "react-router-dom";
import "./Sidebar.css";
import FileManager from "./../FileManager/FileManager";
import ManageLinks from "./../ManageLinks/ManageLinks";
import PageHolder from "./../PageHolder/PageHolder";
import {Stats} from "../Stats"
import FadeIn from "react-fade-in";

function Sidebar(props){

    const fadeInWrapper = (component) => {
        return(
            <FadeIn>
                {component}
            </FadeIn>
        );
    }
    //@todo get this from server side
    const routes = [
        {
            path:"/home",
            exact:true,
            children: () =>  fadeInWrapper(<FileManager/>),
            name:"explorer"
        },
        {
            path:"/manage-links",
            exact:true,
            children: () =>  fadeInWrapper(<ManageLinks/>),
            name:"manage links"
        },
        {
            path:"/url-shorten",
            exact:true,
            children: () =>  fadeInWrapper(<div>url shorten</div>) ,
            name:"url shorten"
        },
        {
            path:"/stats",
            exact:true,
            children: () =>  fadeInWrapper(<Stats/>),
            name:"stats"
        },
    ];

    let userNickName = sessionStorage.getItem('nick');
    if(userNickName == null) userNickName = "user";
    
    return(
        <Router>
            <div className="main-sidebar">
                <div className="user-title">
                    <FadeIn>
                    <h4>Hi {userNickName}</h4>
                    </FadeIn>
                </div>
                
                <div className="user-content">
                    <ul className="user-menuitems">
                        {navItems(routes)}
                    </ul>
                </div>
            </div>
            { routes && <PageHolder routes={routes}/> }
        </Router>
    );
}

const navItems = (items) => {
    const linkActiveStyle = {
        borderBottom: "solid 3px orange",
        transition: "0.5s ease-in-out"
      }
    return(
        items.map((item,key)=>{
            return(
                <FadeIn>
                    <li key={key}> 
                        <NavLink 
                            to={item.path}
                            activeStyle={ linkActiveStyle }
                        >
                            {item.name}
                        </NavLink>
                    </li>
                </FadeIn>
            )
        })
    );
}



export default Sidebar;