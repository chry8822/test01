export type ModalState = {
    show: boolean;
    content: string;
    title: string;
    actionType: string;
    action: Function | any;
    element: Function | any;
}

export const InitialModal: ModalState = {
    show: false,
    content: "",
    title: "",
    actionType: "",
    action:null,
    element:null
}