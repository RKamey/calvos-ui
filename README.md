<div align="center" >
  <img src="https://github.com/user-attachments/assets/f22fcd44-6d3c-4445-a428-f6fe2ed5ef41" alt="Calvos" width="300" />
</div>


<h1 align="center">Calvos UI</h1>

<div align="center">
  <img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="License Badge">
</div>

<p align="center">
  <strong>Calvos UI</strong> es una moderna librería de componentes de React construidos con TypeScript, Ant Design y Tailwind CSS.
</p>

---

## Tabla de Contenidos

- [Instalación](#instalación)
- [Uso](#uso)
- [Componentes](#componentes)
- [Contribuir](#contribuir)
- [Licencia](#licencia)

---

## Instalación

Para instalar la librería, puedes usar `npm` o `yarn`:

```bash
npm install calvos-ui
```

ó 

```bash
yarn add calvos-ui
```

## Uso
Para utilizar los componentes de Calvos UI en tu proyecto, primero importa el componente que desees:

```tsx
import { MiComponente } from 'calvos-ui';
```

Luego, puedes usarlo en tu JSX o TSX
```tsx
<MiComponente prop1="valor" />
```

## Componentes
### Dashboard Card
`DashboardCard` es un componente de React que crea una tarjeta interactiva para un dashboard. Está diseñado para mostrar información resumida y proporcionar navegación a otras partes de la aplicación o a enlaces externos.

### Características

- Diseño atractivo con un icono personalizable y fondo de color.
- Título y descripción para cada tarjeta.
- Soporte para etiquetas opcionales con icono y texto.
- Navegación interna usando React Router.
- Apertura de enlaces externos en una nueva pestaña.

### Dependencias

- React
- prop-types
- antd (Ant Design)
- react-router-dom

### Propiedades

| Propiedad   | Tipo   | Requerido | Descripción                                              |
|-------------|--------|-----------|----------------------------------------------------------|
| icon        | node   | Sí        | Icono a mostrar en la parte superior de la tarjeta        |
| color       | string | Sí        | Color de fondo para el área del icono                    |
| title       | string | Sí        | Título de la tarjeta                                     |
| description | string | Sí        | Descripción breve de la tarjeta                          |
| path        | string | Sí        | Ruta de navegación o URL externa                         |
| tag         | object | No        | Objeto con propiedades para la etiqueta (opcional)       |

### Propiedades del tag (opcional)

| Propiedad | Tipo   | Descripción               |
|-----------|--------|---------------------------|
| color     | string | Color de la etiqueta       |
| icon      | node   | Icono para la etiqueta     |
| text      | string | Texto de la etiqueta       |

### Uso

```jsx
import DashboardCard from './DashboardCard';

<DashboardCard
  icon={<YourIcon />}
  color="#f0f0f0"
  title="Título de la Tarjeta"
  description="Descripción breve de la tarjeta."
  path="/ruta-interna"
  tag={{
    color: "blue",
    icon: <TagIcon />,
    text: "Etiqueta"
  }}
/>

```

