import React from 'react';
import './listContainer.scss'

const ListContainer = (props:any) => {
    return(
        <>
            <div className='listWrapper'>
                {props.children}
            </div>
        </>
    )
}

export default ListContainer;