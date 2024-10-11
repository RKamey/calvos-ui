import { Typography } from "antd";

interface TitleProps {
  children: React.ReactNode;
}

export const Title = ({ children }: TitleProps) => {
  return ( 
    <Typography.Title
      className="text-2xl font-bold"
    >
      {children}
    </Typography.Title>
  );
};