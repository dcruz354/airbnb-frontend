import React, { useRef, useState } from "react";

const ListingsList = () => {
  const baseUrl = "http://localhost:8080/listingsAndReviews/v1";

  const get_id = useRef(null);
  const get_property_name = useRef(null);

  const [getResult, setGetResult] = useState(null);

  const formatResponse = (res) => {
    return JSON.stringify(res, null, 2);
  }

  async function getAllListings() {
    try {
      const res = await fetch(`${baseUrl}/listings`);

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
        length: res.headers.get("Content-Length"),
        data: data,
      };

        setGetResult(formatResponse(result));
      } catch (err) {
        setGetResult(err.message);
      }
    }

  const clearGetOutput = () => {
    setGetResult(null);
  }

  async function getListingByID() {
    const id = get_id.current.value;

    if(id) {
      try {
        const res = await fetch(`${baseUrl}/listings/${id}`);

        if(!res.ok) {
          const message = `An error has occurred: ${res.status} - ${res.statusText}`;
          throw new Error(message);
        }

        const data = await res.json();

        const result = {
          data: data,
          status: res.status,
          statusText: res.statusText,
          headers: {
            "Content-Type": res.headers.get("Content-Type"),
            "Content-Length": res.headers.get("Content-Length"),
          },
        };

        setGetResult(formatResponse(result));
      } catch (err) {
        setGetResult(err.message);
      }
    }
  }

  async function getListingByPropertyName() {
    const property_name = get_property_name.current.value;

    if(property_name) {
      try {
        const res = await fetch(`${baseUrl}/listings/propertyName/${property_name}`);

        if(!res.ok) {
          const message = `An error has occurred: ${res.status} - ${res.statusText}`;
          throw new Error(message);
        }

        const data = await res.json();

        const result = {
          data: data,
          status: res.status,
          statusText: res.statusText,
          headers: {
            "Content-Type": res.headers.get("Content-Type"),
            "Content-Length": res.headers.get("Content-Length"),
          },
        };

        setGetResult(formatResponse(result));
      } catch (err) {
        setGetResult(err.message);
      }
    }
  }

  return (
    <div className='card'>
      <div className='card-header'>
        airbnb frontend
      </div>
      <div className='card-body'>
        <div className='input-group input-group-sm'>
          <button className='btn btn-sm btn-primary' onClick={getAllListings}>Get All Listings</button>

          <input type="text" ref={get_id} className='form-control ml-2' placeholder='Id' />
          <div className='input-group-append'>
            <button className='btn btn-sm btn-primary' onClick={getListingByID}>Get Listing By Id</button>
          </div>

          <input type="text" ref={get_property_name} className='form-control ml-2' placeholder='Property Name' />
          <div className='input-group-append'>
            <button className='btn btn-sm btn-primary' onClick={getListingByPropertyName}>Get Listing By Property Name</button>
          </div>

          <button className='btn btn-sm btn-warning ml-2' onClick={clearGetOutput}>Clear</button>
        </div>
        { getResult && <div className='alert alert-secondary mt-2' role="alert"><pre>{getResult}</pre></div>}
      </div>
    </div>
  );
}
export default ListingsList;