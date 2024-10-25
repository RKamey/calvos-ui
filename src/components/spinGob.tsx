import { FC } from 'react';
import { Spin, Typography } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import mznLogo from '../assets/img/logoRojo.png';
import '../assets/styles/Loader.css';

const Loader: FC = () => {
    const antIcon = <LoadingOutlined style={{ fontSize: 80, color: 'rgba(0, 0, 0, 0.25)' }} spin />;

    return (
        <div className="loader-container">
            <div className="loader-content">
                <Spin indicator={antIcon} />
                <div className="logo-container">
                    <img 
                        src={mznLogo} 
                        alt="MZN Logo" 
                        className="logo-image"
                    />
                </div>
            </div>
            <Typography.Title
                level={4}
                className="loading-text"
            >
                Cargando contenido...<br />
                <br />
                Espera un momento...
            </Typography.Title>
        </div>
    );
}

export default Loader;