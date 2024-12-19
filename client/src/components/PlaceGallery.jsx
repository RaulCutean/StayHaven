import {useState} from "react";


export default function PlaceGallery({place }) {
    const [showAllPhotos, setShowAllPhotos] = useState(false);
    if(showAllPhotos) {
        return (
            <div className="overflow-auto p-16 absolute left-0 top-0 right-0 bottom-0 bg-black text-white">
                <div className="bg-black flex justify-center items-center">
                    <div className=" bg-black max-w-[900px] flex flex-col gap-6">
                        <div className="">
                            <h2 className=" text-2xl">Photos of {place.title}</h2>
                            <button onClick={() => setShowAllPhotos(false)}
                                    className="left-8 top-4 fixed flex px-4 py-2 bg-white shadow shadow-black text-black rounded-2xl gap-1 ">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                          d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"/>
                                </svg>

                            </button>
                        </div>
                        {place?.photos?.length > 0 && place.photos.map(photo => (
                            <div className="rounded-2xl overflow-hidden shadow shadow-white ">
                                <img className=" aspect-square w-full object-cover w-[1000px] h-[700px]"
                                     src={`http://localhost:3500/uploads/${photo}`} alt=""/>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        )
    }
    return (
        <div className="relative">
            <div className="grid gap-2 lg:grid-cold[1fr_2fr] sm:grid-cols-[0.75fr_0.5fr] p-4 -ml-4">
                <div className="rounded-3xl">
                    {place.photos?.[0] && (
                        <div className="">
                            <img
                                onClick={() => setShowAllPhotos(true)}
                                className="cursor-pointer w-[1108px] h-[550px]  xl:h-[615px] sm:h-[400px] rounded-l-2xl object-cover  "
                                src={`http://localhost:3500/uploads/${place.photos[0]}`} alt=""/>
                        </div>
                    )}
                </div>
                <div className="grid gap-2 grid-cols-[1fr_1fr] ">
                    {place.photos?.[1] && (
                        <div className="">
                            <img
                                onClick={() => setShowAllPhotos(true)}
                                className="cursor-pointer object-cover h-full aspect-square"
                                src={`http://localhost:3500/uploads/${place.photos[1]}`} alt=""/>
                        </div>
                    )}
                    {place.photos?.[2] && (
                        <div className="">
                            <img
                                onClick={() => setShowAllPhotos(true)}
                                className="cursor-pointer object-cover h-full aspect-square rounded-r-2xl"
                                src={`http://localhost:3500/uploads/${place.photos[2]}`} alt=""/>
                        </div>
                    )}
                    {place.photos?.[3] && (
                        <div className="">
                            <img
                                onClick={() => setShowAllPhotos(true)}
                                className="cursor-pointer object-cover h-full aspect-square"
                                src={`http://localhost:3500/uploads/${place.photos[3]}`} alt=""/>
                        </div>
                    )}
                    {place.photos?.[4] && (
                        <div className="">
                            <img
                                onClick={() => setShowAllPhotos(true)}
                                className="cursor-pointer object-cover h-full aspect-square rounded-r-2xl"
                                src={`http://localhost:3500/uploads/${place.photos[4]}`} alt=""/>
                        </div>
                    )}
                </div>
            </div>
            <button className="absolute flex bottom-8 right-8
                                   py-2 px-4 bg-white rounded-2xl
                                   shadow-gray-500 shadow-md gap-1"
                    onClick={() => setShowAllPhotos(true)}
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                    <path fillRule="evenodd"
                          d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z"
                          clipRule="evenodd"/>
                </svg>
                Show all photos
            </button>
        </div>
    )
}