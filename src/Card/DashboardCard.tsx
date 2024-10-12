import { useState } from 'react';
import { Card, Typography, Tag } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;

interface TagProps {
  color: string;
  icon: React.ReactNode;
  text: string;
}

interface DashboardCardProps {
  icon: React.ReactNode;
  color: string;
  title: string;
  description: string;
  path?: string | null;
  tags?: TagProps[];
}

const DashboardCard = ({ 
  icon, 
  color, 
  title, 
  description, 
  path, 
  tags 
}: DashboardCardProps) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const isExternalLink = path && path.startsWith('http');
  const isApplication = path === null;

  const handleClick = () => {
    if (isExternalLink) {
      window.open(path, '_blank');
    } else if (!isApplication && path) {
      navigate(path);
    }
  };

  return (
    <Card
      hoverable={!isApplication}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`
        w-full h-[300px] rounded-2xl overflow-hidden transition-all duration-300
        border-none bg-white flex flex-col
        ${isHovered && !isApplication ? 'shadow-xl -translate-y-1' : 'shadow-lg'}
        ${isApplication ? 'cursor-default' : 'cursor-pointer'}
      `}
      styles={{
        body: {
          padding: 0,
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
        }
      }}
    >
      <div 
        className={`p-8 text-center transition-all duration-300 ${isHovered ? 'scale-105' : ''}`}
        style={{ backgroundColor: color }}
      >
        <div className={`text-5xl text-white transition-all duration-300 ${isHovered ? '-translate-y-1' : ''}`}>
          {icon}
        </div>
      </div>
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <Title level={3} className={`text-black m-0 mb-2 transition-all duration-300 ${isHovered ? '-translate-y-0.5' : ''}`}>
            {title}
          </Title>
          <Text className={`text-sm text-gray-600 transition-all duration-300 ${isHovered ? 'opacity-100' : 'opacity-80'}`}>
            {description}
          </Text>
        </div>
        <div className="flex flex-wrap gap-1 mt-4">
          {tags && tags.map((tag, index) => (
            <Tag 
              key={index} 
              color={tag.color}
              className={`
                px-3 py-1 rounded-full text-xs inline-flex items-center gap-1 
                transition-all duration-300 ${isHovered ? 'scale-105' : ''}
              `}
            >
              {tag.icon} {tag.text}
            </Tag>
          ))}
        </div>
      </div>
    </Card>
  );
};

export { DashboardCard };