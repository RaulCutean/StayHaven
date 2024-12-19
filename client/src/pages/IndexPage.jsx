import {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";


export default function  IndexPage() {
    const [places , setPlaces] = useState([])
    useEffect(() => {
        try {
            axios.get("/places").then(response => {
                const {data} = response ;
                setPlaces([...data , ...data]) ;
            })
        }catch(e) {
            console.log(e)
        }
    }, []);
    return (
        <div className="grid gap-x-6 gap-y-8 lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 mt-8">
            {places.length > 0 && places.map((place) => {
                return (
                    <Link to={"/place/" + place._id} className=" rounded-2xl">
                        {place.photos?.[0] && (
                            <img className="rounded-2xl aspect-square object-cover" src={`http://localhost:3500/uploads/`+place.photos[0]} alt="#"/>
                        )}
                        <div className="mt-1">
                            <h3 className="">{place.address}</h3>
                            <h2 className="text-gray-500">{place.title}</h2>
                            <div className="mt-1">
                                <span className="font-bold">${place.price} </span>
                                per night
                            </div>
                        </div>
                    </Link>
                )
            })}
        </div>
    )
}