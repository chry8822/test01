import React,{ useState } from 'react';

const TestComponent = () => {
    const [showContent, setShowContent] = useState(-1);
    const [inputContent, setInputContent] =useState("");
    
    interface User {
        id: string;
        name: string;
        age: number;
        address: string;
    }

   
    const info = {
        id: "goggg8822",
        name: "chrys",
        age: 33,
        address: "goggg8822@naver.com"
    }

    function testFunction  (info :User)  {
        return (
            <ul>
                <li>
                    id: `${info.id}`
                </li>
                <li>
                    name: `${info.name}`
                </li>
                <li>
                    age: `${info.age}`
                </li>
                <li>
                    address: `${info.address}`
                </li>
            </ul>
        )
    }

    const toggleHandler = () => {
        if(showContent === -1) {
            setShowContent(1)
        } else {
            setShowContent(-1)
        }
    }

    const inputContentHandler = (e: any) => {
        const target = e.target.value;
        setInputContent(target)
    }


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setInputContent("");
    }


    return (
        <div>
            <button onClick={toggleHandler}>test button</button>
          {
              showContent === 1 ? 
              testFunction(info) :
              ""
          }
          <form onSubmit={handleSubmit}>
            <label htmlFor="testSub"></label>
            <input onChange={inputContentHandler} type="text" name='testSub'/>
            <button type='submit'>submit</button>
          </form>
          <div>{inputContent}</div>
        </div>
    )
}

export default TestComponent;