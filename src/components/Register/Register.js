import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/login/login.css';
import Cookies from 'js-cookie';

const onFinish = async (values, navigate, setUserProfile) => {
    console.log('Success:', values);
    try {
        const response = await fetch('http://127.0.0.1:8000/user/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'accept': 'application/json'
            },
            body: new URLSearchParams({
                schoolname: values.schoolname,
                account: values.username,
                password: values.password,
                confirmPassword: values.confirmPassword,
                phone: values.phone
            })
        });

        if (response.ok) {
            const data = await response.json();
            const token = data.access_token;
            Cookies.set('token', token, { expires: 30 });

            const profileData = await fetchUserProfile(token);
            console.log('Profile Data:', profileData);

            // 保存用户信息到全局状态
            setUserProfile(profileData);

            // 跳转到受保护的页面
            navigate('/');
        } else {
            console.log('注册失败');
        }
    } catch (error) {
        console.error('注册失败:', error);
    }
}

const fetchUserProfile = async (token) => {
    // 模拟 API 请求
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                nickname: '张三',
                school: '清华大学',
                major: '计算机科学与技术',
                phone: '123-456-7890'
            });
        }, 1000);
    });
}

const Register = ({ setUserProfile }) => {
    const navigate = useNavigate();

    return (
        <div className='login-login-container'>
            <div className='login-blur-overlay'></div>
            <div className='login-backgroundImage'></div>
            <div className='login-centered'>
                <div className='login-card'>
                    <div className='login-card-title-word'>
                        注册
                    </div>
                    <div className='login-form-container'>
                        <RegisterForm navigate={navigate} setUserProfile={setUserProfile} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;

const RegisterForm = ({ navigate, setUserProfile }) => (
    <form
        name="register"
        className='login-form-container'
        onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const values = Object.fromEntries(formData.entries());
            values.formType = 'register';
            onFinish(values, navigate, setUserProfile);
        }}
    >
        <div className='login-form-item'>
            <input name="schoolname" className='login-input-style' placeholder='请输入学校名称' required />
        </div>
        <div className='login-form-item'>
            <input name="username" className='login-input-style' placeholder='请输入您的账号' required />
        </div>
        <div className='login-form-item'>
            <input type="password" name="password" className='login-input-style' placeholder='请输入您的密码' required />
        </div>
        <div className='login-form-item'>
            <input type="password" name="confirmPassword" className='login-input-style' placeholder='确认您的密码' required />
        </div>
        <div className='login-form-item'>
            <input name="phone" className='login-input-style' placeholder='请输入您的手机号' required />
        </div>
        <div className='login-form-item'>
            <button className='login-link-button' onClick={() => navigate('/login')}>
                已有账号？登录
            </button>
            <label>
                <input type="checkbox" name="remember" />
                记住我
            </label>
        </div>
        <div className='login-form-item'>
            <button type="submit" className='login-button-style'>注册</button>
        </div>
    </form>
);