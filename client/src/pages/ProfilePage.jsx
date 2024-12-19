import {useContext, useState} from "react";
import {UserContext} from "../UserContext/UserContext.jsx";
import {Link, Navigate, useParams} from "react-router-dom";
import axios from "axios";
import PlacesPage from "./PlacesPage.jsx";
import AccountNav from "../components/AccountNav.jsx";


export default function ProfilePage() {
    const {user , ready , setUser} = useContext(UserContext);
    let {subpage} = useParams() ;
    const logout =async () => {
        const response = await axios.post("/logout") ;
        if(response.status === 200) {
            window.location.reload();
            setUser(null)
        }
    }
    if(!ready) {
        return "Loading..."
    }
    if(!user && ready) {
        return <Navigate to = {"/login"} />
    }
    if(subpage === undefined) {
        subpage = "profile" ;
    }



    return (
        <div>
            <AccountNav />
            {subpage === "profile" && (
                <div className="text-center max-w-lg mx-auto">
                    Logged in as {user.firstname} ({user.email})
                    <div>
                        <button onClick={logout} className="primary max-w-md ">Logout</button>
                    </div>
                </div>
            )}
            {subpage === "places" && (
                <PlacesPage />
            )}
        </div>
    ) ;

}
