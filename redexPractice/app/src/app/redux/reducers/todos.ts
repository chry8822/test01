import { initialState,ADD_TODO, REMOVE_TODO, TodoAction, Todos, TOGGLE_TODO } from "../action/todos";

export default function todoReducer(state: Todos = initialState, action: TodoAction): Todos {
    switch(action.type){
        case ADD_TODO:
             // 현재 있는 리스트 중 가장 큰 id값에 +1 한다.
            const id = Math.max(...state.map((todo) => todo.id)) + 1
            return state.concat({
                id,
                text: action.payload,
                isToggle: false
            });
        case REMOVE_TODO:
            // 삭제할 요소와 다른 나머지 아이템을 배열로 리턴
            return state.filter((todo) => todo.id != action.payload);
        case TOGGLE_TODO:
            return state.map((todo) => 
                todo.id === action.payload ?
                {...todo, isToggle: !todo.isToggle} :
                todo
            );

        default:
            return state;
    }
}