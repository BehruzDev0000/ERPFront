import { useQuery } from "@tanstack/react-query"
import { debounce, instance } from "../../hooks"
import { useCookies } from "react-cookie"
import Caption from "../../components/Caption"
import { MoreOutlined, PlusCircleOutlined } from '@ant-design/icons'
import { Button, Card, Input } from "antd"
import type { StackType } from '../../@types/StackType';
import { useState } from "react" 
import { useNavigate } from "react-router-dom"
const Stacks = () => {
  
  const [search,setSearch]=useState('')
  const name=debounce(search,1000)
  const [cookies]=useCookies(['token'])
  const navigate=useNavigate()
  const {data:stacks=[],isLoading}=useQuery<StackType[]>({
    queryKey: ['stacks',name],
    queryFn: () => instance(cookies.token).get('stacks',{params:{name}}).then(res => res.data.data),
  })
  return (
    <div className="p-5">
      <Caption title="Stacks" count={stacks.length} icon={<PlusCircleOutlined />} />

      <Input allowClear placeholder="Search stacks..." className="w-[250px]! rounded-lg mt-3!" onChange={(e) => setSearch(e.target.value)} />


      <ul className="flex justify-center flex-wrap gap-5 mt-5">
      {
        isLoading?<h1>Loading...</h1> :stacks.map((stack: StackType) => (
          <Card className="border! border-black!" style={{width:300}} key={stack.id} title={stack.name} extra={<Button onClick={() => navigate(`/stacks/${stack.id}`)} type="primary" className="bg-transparent! border! border-black! text-black!" icon={<MoreOutlined/>}></Button>}>
            <p>{stack.description}</p>
          </Card>
        ))
      }
      {
        name.length>0 && stacks.length===0 && <h1>No stacks found for this name</h1>
      }

      </ul>
    </div>
  )
}

export default Stacks