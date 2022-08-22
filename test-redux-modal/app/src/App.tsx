import React from 'react';
import Slider from "react-slick";
import styled from 'styled-components'
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Container = styled.div`
    margin-top: 10px;
    :not(:last-child) {
        margin-bottom: 50px;
    }
`;

const Wrapper = styled.div`
margin: 40px auto; 
width: 95%;
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

const App = () => {

  const renderSlider = () => {
    let settings = {
      dots: false,
      Infinity: true,
      speed: 300,
      slidesToShow: 5,
      slidesToScroll: 1,
      swipeToSlide:true,
      initialSlide: 0,
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
      <Slider {...settings}>
        {renderSliderItem()}
      </Slider>
    )
    
  }

  const  renderSliderItem = () => {
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
  


  return (
    <div className="App">
      <Container>
        <Wrapper>
          {renderSlider()}
        </Wrapper>
      </Container>
    </div>
  );
}

export default App;
