'use client'
import React, {useEffect, useState} from 'react'
import MyCompany from './my-company'
import Saved from './saved'
import {getMyCompanies} from "@/services/company";

const MyCompanies = () => {

  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

    fetchCompanies();
  }, []);

  return (
      <div className='space-y-4'>
        <MyCompany companies={companies} />
        {/*<Saved/>*/}
      </div>
  )
}

export default MyCompanies