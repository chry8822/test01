import React from 'react';
import './nav.scss'

const NavBar = () => {
    return (
        <>
            <div className='navbar'>
                <div className='container'>
                    <div className='left'>
                        <img src={process.env.PUBLIC_URL + '/asset/mainlogo.png'} alt="" />
                        <div className='links'>
                            <a className='git' href="https://github.com/chry8822" target="_blank">
                                <img src={process.env.PUBLIC_URL + 'asset/깃허브.png'} />
                            </a>
                            <a className='story' href="https://covelope.tistory.com/" target="_blank">
                                <img src={process.env.PUBLIC_URL + 'asset/티스토리.png'} />
                            </a>
                        </div>
                    </div>
                    <div className='right'>
                    </div>  
                </div>
            </div>
        </>
    )
}

export default NavBar