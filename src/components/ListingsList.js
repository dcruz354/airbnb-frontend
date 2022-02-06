import React, { useRef, useState } from "react";

const ListingsList = () => {
  const baseUrl = "http://localhost:8080/listingsAndReviews/v1";

  const get_id = useRef(null);
  const get_property_name = useRef(null);

  const [getResult, setGetResult] = useState(null);
  const [getResult1, setGetResult1] = useState(null);

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
/* 
      const result = {
        status: res.status + "-" + res.statusText,
        headers: {
          "Content-Type": res.headers.get("Content-Type"),
          "Content-Length": res.headers.get("Content-Length"),
        },
        length: res.headers.get("Content-Length"),
        data: data,
      }; */

        setGetResult(data);
      } catch (err) {
        setGetResult(err.message);
      }
    }

  const clearGetOutput = () => {
    setGetResult(null);
    setGetResult1(null);
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

        setGetResult1(formatResponse(result));
      } catch (err) {
        setGetResult1(err.message);
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

        setGetResult1(formatResponse(result));
      } catch (err) {
        setGetResult1(err.message);
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
        { getResult1 && <div className='alert alert-secondary mt-2' role="alert"><pre>{getResult1}</pre></div>}
        { getResult && 
            <div>
              <table className="table table-striped">
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Listing Url</th>
                    <th scope="col">Name</th>
                    <th scope="col">Summary</th>
                    <th scope="col">Description</th>
                    <th scope="col">Property Type</th>
                    <th scope="col">Id</th>
                  </tr>
                </thead>
                <tbody>
                  {getResult.map(listing =>  {
                    return (
                      <tr>
                          <th scope="row" key={listing.listingUrl}>{listing.listingUrl}</th>
                          <td>{listing.name}</td>
                          <td>{listing.summary}</td>
                          <td>{listing.dexcription}</td>
                          <td>{listing.propertyType}</td>
                          <td>{listing.id}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>}
      </div>
    </div>
  );
}
export default ListingsList;