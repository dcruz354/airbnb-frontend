import React, { useRef, useState } from 'react';

const AddListing = () => {
    const baseUrl = "http://localhost:8080/listingsAndReviews/v1";

    const listing_listingUrl = useRef(null);
    const listing_name = useRef(null);
    const listing_summary = useRef(null);
    const listing_description = useRef(null);
    const lisitng_propertyType = useRef(null);

    const [postResult, setPostResult] = useState(null);

    const formatResponse = (res) => {
        return JSON.stringify(res, null, 2);
      }

    async function postListing () {
        const postListing = {
            listingUrl: listing_listingUrl.current.value,
            name:       listing_name.current.value,
            summary:    listing_summary.current.value,
            description:    listing_description.current.value,
            propertyType:   lisitng_propertyType.current.value,
        };

        try {
            const res = await fetch(`${baseUrl}/listings/create`, {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                    "x-access-token": "token-value",
                },
                body: JSON.stringify(postListing),
            });
            if(!res.ok) {
                const message = `An error has occurred: ${res.status} - ${res.statusText}`;
                throw new Error(message);
              }
              const data = await res.json();
              const result = {
                  status: res.status + "-" + res.statusText,
                  headers: {
                      "Content-Type": res.headers.get("Content-Type"),
                      "Content-Length": res.headers.get("Content-Length"),
                  },
                  data: data,
              };
              setPostResult(formatResponse(result));
        } catch (err) {
            setPostResult(err.message);
        }
    }

    const clearPostOutput = () => {
        setPostResult(null);
      }

    return (
        <div className='card'>
            <div className='card-header'>Airbnb Post</div>
            <div className='card-body'>
                <div className='form-group'>
                    <input type="text" className='form-control' ref={listing_listingUrl} placeholder='Listing Url'/>
                </div>
                <div className='form-group'>
                    <input type="text" className='form-control' ref={listing_name} placeholder='Listing Name'/>
                </div>
                <div className='form-group'>
                    <input type="text" className='form-control' ref={listing_summary} placeholder='Listing Summary'/>
                </div>
                <div className='form-group'>
                    <input type="text" className='form-control' ref={listing_description} placeholder='Listing Description'/>
                </div>
                <div className='form-group'>
                    <input type="text" className='form-control' ref={lisitng_propertyType} placeholder='Listing Property Type'/>
                </div>
                <button className='btn btn-sm btn-primary' onClick={postListing}>Post Listing</button>
                <button className="btn btn-sm btn-warning ml-2" onClick={clearPostOutput}>Clear</button>
                { postResult && <div className="alert alert-secondary mt-2" role="alert"><pre>{postResult}</pre></div> }
            </div>
        </div>
    )
}

export default AddListing;