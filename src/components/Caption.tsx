import { Button } from "antd"
import type { FC } from "react"
import { useNavigate } from "react-router-dom"
interface CaptionProps{
    title:string,
    count:number,
    icon:React.ReactNode
}
const Caption:FC<CaptionProps> = ({title,count,icon}) => {
    const navigate = useNavigate()
  return (
    <div className="flex items-center justify-between">
        <div>
            <h1 className="font-bold text-[22px]">{title}</h1>
            <p className="text-[16px] text-slate-400"> count ({count})</p>
        </div>
        <Button type="primary" icon={icon} iconPlacement='start' size="large" onClick={() => navigate('create')}>Create</Button>
    </div>
  )
}

export default Caption