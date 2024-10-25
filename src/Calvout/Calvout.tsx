import { useEffect, useState } from 'react';
import { Layout, Menu, Breadcrumb, Button, Dropdown, Image, Tooltip, Drawer, Typography, Avatar } from 'antd';
import { ArrowLeftOutlined, HomeOutlined, MenuOutlined, MenuFoldOutlined } from '@ant-design/icons';
import { FaSignOutAlt } from 'react-icons/fa';
import icon from '../assets/img/logoRojo.png';
import '../assets/styles/layout.css';
import Loader from '../components/spinGob';
// import config from '../data/config.json';
// import { get } from '../assets/js/utils/Request.js';
// import { capitalize } from '../assets/js/utils/Capitalize.js';;

const { Header, Content, Sider } = Layout;

const Calvout = ({
  children: children = null,
  menuItems = [],
  sideBarItems = [],
  requireSession = true,
  isPublic = false,
  isCustomMain = false,
  showNavigation = false,
  showBackButton = false,
  iframe = null,
  key = null,
}) => {
  const [hasSession, setHasSession] = useState(false);
  const [username, setUsername] = useState('');
  const [wasChecked, setWasChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mainDrawerVisible, setMainDrawerVisible] = useState(false);
  const [sideDrawerVisible, setSideDrawerVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [collapsed, setCollapsed] = useState(true);
  const isProduction = window.location.origin === 'https://vuamm.com.mx';

  const config = {
    auth: {
      login: 'https://vuamm.com.mx/dev/auth/#/'+key,
      logout: 'https://vuamm.com.mx/dev/api/index.php/v1/logout/'+key,
      check: 'https://vuamm.com.mx/dev/api/index.php/v1/session/'
    }
  };

  // Request get
  const get = async (url: string, options: RequestInit) => {
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
  };

  const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

  useEffect(() => {

    if (isProduction) {
      handleCheckSession(requireSession);
    } else {
      setWasChecked(true);
      setHasSession(true);
      setUsername("Development Ochoa")
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
    handleResize(); // Call it initially
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    handleChangePageTitle(location.pathname);
  }, [location]);

  /*
  const backNavigation = () => {
    const path = location.pathname;
    const pathsAdmin = ['/administracion/', '/administracion/areas', '/administracion/tramites', '/administracion/puestos', '/administracion/requisitos'];
    const pathsOperaciones = ['/operaciones/', '/operaciones/usuarios', '/operaciones/modulos', '/operaciones/perfiles'];
    const dynamicAreaRegex = /^\/administracion\/areas\/\d+$/;

    //Hacer una lógica con recursividad
    const navigateBack = (path: string) => {
      if (path === '/administracion' || path === '/operaciones') {
        navigate('/');
      } else if (pathsAdmin.includes(path) || dynamicAreaRegex.test(path)) {
        navigate('/administracion');
      } else if (pathsOperaciones.includes(path)) {
        navigate('/operaciones');
      } else {
        navigate(-1);
      }
    };

    navigateBack(path);
  };*/

  const backNavigation = () => window.history.back();
  const decodePath = (path:string) => decodeURIComponent(path);
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
      const response = await get(config.auth.check, { credentials: 'include' });
      setHasSession(!response.error);
      setUsername(response.data.user_name || '');
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

  const handleChangePageTitle = (path: string) => {
    const segments = path.split('/').filter(segment => segment);
    if (segments.length === 0) return 'Inicio';
    const lastSegment = segments[segments.length - 1];
    const title = capitalize(decodePath(lastSegment).replace(/-/g, ' '));
    document.title = `VUAMM | ${title}`;
  };

  // //Si el usuario tiene muchos nombres, se puede hacer un split y tomar el primer nombre o primer palabra
  // const usernameSplit = username.split(' ');

  const renderSessionItem = ({ requireSession = true, hasSession = false }) => {
    if (!requireSession) return null;

    if (hasSession) {
      return (
        <Dropdown
          menu={{
            items: [
              {
                type: 'group',
                label: <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Avatar size="small" style={{ backgroundColor: '#A6802E' }}>
                    {username.charAt(0).toUpperCase()}
                  </Avatar>
                  {username}
                </div>
              },
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
          <Avatar size="large" className="user-avatar" style={{ backgroundColor: '#A6802E', verticalAlign: 'middle' }}>
            {username.charAt(0).toUpperCase()}
          </Avatar>
        </Dropdown>
      );
    } else {
      return (
        <Button type="primary" onClick={goToLogin} className="login-button">
          Iniciar sesión
        </Button>
      );
    }

  };

  interface MenuItem {
    to?: string;
    icon?: React.ReactNode;
    label: React.ReactNode;
    children?: MenuItem[];
  }

  const handleMenuClick = (item: MenuItem) => {
    if (item.to) {
      //Revisar que si es un link externo no se haga el navigate sino el window.location.href
      if (item.to.includes('http')) 
        window.location.href = item.to;
      // } else {
      //   // navigate(item.to);
        
      // }
    }
  };

  const renderItems = (items: MenuItem[]) => {
      return items.map((item: MenuItem, index: number) => {
        return {
          key: item.to || index.toString(),
          icon: item.icon || null,
          label: item.label,
          onClick: () => handleMenuClick(item),
          children: item.children ? item.children.map((child: MenuItem) => ({
            key: child.to || '',
            icon: child.icon,
            label: child.label,
            onClick: () => handleMenuClick(child)
          })) : null
        };
      }
    );
  }

  const renderLayout = ({ isMobile = false, requireSession = true, sideBarItems = [], menuItems = [], isPublic = true, isCustomMain = false, children = null, hasSession = false, showBackButton = true, showNavigation = false }) => {

    return (
      <Layout>
        <Header className="app-header">
          <div className="header-left">
            <div className="logo">
              <Tooltip title="Ir a VUAMM" placement="bottom">
                <Image src={icon} alt="Logo" preview={false} width={50} onClick={() => window.location.href = 'https://vuamm.com.mx/dev/'} />
              </Tooltip>
            </div>
            <Typography.Title level={2} className="app-title">{!isPublic && "Administración"}</Typography.Title>
          </div>
          <div className="header-right">
            <div className="mobile-menu-buttons">
              {sideBarItems.length > 0 && !isPublic && (
                <Button
                  type="text"
                  icon={<MenuFoldOutlined />}
                  onClick={toggleSideDrawer}
                  className="mobile-menu-button side-menu-button"
                />
              )}
              <Button
                type="text"
                icon={<MenuOutlined />}
                onClick={toggleMainDrawer}
                className="mobile-menu-button main-menu-button"
              />
            </div>
            <Menu
              mode="horizontal"
              defaultSelectedKeys={[location.pathname]}
              className="desktop-menu"
              items={renderItems(menuItems)}
            />
            {renderSessionItem({ requireSession: requireSession, hasSession: hasSession })}
          </div>
        </Header>

        <Layout>
          {!isMobile && sideBarItems.length > 0 && !isPublic && (
            <Sider width={200} collapsed={collapsed} collapsible onCollapse={toggleCollapsed}>
              <Menu
                mode="vertical"
                defaultSelectedKeys={[location.pathname]}
                defaultOpenKeys={['sub1']}
                className="sidebar-menu"
                items={renderItems(sideBarItems)}
              />
            </Sider>
          )}

          <Layout className="main-content-layout">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                {location.pathname !== '/' && showBackButton && (
                  <Button
                    icon={<ArrowLeftOutlined />}
                    onClick={backNavigation}
                    className="back-button"
                    style={{ marginRight: '10px' }} // Espacio entre el botón y el breadcrumb
                  >
                    Volver
                  </Button>
                )}
                {showNavigation && (
                  <Breadcrumb
                    className="breadcrumb"
                    items={breadcrumbItems.map(item => ({
                      title: item.title
                    }))}
                  />
                )}
              </div>
            </div>

            {(() => {
              switch (true) {
                case iframe !== null:
                  return (
                    <iframe
                      title="Vista"
                      src={iframe}
                      style={{
                        width: "100%",
                        height: "100%"
                      }}
                    ></iframe>
                  );
                case isCustomMain:
                  return children;
                default:
                  return (
                    <Content className="main-content">
                      {/* <Outlet /> */}
                      {children}
                    </Content>
                  );
              }
            })()}
          </Layout>

        </Layout>

        <Drawer
          title="Menú principal"
          placement="right"
          onClose={toggleMainDrawer}
          open={mainDrawerVisible}
          className="main-drawer"
        >
          <Menu
            mode="inline"
            defaultSelectedKeys={[location.pathname]}
            className="drawer-menu"
            items={renderItems(menuItems)}
          />
        </Drawer>
        {!isPublic && sideBarItems.length > 0 &&
          <Drawer
            title="Menú lateral"
            placement="left"
            onClose={toggleSideDrawer}
            open={sideDrawerVisible}
            className="side-drawer"
          >
            <Menu
              mode="inline"
              defaultSelectedKeys={[location.pathname]}
              className="drawer-menu"
              // items={sideBarItems.map(item => ({
              //   key: item.to,
              //   icon: item.icon,
              //   label: item.label,
              //   onClick: () => handleMenuClick(item)
              // }))}
              items={renderItems(sideBarItems)}
            />
          </Drawer>
        }
      </Layout>
    )
  };

  const pathSegments = location.pathname.split('/').filter((segment: string) => segment !== '');

  const breadcrumbItems = [
    // { title: <Link to="/"><HomeOutlined /> Inicio</Link> },
    { title: <HomeOutlined /> },
    ...pathSegments.map((segment: string) => ({
      title: (
        // <Link to={`/${pathSegments.slice(0, index + 1).join('/')}`}>
        //   {capitalize(decodePath(segment).replace(/-/g, ' '))}
        // </Link>
        <span>
          {capitalize(decodePath(segment).replace(/-/g, ' '))}
        </span>
      ),
    }))
  ];

  if (loading) return <Loader />;

  return (
    <>
      {(() => {

        switch (true) {
          case isProduction && !hasSession && requireSession && wasChecked:
            goToLogin()
            break;

          case !isProduction:
            return renderLayout({ isMobile: isMobile, requireSession: requireSession, sideBarItems: sideBarItems, menuItems: menuItems, isPublic: isPublic, isCustomMain: isCustomMain, children: children, hasSession: hasSession, showBackButton: showBackButton, showNavigation: showNavigation })

          case requireSession && wasChecked && hasSession:
            return renderLayout({ isMobile: isMobile, requireSession: requireSession, sideBarItems: sideBarItems, menuItems: menuItems, isPublic: isPublic, isCustomMain: isCustomMain, children: children, hasSession: hasSession, showBackButton: showBackButton, showNavigation: showNavigation })

          case !requireSession:
            return renderLayout({ isMobile: isMobile, requireSession: requireSession, sideBarItems: sideBarItems, menuItems: menuItems, isPublic: isPublic, isCustomMain: isCustomMain, children: children, hasSession: hasSession, showBackButton: showBackButton, showNavigation: showNavigation })
          default:
            // goToLogin()
            break;
        }
      })()}
    </>
  );
};

export { Calvout };
