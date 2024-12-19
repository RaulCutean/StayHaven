import {Link, Navigate, useParams} from "react-router-dom";
import AccountNav from "../components/AccountNav.jsx";
import {useEffect, useState} from "react";
import axios from "axios";


export default  function PlacesPage() {
    const [places , setPlaces] = useState([]) ;
    useEffect( () => {
        axios.get("/upload-place").then( ({data}) => {
            setPlaces(data);
        })
    } , [])
    return (
        <div>
            <AccountNav />
                <div className="text-center">
                    <Link className="bg-primary rounded-xl py-2 px-6 text-white inline-flex gap-1"
                          to="/account/places/new">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                             stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15"/>
                        </svg>
                        Add new place
                    </Link>
                </div>
            <div className="mt-4 grid grid-rows-1 gap-4">
                {places.length > 0 && places.map((place) => {
                        return (
                            <Link to = {`/account/places/`+place._id} className="overflow-auto flex cursor-pointer bg-gray-100 p-4 rounded-2xl gap-4 max-h-40 max-w-full">
                                <div className = " flex h-32 bg-gray-300  shrink-0">
                                    {place.photos.length > 0 && (
                                        <img className="object-cover w-32 h-32" src={axios.defaults.baseURL+ "/uploads/" + place.photos[0]} alt="#"/>
                                    )}
                                </div>
                                <div className="grow-0 shrink ">
                                    <h2 className="text-xl">{place.title}</h2>
                                    <p className="text-sm mt-2">{place.description}</p>
                                </div>
                            </Link>
                        )
                    })
                }
            </div>
        </div>
    )
}