import React,{useRef, useMemo, useCallback, useEffect} from 'react';
import Slider from "react-slick";
import styled from 'styled-components'
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './App.css'
import { useDispatch } from 'react-redux';
import Modal from '../../component/main/common/modal/modal'
import { closeModal, openModal } from '../../redux/action/modal';

const Container = styled.div`
    margin-top: 10px;
    :not(:last-child) {
        margin-bottom: 50px;
    }
`;

const Wrapper = styled.div`
margin: 40px auto; 
width: calc(90% + 40px);
position: relative;

`;


const H3 = styled.div`
  margin: 10px; 
  background-color: red;
  line-height: 100px;
  color: white;
  font-size: 20px;
  font-weight: 500;
  text-align:center
`;

const ButtonWrapper = styled.div`
  display: block;
`;

const PrevButton = styled.div`
  top:0;
  width: 40px;
  height: 100%;
  position: absolute;
  cursor: pointer;
  background-repeat: no-repeat;
  font-size: 0;
  text-indent: -9999px;
  z-index: 3;
  left: 0;
  background-color: gray;
  opacity: 0.5;
  transition: all 0.3s;
  &:hover {
    opacity: 1;
  }
  `


  const NextButton = styled.div`
  top:0;
  right: 0;
  width: 40px;
  height: 100%;
  position: absolute;
  cursor: pointer;
  background-repeat: no-repeat;
  font-size: 0;
  text-indent: -9999px;
  z-index: 3;
  background-color: gray;
  opacity: 0.5;
  transition: all 0.3s;
  &:hover {
    opacity: 1;
  }
  `

  const ItemWrapper = styled.div`
    cursor:pointer 
  `

const App = () => {

  const testRef = useRef<any>(null)
  const sliderRef = useRef<any>(null)
  const dispatch = useDispatch()

  const renderSlider = () => {
    let settings = {
      dots: true                                                                                                                          ,
      Infinity: true,
      speed: 100,
      slidesToShow: 5,
      slidesToScroll: 1,
      swipeToSlide:true,
      initialSlide: 0,
      arrows:false,
      appendDots:() => (
        <div
          style={{
            display:"noen"
          }}
        >
        </div>
      ),
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    }
    return (
      <Slider {...settings} ref={sliderRef}>
        {renderSliderItem()}
      </Slider>
    )
    
  }

  const modalAction = () => {
    dispatch(closeModal())
  }

  const renderSliderItem = () => {
    let data: any[] = [1,2,3,4,5,6,7,8,9,10]
    let render: any[] = [];
    data.forEach((item: any, idx:any) => {
      render.push (
        <ItemWrapper 
          key={idx}
          onClick={()=>{
            dispatch(openModal({element:Modal, action:modalAction, content:item, title:item }))
          }}
          ><H3>{item}</H3></ItemWrapper>
        )
      })
    return render
  } 

  const sliderMove = useCallback((type?:any) => {
     if(type === "next"){
      return sliderRef?.current.slickNext();
     }else{
      return sliderRef?.current.slickPrev();
     }
  },[]) 

  useEffect(()=>{
    const test = (e:any) => {
      // console.log("tartget",e.target)
      console.log(e.target.id)
    }
    window.addEventListener("mouseover", test);
    return ()=>{
      window.removeEventListener("mouseover",test)
    }

  },[])
  


  return (
    <div className="App">
      <Container>
        <Wrapper>
          <div ref={testRef}>
            {renderSlider()}
            {renderSlider()}
          </div>
          <ButtonWrapper>
            <PrevButton onClick={()=> {
              sliderMove()
            }}></PrevButton>
            <NextButton onClick={()=> {
              sliderMove("next")
            }}></NextButton>
          </ButtonWrapper>
        </Wrapper>
      </Container>
    </div>
  );
}

export default App;
