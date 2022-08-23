import { OPEN_MODAL, CLOSE_MODAL, ModalAction } from "../../action/modal";
import { ModalState, InitialModal } from '../../state/modal'

function modal(state:ModalState = InitialModal, action: ModalAction) {
    switch(action.type){
        case OPEN_MODAL:{
            return {
                ...state,
                ...action.payload,
                show:true
            }
        }
        case CLOSE_MODAL:{
            return InitialModal
        }
        default:
            return state;
    }
}

export default modal;