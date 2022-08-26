import React from 'react';
import Slider from 'react-slick';
import sliderData from './sliderData';
import './featured.scss'

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
            <Slider className='imgSlick'{...settings}>
                {
                    sliderData.map((item:any,idx:number) => {
                        return(
                            <div className='imgWrapper'>
                                <img className='backImg' src={item.img}/>
                            </div>
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