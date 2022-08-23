export const OPEN_MODAL = "open/Modal" as const;
export const CLOSE_MODAL = "close/Modal" as const;



export interface OpenModalType {
    content?: string,
    title?: string,
    actionType?: string | any,
    action?:(type: string, result?:any) => void,
    element:() => JSX.Element
}


export const openModal = ({...props}:OpenModalType) => ({
    type: OPEN_MODAL,
    payload: props
}) 

export const closeModal = () => ({
    type: CLOSE_MODAL
})


export type ModalAction = | ReturnType<typeof openModal> | ReturnType<typeof closeModal>