'use client'
import React, { useEffect, useState } from 'react'
import FavProposal from './fav-proposal'
import { getMyFavsSourcingProposals, getMySourcingProposals } from "@/services/company";
import MySourcing from './my-sourcing';

const Sourcing = () => {

    const [myProposals, setMyProposals] = useState([]);
    const [favProposals, setFavProposals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchMyProposals = async () => {
        try {
            const response = await getMySourcingProposals();
            setMyProposals(response || []);
        } catch (err) {
            console.error("Error fetching my proposals:", err);
        }
    };

    const fetchFavProposals = async () => {
        try {
            const response = await getMyFavsSourcingProposals();
            setFavProposals(response || []);
        } catch (err) {
            console.error("Error fetching fav proposals:", err);
        }
    };

    const fetchSourcingData = async () => {
        setLoading(true);
        try {
            await Promise.all([fetchMyProposals(), fetchFavProposals()]);
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
            <MySourcing heading={'My Proposal'} type={'mySourcing'} proposals={myProposals} onItemRemove={fetchMyProposals} />
            <FavProposal
                heading={'My Favourites'}
                type={'myFavourites'}
                proposals={favProposals}
                onItemRemove={fetchFavProposals}
                onFavoriteToggle={fetchFavProposals}
            />
        </div>
    )
}

export default Sourcing
