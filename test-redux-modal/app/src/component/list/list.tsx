import React, { useRef, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import Slider from 'react-slick';
import { closeModal, openModal } from '../../redux/action/modal';
import styled from 'styled-components';
import Modal from '../main/common/modal/modal';

const ItemWrap = styled.div`
    width: 200px;
    height: 150px;
    background-color:red;
    display:flex;
    color:white;
    position:relative;
    z-index:1;
    transition: all 0.3s;
    &:hover {
        background-color:black;
        transform: scale(1.5);
        z-index:9999;
    }
    `
// 리스트 아이템에 zindex 1 기본값 호버시 9999 로 좌우 아이템위로 올라탈수 있게
    
const Item = styled.div`
    position:absolute;
    top:50%;
    left:50%;
    transform: translate(-50%,-50%)
`

const StyleSlider = styled(Slider)`

.slick-slide > div {
  margin: 0 10px;
}
.slick-list {
  margin: 0 -10px;
}
`

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
            <StyleSlider {...settings} ref={sliderRef}>
                {renderSliderItem()}
            </StyleSlider>
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
                <ItemWrap
                    key={idx}
                    onClick={() => {
                        dispatch(openModal({ element: Modal, action: modalAction, content: item, title: item }))
                    }}>
                    <Item>{item}</Item>
                </ItemWrap>
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
            <div style={{position:"relative"}}>
                    {renderSlider()}
                    <button 
                        onClick={()=> sliderMove()}
                        style={{position:"absolute" ,left:"0", top:"0", height:"100%"}}    
                    >prev</button>
                    <button 
                        onClick={()=> sliderMove("next")}
                        style={{position:"absolute" ,right:"0", top:"0", height:"100%"}}    
                    >next</button>
            </div>
        </>
    )
}
export default List;