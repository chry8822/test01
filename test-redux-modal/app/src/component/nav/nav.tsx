import React from 'react';
import './nav.scss'

const NavBar = () => {
    return (
        <>
            <div className='navbar'>
                <div className='container'>
                    <div className='left'>
                        <img src={process.env.PUBLIC_URL + '/asset/mainlogo.png'} alt="" />
                    </div>
                    <div className='right'>
                    </div>  
                </div>
            </div>
        </>
    )
}

export default NavBar