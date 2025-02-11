import React from 'react'
import { useState, useEffect } from 'react'
const Profile = () => {
    const [profs, setProfs] = useState([])
    const [currPage, setCurrPage] = useState(1)
    const usrPerPage = 3
    useEffect(() => {
        const fetchProf = async () => {
            try {
                const resp = await fetch('https://dummyjson.com/users')
                const data = await resp.json()
                setProfs(data.users)
            } catch (error) {
                <h4>Error loading...</h4>
            }
        }
        fetchProf()
    }, [])
    const startIndex = (currPage - 1) * usrPerPage
    const endIndex = startIndex + usrPerPage
    const pagUsers = profs.slice(startIndex, endIndex)
    console.log("Usr per Page: ", pagUsers)

    const nextPage = () => {
        if (currPage < Math.ceil(profs.length / usrPerPage)) {
            setCurrPage(currPage + 1)
        }
    }
    const prevPage = () => {
        if (currPage > 1) {
            setCurrPage(currPage - 1)
        }
    }
    return (
        <div className='container m-3'>
            <h1 className='text-center'>Paginated User List</h1>
            <div className='d-flex justify-content-center align-item-center row m-3'>
                {pagUsers.map((prof) => (
                    <div className='col-12 col-sm-10 col-md-3 col-lg-3 mb-3' key={prof.id}>
                        <div className='card d-flex shadow align-items-center text-center p-3'>
                            <img src={prof.image} alt={prof.lastName} className='profimage' />
                            <h4>{prof.firstName} {prof.lastName}</h4>
                            <p><b className='text-center'>Email:</b> {prof.email} </p>
                            <p><strong>Phone:</strong> {prof.phone}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className='d-flex justify-content-center align-items-center mt-4'>
                <button onClick={prevPage} disabled={currPage === 1} className='btn btn-primary mx-2'>
                    « Prev
                </button>
                <div className='mx-1'>
                    {/* Page numbers */}
                    {[...Array(Math.ceil(profs.length / usrPerPage))].map((_, index) => {
                        const pageNum = index + 1;
                        return (
                            <button
                                key={pageNum}
                                className={`btn mx-1 ${currPage === pageNum ? 'btn-dark' : 'btn-outline-primary'}`}
                                onClick={() => setCurrPage(pageNum)}
                            >
                                {pageNum}
                            </button>
                        );
                    })}
                </div>
                <button
                    onClick={nextPage}
                    disabled={currPage === Math.ceil(profs.length / usrPerPage)}
                    className='btn btn-primary'
                >
                    Next »
                </button>
            </div>
        </div>
    )
}

export default Profile
