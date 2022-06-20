import React,{useEffect, useState, useRef, useCallback} from 'react';
import styled from 'styled-components';
import { heroBackground } from '../../../assets';
import { Button } from '../../../components';
import moment from 'moment';

const S = {
  Background: styled.section`
    position: absolute;
    top: 0;
    width: 100%;
    height: 780px;
    background: no-repeat center/cover url(${heroBackground});
  `,
  Wrapper: styled.div`
    width: 100%;
    height: 100%;
    max-width: 1180px;
    padding-top: 100px;
    margin: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
  `,
  Title: styled.h1`
    ${props => props.theme.typography.title};
    color: #fff;
    margin-bottom: 0.5rem;
  `,
  Description: styled.p`
    ${props => props.theme.typography.description};
    color: ${props => props.theme.palette.white};
    margin-bottom: 2rem;
  `,
};

const formatDate = "YYYY-MM-DD";
let tempTimeFormat = "HH:mm:ss";



const Hero = () => {
   const [time,setTime] = useState()
   const [test,setTest] = useState()
  
  useEffect(() => {
    setTimeout(() => {
      setTime(moment().subtract(1, "second").format(tempTimeFormat))
    },1000);
  },[time])

  const phoneRef = useRef();
  let Phone = phoneRef.current

  const submitPhone = useCallback (()=> {
    console.log("123")
  },[])
  
  return (
    <S.Background>
      <S.Wrapper>
        <S.Title>
          <div>
            {moment().format(formatDate)} <br/> 
            {time}
          </div>
          <input type="text" id='text' ref={Phone}/>
          <input type="button" onClick={() => submitPhone()} value="확인" />
        </S.Title>
      </S.Wrapper>
    </S.Background>
  );
};

export default Hero;
