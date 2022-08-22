import React,{useRef, useMemo, useCallback} from 'react';
import Slider from "react-slick";
import styled from 'styled-components'
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './App.css'

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

const App = () => {

  const sliderRef = useRef<any>(null)


  const renderSlider = () => {
    let settings = {
      dots: false,
      Infinity: true,
      speed: 100,
      slidesToShow: 5,
      slidesToScroll: 1,
      swipeToSlide:true,
      initialSlide: 0,
      arrows:false,
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

  const renderSliderItem = () => {
    let data: any[] = [1,2,3,4,5,6,7,8,9,10]
    let render: any[] = [];
    data.forEach((item: any, idx:any) => {
      render.push (
        <div style={{textAlign:"center"}} key={idx}><H3>{item}</H3></div>
        )
      })
      console.log(render)
    return render
  } 

  const sliderMove = useCallback((type?:any) => {
     if(type === "next"){
      return sliderRef?.current.slickNext();
     }else{
      return sliderRef?.current.slickPrev();
     }
  },[]) 
  


  return (
    <div className="App">
      <Container>
        <Wrapper>
          {renderSlider()}
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
