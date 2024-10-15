import { Button } from "antd"
import { ConfigProvider } from "antd"
import es_ES from "antd/lib/locale/es_ES"
import theme from "../config"

interface ButtonProps {
  children: React.ReactNode
}

export const Btn = ({ children }: ButtonProps) => {
  return (
    <ConfigProvider
      locale={es_ES}
      componentSize='middle'
      theme={theme}>
    <Button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      {children}
    </Button>
    </ConfigProvider>
  )
}