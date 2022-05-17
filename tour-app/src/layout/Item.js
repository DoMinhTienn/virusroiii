import React, { memo } from 'react'
import { Nav, Navbar } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import "../static/item.css"

const Item = (props) => {
    const nav = useNavigate()
    const gotoTour = (evt) => {
        evt.preventDefault()
        nav(`/tours/${props.id}`)
    }

    return (
        <Nav className='tour-item'>
            <Navbar className='tour-img'><img src={props.images} /></Navbar>
            <Navbar className='tour-name'>
                <a href='#' onClick={gotoTour}>{props.name}</a>
                <p>Điểm khởi hành: {props.startingPOS}</p>
                <p>Điểm đến: {props.endPOS}</p>
                <p>Thời gian diễn ra: {props.numberofdays} ngày</p>
            </Navbar>
            <Navbar className='tour-price'>
                <p>Giá chỉ từ</p>
                <div><span>{props.price}₫</span> /Khách</div>
                <button className='order'>Đặt Ngay</button>
            </Navbar>

        </Nav>
    )
}

export default memo(Item)