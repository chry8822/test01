import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux/store';
import { ModalState } from '../../../../redux/state/modal';

const Modal = () => {

    const modal: ModalState = useSelector((state: RootState) => state.modal) as ModalState

    return (
        <>
            <div className="popupWrap">
                <div className="popupWrap__delete">
                    <iframe id="ytplayer"  width="100%" height="100%"
                    src="https://www.youtube.com/embed/M7lc1UVf-VE?autoplay=1&origin=http://example.com"
                    frameBorder={"0"}></iframe>
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