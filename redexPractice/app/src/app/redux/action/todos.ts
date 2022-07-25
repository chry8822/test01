export const ADD_TODO = "todo/ADD_TODO" as const;
export const REMOVE_TODO = "remove/REMOVE_TODO" as const;
export const TOGGLE_TODO = "toggle/TOGGLE_TODO" as const;
// Type Assertions(현재 나타내는 타입보다 더 구체적인 타입을 나타내려 할 때 이용)

// 액션 객체를 리턴하는 액션 함수(파라미터를 받아오기 위해서 함수로 정의)
// type을 가진 객체만 리턴하면됨 type 이 상태를 바꾸기 위한 트리거
export const addTodo = (text:string) => ({
    type: ADD_TODO,
    payload: text
})

export const removeTodo = (id: number) => ({
    type : REMOVE_TODO,
    payload: id
})

export const toggleTodo = (id: number) => ({
    type : TOGGLE_TODO,
    payload: id
})


// ReturnType --> 타입스크립트의 특정함수의 반환 타입을 추출해내는 제네릭 타입으로
// 이를 통해 interface 중복작성을 피할 수 있다.
// 리턴되는 값의 타입을 타입으로 가짐
export type TodoAction = 
| ReturnType<typeof addTodo> 
| ReturnType<typeof removeTodo> 
| ReturnType<typeof toggleTodo> 

//
export type Todo = {
    id: number;
    text: string;
    isToggle: boolean
};


export type Todos = Todo[];

export const initialState: Todos = [
    {
        id:0,
        text:"typescript todolist",
        isToggle:false
    },
    {
        id:1,
        text:"typescript redux",
        isToggle:false
    }
    
]