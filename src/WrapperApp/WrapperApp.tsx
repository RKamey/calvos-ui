import React from 'react';
import { ConfigProvider } from 'antd';
import theme from '../config';
import '../index.css';

// Importaciones de locales de Ant Design
import es_ES from 'antd/lib/locale/es_ES';


interface WrapperAppProps {
  children: React.ReactNode;
}

export const WrapperApp = ({ children }: WrapperAppProps) => {
  return (
    <ConfigProvider locale={es_ES} componentSize='middle' theme={theme}>
      {children}
    </ConfigProvider>
  );
};