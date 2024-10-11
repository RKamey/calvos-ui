import { Button } from "antd"

interface ButtonProps {
  children: React.ReactNode
}

export const Btn = ({ children }: ButtonProps) => {
  return (
    <Button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      {children}
    </Button>
  )
}