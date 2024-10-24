import { useEffect, useState } from 'react';
import { Layout, Menu, Button, Dropdown, Image, Tooltip, Drawer, Typography } from 'antd';
import { MenuOutlined, MenuFoldOutlined } from '@ant-design/icons';
import { FaSignOutAlt, FaUser } from 'react-icons/fa';

const { Content, Sider } = Layout;

interface MenuItem {
  icon?: React.ReactNode;
  label: string;
  to: string;
  children?: MenuItem[];
}

interface AuthConfig {
  google: string;
  facebook: string;
  microsoft: string;
  apple: string;
  check: string;
  login: string;
  logout: string;
}

interface Config {
  auth: AuthConfig;
}

interface AppLayoutProps {
  children?: React.ReactNode;
  menuItems?: MenuItem[];
  sideBarItems?: MenuItem[];
  requireSession?: boolean;
  isPublic?: boolean;
  isCustomMain?: boolean;
  iframe?: string | null;
  key?: string;
  icon?: string;
  Loader?: React.ComponentType;
  onNavigate?: (path: string) => void;
}

const AppLayout = ({
  children,
  menuItems = [],
  sideBarItems = [],
  requireSession = true,
  isPublic = false,
  isCustomMain = false,
  iframe = null,
  key = '',
  Loader = () => null,
  onNavigate = () => {}
}: AppLayoutProps) => {
  const [hasSession, setHasSession] = useState<boolean>(false);
  const [username, setUsername] = useState<string>('');
  const [wasChecked, setWasChecked] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [mainDrawerVisible, setMainDrawerVisible] = useState<boolean>(false);
  const [sideDrawerVisible, setSideDrawerVisible] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth <= 768);
  const [collapsed, setCollapsed] = useState<boolean>(true);
  const isProduction = window.location.origin === 'https://vuamm.com.mx';

  const config: Config = {
    auth: {
      google: `https://vuamm.com.mx/dev/api/index.php/v1/login/google/${key}`,
      facebook: `https://vuamm.com.mx/dev/api/index.php/v1/login/facebook/${key}`,
      microsoft: `https://vuamm.com.mx/dev/api/index.php/v1/login/microsoft/${key}`,
      apple: `https://vuamm.com.mx/dev/api/index.php/v1/login/apple/${key}`,
      check: 'https://vuamm.com.mx/dev/api/index.php/v1/session',
      login: `https://vuamm.com.mx/dev/auth/#/${key}`,
      logout: `https://vuamm.com.mx/dev/api/index.php/v1/logout/${key}`
    }
  };

  useEffect(() => {
    if (isProduction) {
      handleCheckSession(requireSession);
    } else {
      setWasChecked(true);
      setHasSession(true);
      setUsername("Development");
    }

    const handleResize = () => {
      const newIsMobile = window.innerWidth <= 768;
      setIsMobile(newIsMobile);
      if (!newIsMobile) {
        setMainDrawerVisible(false);
        setSideDrawerVisible(false);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleCollapsed = () => setCollapsed(!collapsed);
  const goToLogin = () => window.location.href = config.auth.login;
  const toggleMainDrawer = () => setMainDrawerVisible(!mainDrawerVisible);
  const toggleSideDrawer = () => setSideDrawerVisible(!sideDrawerVisible);

  const handleCheckSession = async (requireSession: boolean) => {
    if (!requireSession) {
      setLoading(false);
      return;
    }
    setWasChecked(true);
    setLoading(true);

    try {
      const response = await fetch(config.auth.check, { credentials: 'include' });
      const data = await response.json();
      setHasSession(!data.error);
      setUsername(data.data?.user_name || '');
    } catch (e) {
      console.error(e);
      setHasSession(false);
    } finally {
      setLoading(false);
    }
  };

  const handleEndSession = () => {
    window.location.href = config.auth.logout;
    setTimeout(() => {
      setHasSession(false);
      setUsername('');
    }, 1000);
  };

  const renderSessionItem = ({ requireSession = true, hasSession = false }) => {
    if (!requireSession) return null;

    if (hasSession) {
      return (
        <Dropdown
          menu={{
            items: [
              {
                key: 'logout',
                label: 'Cerrar sesión',
                icon: <FaSignOutAlt />,
                onClick: handleEndSession
              }
            ]
          }}
          placement="bottomRight"
        >
          <Button 
            type="text"
            className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
          >
            <FaUser />
            <span>{username}</span>
          </Button>
        </Dropdown>
      );
    }

    return (
      <Button
        onClick={goToLogin}
        className="bg-[#923244] text-white hover:bg-[#923244]/90 rounded-lg px-4 py-2"
      >
        Iniciar sesión
      </Button>
    );
  };

  const handleMenuClick = (item: MenuItem) => {
    if (item.to) {
      if (item.to.includes('http')) {
        window.location.href = item.to;
      } else {
        onNavigate(item.to);
      }
    }
  };

  const renderItems = (items: MenuItem[]) => {
    return items.map((item, index) => ({
      key: index,
      icon: item.icon,
      label: item.label,
      onClick: () => handleMenuClick(item),
      children: item.children ? item.children.map(child => ({
        key: child.to,
        icon: child.icon,
        label: child.label,
        onClick: () => handleMenuClick(child)
      })) : undefined
    }));
  };

  const renderLayout = () => {
    <div className="min-h-screen bg-gray-50">
      <header className="fixed top-4 left-4 right-4 z-50 flex items-center justify-between bg-white/50 backdrop-blur-md rounded-2xl border-b-4 border-[#923244] shadow-md px-6 py-2">
        <div className="flex items-center space-x-4">
          <Tooltip title="Ir a VUAMM" placement="bottom">
            <Image 
              src="https://vuamm.com.mx/dev/admin/panel/assets/logoRojo-BaI8HPQb.png"
              alt="Logo" 
              preview={false} 
              width={50} 
              className="cursor-pointer"
              onClick={() => window.location.href = 'https://vuamm.com.mx/dev/'} 
            />
          </Tooltip>
          {!isPublic && (
            <Typography.Title level={2} className="text-[#923244] text-lg md:text-xl lg:text-2xl m-0">
              Administración
            </Typography.Title>
          )}
        </div>

        <div className="flex items-center space-x-4">
          <div className="md:hidden flex items-center space-x-2">
            {sideBarItems.length > 0 && !isPublic && (
              <Button
                type="text"
                icon={<MenuFoldOutlined />}
                onClick={toggleSideDrawer}
                className="text-[#923244]"
              />
            )}
            <Button
              type="text"
              icon={<MenuOutlined />}
              onClick={toggleMainDrawer}
              className="text-[#923244]"
            />
          </div>

          <Menu
            mode="horizontal"
            className="hidden md:flex bg-transparent"
            items={renderItems(menuItems)}
          />
          
          {renderSessionItem({ requireSession, hasSession })}
        </div>
      </header>

      <div className="pt-20 px-4">
        <Layout className="min-h-[calc(100vh-5rem)] bg-gray-50/80 backdrop-blur-md rounded-2xl">
          {!isMobile && sideBarItems.length > 0 && !isPublic && (
            <Sider 
              width={200} 
              collapsed={collapsed} 
              collapsible 
              onCollapse={toggleCollapsed}
              className="sticky top-20 bg-white/98 backdrop-blur-md rounded-2xl shadow-md"
            >
              <Menu
                mode="vertical"
                className="h-full p-2 border-0"
                items={renderItems(sideBarItems)}
              />
            </Sider>
          )}

          <Layout className="bg-transparent p-6">
            <Content className="bg-white/98 backdrop-blur-md rounded-2xl shadow-md p-8">
              {(() => {
                switch (true) {
                  case iframe !== null:
                    return (
                      <iframe
                        title="Vista"
                        src={iframe}
                        className="w-full h-full"
                      />
                    );
                  case isCustomMain:
                    return children;
                  default:
                    return children;
                }
              })()}
            </Content>
          </Layout>
        </Layout>
      </div>

      <Drawer
        title="Menú principal"
        placement="right"
        onClose={toggleMainDrawer}
        open={mainDrawerVisible}
        className="rounded-l-2xl mt-4"
      >
        <Menu
          mode="inline"
          className="border-0"
          items={renderItems(menuItems)}
        />
      </Drawer>

      {!isPublic && sideBarItems.length > 0 && (
        <Drawer
          title="Menú lateral"
          placement="left"
          onClose={toggleSideDrawer}
          open={sideDrawerVisible}
          className="rounded-r-2xl mt-4"
        >
          <Menu
            mode="inline"
            className="border-0"
            items={renderItems(sideBarItems)}
          />
        </Drawer>
      )}
    </div>
  }

  if (loading) return <Loader />;
  
  return (
    <>
      {(() => {
        if (loading) {
          return <Loader />;
        }

        switch (true) {
          case isProduction && !hasSession && requireSession && wasChecked:
            goToLogin();
            return null;
  
          case !isProduction:
            return renderLayout();
  
          case requireSession && wasChecked && hasSession:
            return renderLayout();
  
          case !requireSession:
            return renderLayout();
  
          default:
            return null;
        }
      })()}
    </>
  );
}

export { AppLayout };