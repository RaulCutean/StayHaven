import PhotosUploader from "../components/PhotosUploader.jsx";
import Perks from "../components/Perks.jsx";
import {Navigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import AccountNav from "../components/AccountNav.jsx";


export default function PlacesFormPage() {
    const {id} = useParams();
    console.log(id);
    const [title, setTitle] = useState("");
    const [address, setAddress] = useState("");
    const [addedPhotos, setAddedPhotos] = useState([]);
    const [description, setDescription] = useState("");
    const [perks, setPerks] = useState([]);
    const [extraInfo, setExtraInfo] = useState("");
    const [checkIn, setCheckIn] = useState("");
    const [checkOut, setCheckOut] = useState("");
    const [maxGuests, setMaxGuests] = useState(1);
    const [redirect , setRedirect] = useState(false);
    const [price , setPrice] = useState(100) ;
    useEffect(() => {
        if(id === undefined) {
            return ;
        }
        axios.get(`/places/`+id).then((response) => {
            const {data} = response;
            setTitle(data.title);
            setAddress(data.address);
            setAddedPhotos(data.photos);
            setDescription(data.description);
            setPerks(data.perks);
            setExtraInfo(data.extraInfo);
            setCheckIn(data.checkIn);
            setCheckOut(data.checkOut);
            setMaxGuests(data.maxGuests);
            setPrice(data.price)
        }) ;
    } , [id])
    function inputHeader(text) {
        return (
            <h2 className="text-2xl">{text}</h2>
        )
    }
    function inputDescription(text) {
        return (
            <p className="text-sm text-gray-500">{text}</p>
        )
    }

    function preInput(header, description) {
        return (
            <>
                {inputHeader(header)}
                {inputDescription(description)}
            </>
        )
    }
    async function savePlace(ev) {
        ev.preventDefault();
        const placeData = { title , address , addedPhotos
            , description , perks , extraInfo,
            checkIn , checkOut , maxGuests , price
        }
        if(id) {
            try {
                const response = await axios.put("/upload-place" , {
                    id , ...placeData
                } ) ;
                setRedirect(true);
            }catch(e) {
                console.log(e)
            }
        }
        else {
            try {
                const response = await axios.post("/upload-place" , placeData) ;
                setRedirect(true);
            }catch(e) {
                console.log(e)
            }
        }

    }
    if(redirect) {
        return <Navigate to="/account/places" />
    }
    return (
        <div>
            <AccountNav />
            <form onSubmit={savePlace}>
                <div className="mt-4">
                    {preInput("Title", "Title for your place , should be short and catchy")}
                    <input
                        className="mt-1"
                        type="text" placeholder="title , for example: My lovely apt"
                        value={title}
                        onChange={(ev) => setTitle(ev.target.value)}
                    />
                </div>
                <div className="mt-4">
                    {preInput("Address", "Address to your place")}
                    <input
                        type="text"
                        placeholder="address"
                        value={address}
                        onChange={(ev) => setAddress(ev.target.value)}
                    />
                </div>

                <div className="mt-4">
                    {preInput("Photos", "More = better")}
                    <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos}/>
                </div>

                <div className="mt-4">
                    {preInput("Description", "Description of the place")}
                    <textarea
                        value={description}
                        onChange={(ev) => setDescription(ev.target.value)}
                    />
                </div>


                {/* PERKS */}
                <div className="mt-4">
                    {preInput("Perks", "Select all the perks of your place")}
                    <Perks selected={perks} onChange={setPerks}/>
                </div>
                {/* END PERKS */}


                <div className="mt-4">
                    {preInput("Extra info", "House rules , etc")}
                    <textarea
                        value={extraInfo}
                        onChange={(ev) => setExtraInfo(ev.target.value)}
                    />
                </div>
                <div className="mt-4">
                    {preInput("Check in&out times", "add check in&out times")}
                    <div className="grid lg:grid-cols-4 sm:grid-cols-2  gap-2 mt-2">
                        <div>
                            <h3 className="mt-2 ">Check in time</h3>
                            <input
                                type="text"
                                placeholder="14:00"
                                value={checkIn}
                                onChange={(ev) => setCheckIn(ev.target.value)}
                            />
                        </div>
                        <div>
                            <h3 className="mt-2 ">Check out time</h3>
                            <input
                                value={checkOut}
                                onChange={(ev) => setCheckOut(ev.target.value)}
                                type="text" placeholder="18:00"
                            />

                        </div>
                        <div>
                            <h3 className="mt-2 ">Max guests</h3>
                            <input
                                value={maxGuests}
                                type="number"
                                onChange={(ev) => setMaxGuests(ev.target.value)}
                                min="1"
                                max="100"
                                className="p-2 block w-full rounded-xl  border"
                                placeholder="Add max number of guests"
                            />
                        </div>
                        <div>
                            <h3 className="mt-2 ">Price per night</h3>
                            <input
                                value={price}
                                type="number"
                                onChange={(ev) => setPrice(ev.target.value)}
                                min="1"
                                className="p-2 block w-full rounded-xl  border"
                                placeholder="Price per night"
                            />
                        </div>
                    </div>
                </div>
                <div>
                    <button className="primary">Save</button>
                </div>
            </form>
        </div>
    )
}