export const ADD = "ADD_TODO" as const
export const DELETE = "DELETE_TODE" as const


export type mainActionType = 
| ReturnType<typeof add_todo>
| ReturnType<typeof delete_todo>


let id: number = 1;

export const add_todo = (todo: any) => ({
        type: ADD,
        todo:  {
            id: id++,
            title: todo.title,
            isComplete: todo.isComplete,
        }
});

export const delete_todo = (id: number) => ({
        type: DELETE,
        id,
});


// interface mainAction {
//     type: string,
//     todo:{
//         id: number,
//         titile: any,
//         isComplete: any,
//     }
// }