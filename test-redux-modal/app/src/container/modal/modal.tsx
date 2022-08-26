import React,{ useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../redux/action/modal';
import styled from 'styled-components';
import { CSSTransition } from 'react-transition-group';
import { RootState } from '../../redux/store';
import { ModalState } from '../../redux/state/modal';

const ModalWrap = styled.aside`
    &&& {
        .popup-enter {
            opacity: 0;
            transform: scale(0.7);
        }
        .popup-enter-active {
            opacity: 1;
            transform: scale(1);
            transition: all 0.3s ease-in-out;
        }
        .popup-exit {
            opacity: 1;
            transform: scale(1);
        }
        .popup-exit-active {
            opacity: 0;
            transform: scale(0.7);
            transition: all 0.2s ease-in-out;
        }
    }
`;

const Modal = () => {
    const dispatch = useDispatch();

    const modal:ModalState = useSelector((state: RootState) => state.modal) as ModalState

    useEffect(()=> {
        if(modal.show && modal.element){
            document.body.style.overflow = "hidden";
            window.addEventListener("popstate", modalOff);
            return () => {
                document.body.style.removeProperty("overflow");
                window.removeEventListener("popstate", modalOff)
            }
        }
    },[])

    useEffect(()=>{
        let popupBackground = document.getElementsByTagName("aside")
        const hidePopupBack = (e: any) => {
            if (e.currentTarget === popupBackground[0] && e.target == popupBackground[0]) {
                dispatch(closeModal())
            }
        }
        popupBackground[0].onclick = hidePopupBack
        return () => {
            popupBackground[0].onclick = null
        }
    },[])
   

    const modalOff = (e:any) => {
        if(e.target !== e.currentTarget){
            return;
        }
        dispatch(closeModal())
        console.log(e.target)
        console.log(e.currentTarget)
    }


    return (
            <ModalWrap className={("modal") + (modal.show && modal.element ? " active":"")}>
                <CSSTransition in={!!modal.element} mountOnEnter unmountOnExit timeout={600} classNames="modal">
                    {modal.element ? <modal.element/> : <></>}
                </CSSTransition>
            </ModalWrap>
     )
}

export default Modal;