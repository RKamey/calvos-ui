import type { ThemeConfig } from 'antd';

const theme: ThemeConfig = {
  token: {
    fontFamily: 'Montserrat, sans-serif',
    colorPrimary: 'var(--pantone208)',
    colorTextSecondary: 'var(--pantone7421)', // Cambio realizado aquí
    colorTextBase: 'var(--pantone7540)',
    colorBgBase: '#ffffff',
    zIndexPopupBase: 2000, // Adjust this value as needed
  },
  components: {
    Button: {
      colorPrimary: 'var(--pantone208)',
      colorPrimaryHover: 'var(--pantone194)',
    },
    Layout: {
      headerBg: '#ffffff',
      siderBg: '#ffffff',
    },
    Menu: {
      itemColor: 'var(--pantone7540)',
      itemSelectedColor: 'var(--pantone208)',
      itemHoverColor: 'var(--pantone194)',
    },
    Select: {
      colorText: 'var(--pantone7540)',
      colorTextPlaceholder: 'rgba(75, 79, 84, 0.65)', // --pantone7540 con opacidad
      colorBorder: 'var(--pantone465)',
      colorPrimary: 'var(--pantone208)',
      colorPrimaryHover: 'var(--pantone194)',
      colorBgContainer: '#ffffff',
      controlOutline: 'rgba(182, 150, 100, 0.2)', // --pantone465 con opacidad
      optionSelectedBg: 'rgba(127, 40, 65, 0.1)', // --pantone208 con opacidad
      optionSelectedColor: 'var(--pantone208)',
      optionActiveBg: 'rgba(146, 50, 68, 0.1)', // --pantone194 con opacidad
    },
    Tree: {
      nodeSelectedBg: '#C69C67',
      nodeHoverBg: '#F5F5F5',
    },
    Table: {
      rowSelectedBg: '#f1c389',
      rowSelectedHoverBg: '#C69C67',
    },
    Transfer: {
      controlItemBgActive: '#C69C67',
      controlItemBgActiveHover: '#F5F5F5',
      controlItemBgHover: '#F5F5F5',
    },
  },
};

export default theme;