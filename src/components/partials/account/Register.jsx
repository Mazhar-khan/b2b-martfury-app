import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';

import { Form, Input, message } from 'antd';
import { useRouter } from 'next/router';

export default function Register() {
    const [isMounted, setIsMounted] = useState(false);
    // const router = useRouter();

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const handleRegister = async (values) => {
        try {
            const response = await axios.post(
                'http://localhost:3000/api/auth/register',
                values
            );
            message.success(response.data.message);
            // router.push('/account/login');
        } catch (error) {
            message.error(error.response?.data?.message || 'Registration failed');
        }
    };

    if (!isMounted) {
        return null; // Prevent rendering until the client is mounted
    }

    return (
        <div className="ps-my-account">
            <div className="container">
                <Form onFinish={handleRegister}
                    className="ps-form--account"
                    onSubmit={(e) => e.preventDefault()}>
                    <ul className="ps-tab-list">
                        <li>
                            <Link href={'/account/login'}>Login</Link>
                        </li>
                        <li className="active">
                            <Link href={'/account/register'}>Register</Link>
                        </li>
                    </ul>
                    <div className="ps-tab active" id="register">
                        <div className="ps-form__content">
                            <h5>Register An Account</h5>
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
                                            message:
                                                'Please input your password!',
                                        },
                                    ]}>
                                    <Input
                                        className="form-control"
                                        type="password"
                                        placeholder="Password..."
                                    />
                                </Form.Item>
                            </div>
                            <div className="form-group submit">
                                <button
                                    type="submit"
                                    className="ps-btn ps-btn--fullwidth"
                                    >
                                    Register
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
