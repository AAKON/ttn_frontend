'use client'
import React, { useEffect, useState } from 'react'
import FavProposal from './fav-proposal'
import { getMyFavsSourcingProposals } from "@/services/company";

const Sourcing = () => {

    const [favProposals, setFavProposals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    const fetchSourcingData = async () => {
        setLoading(true);
        try {
            const response = await getMyFavsSourcingProposals();
            setFavProposals(response);
        } catch (err) {
            setError(err.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSourcingData();
    }, []);

    return (
        <div className='space-y-4'>
            <FavProposal
                heading={'My Favourites'}
                type={'myFavourites'}
                proposals={favProposals}
                onItemRemove={fetchSourcingData}
            />
        </div>
    )
}

export default Sourcing
