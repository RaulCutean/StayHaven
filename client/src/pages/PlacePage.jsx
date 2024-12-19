import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import BookingWidget from "../components/BookingWidget.jsx";
import PlaceGallery from "../components/PlaceGallery.jsx";
import AddressLink from "../components/AddressLink.jsx";


export default function PlacePage() {
    const {id} = useParams();
    const [place , setPlace] = useState(null);
    const [ready , setReady] = useState(false);

    useEffect(() => {
        if(!id) {
            return ;
        }else {
            try {
                axios.get(`/places/${id}`).then((response) => {
                    setPlace(response.data);
                    setReady(true);
                })
            } catch (e) {
                console.log(e)
            }
        }
    }, [id]);
    if(!ready && !place) {

        return "Loading...";
    }

    return (
        <div className="mt-4 bg-gray-100 pt-8 -mx-16 px-16 -mt-9 ">
            <h1 className="text-3xl">
                {place.title}
            </h1>
            <AddressLink>
                {place.address}
            </AddressLink>
            <PlaceGallery place={place}  />
            <div className="mt-8 grid gap-8  grid-cols-1 md:grid-cols-[2fr_1fr]">
                <div className="">
                    <div className="my-4">
                        <h2 className="font-semibold text-2xl">Description</h2>
                        {place.description}
                    </div>
                    Check-in: {place.checkIn} <br/>
                    Check-out: {place.checkOut} <br/>
                    Max number of guests: {place.maxGuests}
                </div>
                <div className="">
                    <BookingWidget place={place}/>
                </div>
            </div>
            <div className="mt-8 border-t bg-white -mx-16 px-16 py-8">
                <div className="mt-2">
                    <h2 className="font-semibold text-2xl">Extra info</h2>
                </div>
                <div className=" mb-4 mt-1 text-sm text-gray-700 leading-5 mt-2 ">{place.extraInfo}</div>

            </div>

        </div>

    );
}