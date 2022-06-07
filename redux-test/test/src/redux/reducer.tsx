import { ADD, DELETE, mainActionType } from "./actions";


type mainStateType = {
    todos: any[],
};

const initialState :mainStateType  = {
    todos: [],
};



export const reducer = (state = initialState, action: mainActionType) => {
    switch(action.type) {
        case ADD : {
            return {
                todos: [...state.todos, action.todo]
            };
        }
        case DELETE : {
            return { 
               todos: [...state.todos.filter((todo) => todo.id !== action.id)]
            };
        };
         default: {
           return {
               todos: [state]
        };  
      }
    }
    
}

// const reducer: (state: mainStateType | undefined, action: mainActionType) => any[] | {
//     todos: any[];
//     state?: undefined;
// } | {
//     state: mainStateType;
//     todos?: undefined;
// }

