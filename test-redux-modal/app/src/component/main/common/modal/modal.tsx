import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux/store';
import { ModalState } from '../../../../redux/state/modal';

const Modal = () => {

    const modal: ModalState = useSelector((state: RootState) => state.modal) as ModalState

    return (
        <>
            <div className="popupWrap">
                <div>
                    <video className='popup_video' src={"/asset"+ modal.video} autoPlay loop muted={false} playsInline></video>
                </div>
                <div className="popupWrap__tit">
                    <h2><mark>{modal.title}</mark></h2>
                    <p>{modal.content}</p>
                </div>
                <div className="btnWrap">
                    <button 
                        type="button" 
                        className="btnColor"
                        onClick={()=>{
                            modal.action("close")
                        }}
                    >확인</button>
                </div>
            </div>
        </>
    )
}

export default Modal;