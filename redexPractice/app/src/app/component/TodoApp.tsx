import React,{ useState, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux';
import styled from 'styled-components'
import { addTodo, removeTodo, toggleTodo } from '../redux/action/todos';
import moment from 'moment'

const Container = styled.div`
width:100%;
height:100%;
display: flex;
justify-content: center
`

const Wrapper = styled.div`
// width: 100%;
// height: 100%;
background-color: #f9df9d;
font-family: 'Oswald', sans-serif;
display:flex;
flex-direction: column;
position: absolute;
// justify-content: space-between;
padding: 20px;
`
const Title = styled.div`
font-size: 50px;
font-weigth: 700;
`

const ListWrapper = styled.div`
text-align: center;
height: 100%;
width:500px;
padding: 20px 0 20px 0
`         
const AddList = styled.div`

`

const Button = styled.button`
appearance: none;
background-color: transparent;
border: none;
cursor: pointer;
font-size: 50px
`
const ButtonRemove = styled.button`
appearance: none;
background-color: transparent;
border:none;
border-left: 1px solid black;
cursor: pointer;
padding-left:10px;
`

const AddInput = styled.input`
width:100%;
height: 30px;
border: 2px solid rgba(0,0,0,0.3);
background-color: transparent;
`

const InputContent = styled.div`
display: flex;
justify-content: space-between;
font-size:50px;
font-weight: 200
`

const TodoItem = styled.div`
padding:10px;
border: 1px solid black;
margin-bottom: 10px;
display: flex;
justify-content: space-between;
`

const TitleContent = styled.div`
display: flex;
justify-content:space-between;
border-bottom: 1px solid black;
padding-bottom: 10px;
`
const TitleDate = styled.span`
align-self :flex-end;
`

const TodoApp = () => {
    const todos = useSelector((state: RootState) => state.todoReducer);
    const dispatch = useDispatch();

    const [input, setInput] = useState("");
    
    const today = useMemo(()=> {
        console.log("dd")
       return moment().format("YYYY-MM-DD")
    },[moment().format("DD")]) 
   

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(input === "" || input === undefined || input === null){
            return
        }
        dispatch(addTodo(input));
        setInput("");
    }

    const renderTodoList = () => {
    return todos.map((item:any,idx:any) => {
            return (
                <TodoItem key={idx}>
                    <span>
                        {item.text}
                    </span>
                    <ButtonRemove
                        onClick={()=>
                            dispatch(removeTodo(item.id))
                        }
                    >REMOVE</ButtonRemove>
                </TodoItem>
            )
        })
    }

    return (    
        <>
           <Container>
                <Wrapper>
                   <TitleContent>
                        <Title>
                            TodoList
                        </Title>
                        <TitleDate>
                            {today}
                        </TitleDate>
                   </TitleContent>
                    <ListWrapper>
                        {renderTodoList()}
                    </ListWrapper>
                    <AddList>
                        <form onSubmit={(e)=> handleSubmit(e)}>
                            <InputContent>
                                <div>ADD</div>
                                <Button>+</Button>
                            </InputContent>
                            <AddInput 
                                type="text" 
                                value={input}
                                onChange={(e)=>
                                    setInput(e.target.value)
                                }    
                                />
                        </form>
                    </AddList>
              </Wrapper>
           </Container>
        </>
    )
}

export default TodoApp;