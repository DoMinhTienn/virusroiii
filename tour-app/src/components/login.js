import React, { useState, useContext } from 'react'
import { UserContext } from '../App'
import "../static/login.css"
import { Form, Button, Container, Alert, Row, Col, Navbar, ButtonToolbar } from 'react-bootstrap'
import { Navigate, useNavigate } from 'react-router-dom'
import fb from "../static/image/icons8-facebook.svg"
import gg from "../static/image/icons8-google.svg"
import gh from "../static/image/icons8-github-48.svg"
import Api, { authApi, endpoints } from '../configs/Api'
import cookies from 'react-cookies'
const Login = props => {
    const nav = useNavigate()
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()
    const [user, dispatch] = useContext(UserContext)

    const login = async (evt) => {
        
        evt.preventDefault()

        const res = await Api.post(endpoints['login'],{
            'username': username,
            'password': password,
            'client_id': 'Oc1krexXQRrf3LFRraEIhAlr1WrSyQl6QvfJdx4I',
            'client_secret': 'FO7uQpLz83QPPXSTew5vGhkMCtt8znhVNkCaYWJYjWqGhD0FP8kisZfqV5mvQHYFpxRoI1jkQ81aHB7G4YzbDPv8YJ57l96wZCTeluvOCfNoDThpCs9h7OtBXps5kJPK',
            'grant_type': 'password'
        })
        cookies.save('token', res.data.access_token)
        
        const user = await authApi().get(endpoints['current-user'])
        cookies.save('user',user.data)
        dispatch({
            'type': 'login',
            'payload': user.data
        })
    }
    const gotoSignup = (evt) => {
        evt.preventDefault()
        nav(`/signup`)
    }

    if (user != null)
        return <Navigate to="/" />

    return (
        <div className='signin-main'>
            <div className='bg-cover'></div>
            <div className='signin'>
                <div className='signform'>
                    <section className='title'>ĐĂNG NHẬP</section>
                    <section className='signM'>
                        <Form onSubmit={login}>
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
                            <Button className='submit' variant="primary" type="submit">
                                ĐĂNG NHẬP
                            </Button>
                        </Form>
                    </section>
                    <Row xs={2} className="row-account">
                        <Col>
                            <label class="switch" for="checkbox">
                                <input type="checkbox" id="checkbox" />
                                <div class="slider round"></div>
                            </label>
                            <span>Nhớ tài khoản</span>
                        </Col>
                        <Col><a className='qmk' href="#qmk">Quên mật khẩu?</a></Col>
                    </Row>
                    <h3 class="signM_social_head"><span>hoặc đăng nhập bằng</span></h3>
                    <Row xs={3} className="social">
                        <Col><img src={fb} /><div>Facebook</div></Col>
                        
                        <Col><img src={gg} /><div>Google</div></Col>
                        <Col><img src={gh} /><div>Github</div></Col>
                    </Row>
                    <section class="signM_bottom_bar clearfix">
                        <span>Bạn chưa có tài khoản? Đăng ký ngay!</span><a href="#" onClick={gotoSignup}>Đăng ký</a>
                    </section>
                </div>
            </div>
        </div>
    )
}

export default Login