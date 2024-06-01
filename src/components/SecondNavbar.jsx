import React from 'react'

const SecondNavbar = ({pageName}) => {
    return (
        <div className='flex flex-row justify-between items-center'>
            <div>
                <h4 className='gray-icon text-sm'>Dashboard</h4>
            </div>

            <div className='gray-icon text-sm'>
                <h4>Dashboard / {pageName}</h4>
            </div>

        </div>
    )
}

export default SecondNavbar
