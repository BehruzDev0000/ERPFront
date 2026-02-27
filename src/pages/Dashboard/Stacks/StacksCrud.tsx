import { Button, Input } from "antd"
import { ArrowLeftOutlined, SaveOutlined } from "@ant-design/icons"
import { useNavigate, useParams } from "react-router-dom"
import TextArea from "antd/es/input/TextArea"
import { useEffect, useState, type SubmitEvent } from "react"
import {  useMutation, useQueryClient } from "@tanstack/react-query"
import { instance } from "../../../hooks"
import { useCookies } from "react-cookie"
import toast from "react-hot-toast"
import { Path } from "../../../components"

const StacksCrud = () => {
  const queryClient= useQueryClient()
  const [cookies]=useCookies(['token'])
  const {id}=useParams()
  const [name,setName]=useState("")
  
  const [description,setDescription]=useState("")
  useEffect(() => {
    if (id) {
      instance(cookies.token).get(`stacks/${id}`).then(res => {
        setName(res.data.data.name)
        setDescription(res.data.data.description)
      })
    }
  }, [id])
  const navigate=useNavigate()
  const {mutate:stackCreate,isPending}=useMutation({
    mutationFn:(data: {name: string, description: string})=>id?instance(cookies.token).patch(`stacks/${id}`,data):instance(cookies.token).post('stacks',data),
    onSuccess:() => {
      id?toast.success('Stack updated successfully'):toast.success('Stack created successfully')
      setTimeout(() => {id?navigate(Path.stacks):navigate(-1)
        queryClient.invalidateQueries({queryKey: ['stacks']})
      },1000)
    },
    onError:(err) => {
      toast.error(err.message)
    }
    
  })
  const handleSubmit=(e:SubmitEvent<HTMLFormElement>)=>{
    console.log("test");
    
    e.preventDefault()
    stackCreate({name,description})
  }
  return (
    <form onSubmit={handleSubmit}>
      <div className="flex items-center justify-between p-5">
      <div className="flex items-center gap-2">
        <Button size="large" onClick={() => navigate(-1)} icon={<ArrowLeftOutlined  />}>
      </Button>
      <h1 className="text-[25px] font-bold">{id ? "Edit Stack" : "Create Stack"}</h1>
      </div>
      <Button type="primary" loading={isPending} className="cursor-pointer" size="large" htmlType="submit" icon={<SaveOutlined/>}>Save</Button>
    </div>
    <div className="flex items-center gap-2 flex-col mt-5">
      <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Stack Name" size="large" className="w-[60%]!" />
      <TextArea rows={8} value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Stack Description" size="large" className="w-[60%]!" />
    </div>
    </form>
  )
}

export default StacksCrud