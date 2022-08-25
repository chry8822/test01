import React, { useRef, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import Slider from 'react-slick';
import { closeModal, openModal } from '../../redux/action/modal';
import Modal from '../main/common/modal/modal';
import './list.scss';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const List = () => {
    const sliderRef = useRef<any>(null)
    const dispatch = useDispatch()

    const renderSlider = () => {
        let settings = {
            centerPadding: '60px',
            dots: true,
            Infinity: true,
            speed: 100,
            slidesToScroll: 1,
            slidesToShow:4,
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
        let data: any[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        let render: any[] = [];
        data.forEach((item: any, idx: any) => {
            render.push(
                <div className='itemWrapper'
                    key={idx}
                    onClick={() => {
                        dispatch(openModal({ element: Modal, action: modalAction, content: item, title: item }))
                    }}>
                    <div className='listItem'>{item}</div>
                </div>
            )
        })
        return render
    }

    const sliderMove = useCallback((type?: any) => {
        if (type === "next") {
            return sliderRef?.current.slickNext();
        } else {
            return sliderRef?.current.slickPrev();
        }
    }, [])


    return (
        <>
            <div className='listWrap' >
                    {renderSlider()}
                    <button 
                        className='prevBtn'
                        onClick={()=> sliderMove()}
                    >
                        <ArrowBackIosIcon className='icon'/>
                    </button>
                    <button 
                        className='nextBtn'
                        onClick={()=> sliderMove("next")}
                    >
                        <ArrowForwardIosIcon className='icon'/>
                    </button>
            </div>
        </>
    )
}
export default List;