import React from 'react';
import Link from 'next/link';
import axios from 'axios';
import { Form, Input, notification } from 'antd';
import { useRouter } from 'next/router';

export default function Login() {
    // const router = useRouter();

    const handleLogin = async (values) => {
        try {
            const response = await axios.post('http://localhost:3000/api/auth/login', values);
            const { token } = response.data;

            // Save token to localStorage or cookies
            localStorage.setItem('authToken', token);

            notification.success({
                message: 'Login Successful',
                description: 'Welcome back!',
            });

            // Redirect to dashboard or homepage
            // router.push('/dashboard');
        } catch (error) {
            notification.error({
                message: 'Login Failed',
                description: error.response?.data?.message || 'Invalid credentials',
            });
        }
    };

    return (
        <div className="ps-my-account">
            <div className="container">
                <Form
                    className="ps-form--account"
                    onFinish={handleLogin}>
                    <ul className="ps-tab-list">
                        <li className="active">
                            <Link href={'/account/login'}>Login</Link>
                        </li>
                        <li>
                            <Link href={'/account/register'}>Register</Link>
                        </li>
                    </ul>
                    <div className="ps-tab active" id="sign-in">
                        <div className="ps-form__content">
                            <h5>Log In Your Account</h5>
                            <div className="form-group">
                                <Form.Item
                                    name="email"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your email!',
                                        },
                                    ]}>
                                    <Input
                                        className="form-control"
                                        type="email"
                                        placeholder="Email address"
                                    />
                                </Form.Item>
                            </div>
                            <div className="form-group form-forgot">
                                <Form.Item
                                    name="password"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your password!',
                                        },
                                    ]}>
                                    <Input
                                        className="form-control"
                                        type="password"
                                        placeholder="Password"
                                    />
                                </Form.Item>
                            </div>
                            <div className="form-group submit">
                                <button
                                    type="submit"
                                    className="ps-btn ps-btn--fullwidth">
                                    Login
                                </button>
                            </div>
                        </div>
                        <div className="ps-form__footer">
                            <p>Connect with:</p>
                            <ul className="ps-list--social">
                                <li>
                                    <a className="facebook" href="#">
                                        <i className="fa fa-facebook" />
                                    </a>
                                </li>
                                <li>
                                    <a className="google" href="#">
                                        <i className="fa fa-google-plus" />
                                    </a>
                                </li>
                                <li>
                                    <a className="twitter" href="#">
                                        <i className="fa fa-twitter" />
                                    </a>
                                </li>
                                <li>
                                    <a className="instagram" href="#">
                                        <i className="fa fa-instagram" />
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </Form>
            </div>
        </div>
    );
}
