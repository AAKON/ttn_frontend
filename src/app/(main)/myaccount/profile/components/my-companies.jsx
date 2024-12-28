'use client'
import React, {useEffect, useState} from 'react'
import MyCompany from './my-company'
import Saved from './saved'
import {getMyCompanies, getMyFavsCompanies} from "@/services/company";

const MyCompanies = () => {

  const [companies, setCompanies] = useState([]);
  const [myFavourites, setMyFavourites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [favLoading, setFavLoading] = useState(true);
  const [error, setError] = useState(null);


  const fetchFavourites = async () => {
    setFavLoading(true);
    try {
      const response = await getMyFavsCompanies();
      setMyFavourites(response);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await getMyCompanies();
        setCompanies(response);
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchFavourites();
    fetchCompanies();
  }, []);

  return (
      <div className='space-y-4'>
        <MyCompany heading={'My Companies'} type={'myCompanies'} companies={companies} />
        <MyCompany
            heading={'My Favourites'}
            type={'myFavourites'}
            companies={myFavourites}
            onItemRemove={fetchFavourites}
        />
        {/*<Saved/>*/}
      </div>
  )
}

export default MyCompanies