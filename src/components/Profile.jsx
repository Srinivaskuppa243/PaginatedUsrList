import React, { useState, useEffect } from 'react';

const Profile = () => {
    const [profs, setProfs] = useState([]);
    const [currPage, setCurrPage] = useState(1);
    const usrPerPage = 3;

    useEffect(() => {
        const fetchProf = async () => {
            try {
                const resp = await fetch('https://dummyjson.com/users');
                const data = await resp.json();
                setProfs(data.users);
            } catch (error) {
                console.error("Error loading...", error);
            }
        };
        fetchProf();
    }, []);

    const totalPages = Math.ceil(profs.length / usrPerPage);
    const startIndex = (currPage - 1) * usrPerPage;
    const pagUsers = profs.slice(startIndex, startIndex + usrPerPage);

    const nextPage = () => {
        if (currPage < totalPages) {
            setCurrPage(currPage + 1);
        }
    };

    const prevPage = () => {
        if (currPage > 1) {
            setCurrPage(currPage - 1);
        }
    };

    // Ensure pagination range is 3 numbers
    let startPage = Math.max(1, currPage);
    let endPage = Math.min(totalPages, startPage + 2);

    if (endPage - startPage < 2) {
        startPage = Math.max(1, endPage - 2);
    }

    const pageNums = [];
    for (let i = startPage; i <= endPage; i++) {
        pageNums.push(i);
    }

    return (
        <div className="container m-3">
            <h1 className="text-center">Paginated User List</h1>
            <div className="d-flex justify-content-center align-item-center row m-3">
                {pagUsers.map((prof) => (
                    <div className="col-12 col-sm-10 col-md-3 col-lg-3 mb-3" key={prof.id}>
                        <div className="card d-flex shadow align-items-center text-center p-3">
                            <img src={prof.image} alt={prof.lastName} className="profimage" />
                            <h4>{prof.firstName} {prof.lastName}</h4>
                            <p><b className="text-center">Email:</b> {prof.email} </p>
                            <p><strong>Phone:</strong> {prof.phone}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="d-flex justify-content-center align-items-center mt-4">
                <button onClick={prevPage} disabled={currPage === 1} className="btn btn-primary mx-2">
                    « Prev
                </button>
                <div className="pagnat">
                    {pageNums.map((pageVal) => (
                        <button
                            key={pageVal}
                            className={`btn mx-1 ${currPage === pageVal ? 'btn-dark' : 'btn-outline-primary'}`}
                            onClick={() => setCurrPage(pageVal)}
                        >
                            {pageVal}
                        </button>
                    ))}
                </div>
                <button
                    onClick={nextPage}
                    disabled={currPage === totalPages}
                    className="btn btn-primary mx-2"
                >
                    Next »
                </button>
            </div>
        </div>
    );
};

export default Profile;
