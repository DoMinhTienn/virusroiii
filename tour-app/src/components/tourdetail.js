
import React, { useContext, useEffect, useState } from 'react'
import { Col, Container, Row, Carousel } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { UserContext } from '../App'
import Api, { authApi, endpoints } from '../configs/Api'
import "../static/tourdetail.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faThumbsUp } from "@fortawesome/free-solid-svg-icons"


const Tourdetail = () => {
    const { tourId } = useParams()
    const [tour, setTour] = useState(null)
    const [user, dispatch] = useContext(UserContext)
    const [comments, setComments] = useState([])

    useEffect(() => {
        const loadTourById = async () => {
            let res;
            if (user !== null) {
                res = await authApi().get((endpoints['tour-detail'](tourId)));
            } else {
                res = await Api.get(endpoints['tour-detail'](tourId))              
            }
                

            console.info(res.data)
            setTour(res.data)
        }

        loadTourById()

    }, [])

    useEffect(() => {
        const loadComments = async () => {
            const res = await Api.get(endpoints['comments-tour'](tourId))
            setComments(res.data)
        }

        loadComments()
    }, [comments])

    return (
        <Container className="font">
            <h1 className="name" onClick={() => console.log(comments)}>{tour && tour.name}</h1>
            <div>Like</div>

            <h3>a</h3>
            <Row>
                <Col xs={6}>

                    <Carousel>
                        {tour && tour.images && tour.images.map(img =>
                            <Carousel.Item className="cr">
                                <img
                                    className="d-block w-100"
                                    src={img.link}
                                    alt="First slide"
                                />
                            </Carousel.Item>
                        )}


                    </Carousel>
                </Col>
                <Col xs={6}>
                    <div dangerouslySetInnerHTML={tour && { __html: tour.content }}></div>
                </Col>
            </Row>
        </Container>
    )
}
export default Tourdetail