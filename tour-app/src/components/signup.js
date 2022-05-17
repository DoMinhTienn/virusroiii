import React, { useState } from "react";
import "../static/login.css"
import { Form, Button, Container, Alert, Row, Col, Navbar, ButtonToolbar } from 'react-bootstrap'
import { Navigate, useNavigate} from 'react-router-dom'
import fb from "../static/image/icons8-facebook.svg"
import gg from "../static/image/icons8-google.svg"
import gh from "../static/image/icons8-github-48.svg"
import Api, { endpoints } from "../configs/Api";

const Signup = () => {
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()
    const [confirmPassword, setConfirmPassword] = useState()
    const [firstName, setFirstName] = useState()
    const [lastName, setLastName] = useState()
    const [email, setEmail] = useState()
    const nav = useNavigate()


    const Signup = (evt) => {
        evt.preventDefault()
        const singupUser = async () => {
            const formData = new FormData()
            formData.append("username", username)
            formData.append("password", password)
            formData.append("email", email)
            formData.append("first_name", firstName)
            formData.append("last_name", lastName)

            const res = await Api.post(endpoints['signup'], formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
            console.info(res.data)
            nav(`/login`)
        }
        if (password !== null && password === confirmPassword) {
            singupUser()
        }
    }

    const gotoLogin = (evt) => {
        evt.preventDefault()
        nav(`/login`)
    }


    return (
        <div className='signin-main'>
            <div className='bg-cover'></div>
            <div className='signin'>
                <div className='signform'>
                    <section className='title'>ĐĂNG KÝ</section>
                    <section className='signM'>
                        <Form onSubmit={Signup}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="text"
                                    value={username}
                                    onChange={(evt) => setUsername(evt.target.value)}
                                    placeholder="Nhập username" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password"
                                    value={password}
                                    onChange={(evt) => setPassword(evt.target.value)}
                                    placeholder="Nhập Password" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control type="password"
                                    value={confirmPassword}
                                    onChange={(evt) => setConfirmPassword(evt.target.value)}
                                    placeholder="Confirm Password" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email"
                                    value={email}
                                    onChange={(evt) => setEmail(evt.target.value)}
                                    placeholder="Email" />
                            </Form.Group>
                            <Row>
                                <Col xs={6}>
                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                        <Form.Label>Last Name</Form.Label>
                                        <Form.Control type="text"
                                            value={lastName}
                                            onChange={(evt) => setLastName(evt.target.value)}
                                            placeholder="Last Name" />
                                    </Form.Group>
                                </Col>
                                <Col xs={6}>
                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                        <Form.Label>First Name</Form.Label>
                                        <Form.Control type="text"
                                            value={firstName}
                                            onChange={(evt) => setFirstName(evt.target.value)}
                                            placeholder="First Name" />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Button className='submit' variant="primary" type="submit">
                                ĐĂNG KÝ
                            </Button>
                        </Form>
                    </section>
                    <section class="signM_bottom_bar clearfix">
                        <span>Bạn đã có tài khoản? Đăng nhập ngay! </span><a href="#" onClick={gotoLogin}>Đăng Nhập</a>
                    </section>
                </div>
            </div>
        </div>
    )
}

export default Signup