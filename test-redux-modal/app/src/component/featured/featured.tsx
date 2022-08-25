import React from 'react';
import Slider from 'react-slick';
import sliderData from './sliderData';

const Featured = () => {

    const renderBackgroundImg = () => {
        let settings = {
            autoplay:true,
            dots: true,
            Infinity: true,
            speed: 1000,
            autoplaySpeed: 2000,
            slidesToShow:1,
            swipeToSlide: true,
            initialSlide: 0,
            arrows: false,
            appendDots: () => (
                <div
                    style={{
                        display: "noen"
                    }}
                >
                </div>
            )
        }

        return (
            <Slider {...settings}>
                {
                    sliderData.map((item:any,idx:number) => {
                        return(
                            <img className='backImg' src={item.img}/>
                        )
                    })
                }
            </Slider>
        )
    }

    return(
        <>  
            <div className='featured'>
                <div className='sliderWrap'>
                    {renderBackgroundImg()}
                </div>
            </div>
        </>
    )
}

export default Featured;