import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/profile/profile.css'; // 引入 CSS 文件

const Profile = ({ userProfile }) => {
  const navigate = useNavigate();

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h2>用户信息</h2>
        <p><strong>用户id:</strong> {userProfile.userId}</p>

        <p><strong>姓名:</strong> {userProfile.name}</p>
        <p><strong>学校:</strong> {userProfile.school}</p>
        <p><strong>专业:</strong> {userProfile.major}</p>
        <p><strong>电话:</strong> {userProfile.phone}</p>
        <button className="back-button" onClick={() => navigate('/')}>返回主页</button>
      </div>
    </div>
  );
};


export default Profile;