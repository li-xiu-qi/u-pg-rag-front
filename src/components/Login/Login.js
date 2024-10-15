import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import '../../styles/login/login.css';

// 登录表单提交处理函数
const onFinish = async (values, navigate, setUserProfile) => {
    console.log('Success:', values);
    try {
        // 发送登录请求
        const response = await fetch('http://127.0.0.1:8000/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'accept': 'application/json'
            },
            body: new URLSearchParams({
                account: values.username,
                password: values.password
            })
        });

        if (response.ok) {
            const data = await response.json();
            const token = data.access_token;
            // 将 token 存储在 Cookie 中，有效期为 30 天
            Cookies.set('token', token, { expires: 30 });

            // 获取用户信息
            const profileData = await fetchUserProfile(token);
            console.log('Profile Data:', profileData);

            // 保存用户信息到全局状态
            setUserProfile(profileData);

            // 跳转到受保护的页面
            navigate('/');
        } else {
            console.log('账号或密码错误');
        }
    } catch (error) {
        console.error('登录失败:', error);
    }
}

// 模拟获取用户信息的 API 请求
const fetchUserProfile = async (token) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                userId: 2,
                name: 'xiaoke',
                school: '东北石油大学',
                major: '计算机科学与技术',
                phone: '123456'
            });
        }, 100);
    });
}

// 登录组件
const Login = ({ setUserProfile }) => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = Cookies.get('token');
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                const currentTime = Date.now() / 1000;
                if (decodedToken.exp < currentTime) {
                    // Token 已过期，移除 token 并要求用户重新登录
                    Cookies.remove('token');
                } else {
                    // Token 有效，使用 token 获取用户信息
                    fetchUserProfile(token).then(profileData => {
                        setUserProfile(profileData);
                        navigate('/profile');
                    });
                }
            } catch (error) {
                console.error('Token 解码失败:', error);
                Cookies.remove('token');
            }
        }
    }, [navigate, setUserProfile]);

    return (
        <div className='login-login-container'>
            <div className='login-blur-overlay'></div>
            <div className='login-backgroundImage'></div>
            <div className='login-centered'>
                <div className='login-card'>
                    <div className='login-card-title-word'>
                        登陆后，为你答疑解惑
                    </div>
                    <div className='login-form-container'>
                        <LoginForm navigate={navigate} setUserProfile={setUserProfile} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;

// 登录表单组件
const LoginForm = ({ navigate, setUserProfile }) => (
    <form
        name="login"
        className='login-form-container'
        onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const values = Object.fromEntries(formData.entries());
            values.formType = 'login';
            onFinish(values, navigate, setUserProfile);
        }}
    >
        <div className='login-form-item'>
            <input name="username" className='login-input-style' placeholder='请输入您的账号' required />
        </div>
        <div className='login-form-item'>
            <input type="password" name="password" className='login-input-style' placeholder='请输入您的密码' required />
        </div>
        <div className='login-form-item'>
            <button className='login-link-button' onClick={() => navigate('/register')}>
                没有账号？注册
            </button>
            <label>
                <input type="checkbox" name="remember" />
                记住我
            </label>
        </div>
        <div className='login-form-item'>
            <button type="submit" className='login-button-style'>登录</button>
        </div>
    </form>
);