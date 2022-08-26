import React, { useRef, useCallback,useState } from 'react';
import { useDispatch } from 'react-redux';
import Slider from 'react-slick';
import { closeModal, openModal } from '../../redux/action/modal';
import Modal from '../main/common/modal/modal';
import './list.scss';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const List = ({listType}:any) => {
    const sliderRef = useRef<any>(null)
    const dispatch = useDispatch()
    const [dragging, setDragging] = useState<boolean>(false);

    const handleBeforeChange = useCallback(() => {
        setDragging(true);
    },[setDragging])
    
    const handleAfterChange = useCallback(() => {
        setDragging(false);
    },[setDragging])


    const renderSlider = () => {
        let settings = {
            centerPadding: '60px',
            dots: true,
            speed: 200,
            slidesToScroll: 1,
            slidesToShow:3,
            initialSlide: 0,
            arrows: false,
            draggable: false,
            beforChange: handleBeforeChange,
            afterChange: handleAfterChange,
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
                    breakpoint: 1500,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2,
                        infinite: true,
                        dots: true
                    }
                },
                {
                    breakpoint: 980,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
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
                {renderSliderItem(listType)}
            </Slider>
        )

    }

    const modalAction = () => {
        dispatch(closeModal())
    }

    const renderSliderItem = (data:any) => {
        let render: any[] = [];
        data.forEach((item: any, idx: any) => {
            render.push(
                <div className='itemWrapper'
                    key={idx}
                    onClick={() => {
                        dispatch(openModal({ element: Modal, action: modalAction, content: item.fn, title: item.desc, video:item.gif }))
                    }}>
                    <img className='imgShow' src='/asset/인싸.jpg' alt="" />
                    <div className='listItem'>{item.title}</div>
                    <div>{item.time}</div>
                    <div>{item.stack}</div>
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