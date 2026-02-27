import { Button, Input, Modal } from "antd"
import { ArrowLeftOutlined, DeleteOutlined, PlusCircleOutlined, SaveOutlined } from "@ant-design/icons"
import { useEffect, useState } from "react"
import { useMutation, useQuery } from "@tanstack/react-query"
import { instance } from "../../../hooks"
import { useCookies } from "react-cookie"
import toast from "react-hot-toast"
import { Link, useNavigate, useParams } from "react-router-dom"
import type { StackType } from "../../../@types/StackType"
import CustomSelect from "../../../components/CustomSelect"

const StacksMore = () => {
  const navigate=useNavigate()
   const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const {id}=useParams()
  const [title,setTitle]=useState('')
 
  const [cookies]=useCookies(['token'])

  const { data } = useQuery<StackType>({
  queryKey: ['stack', id],
  queryFn: () =>
    instance(cookies.token)
      .get(`stacks/${id}`)
      .then(res => res.data.data),
  enabled: !!id && !!cookies.token
})

useEffect(() => {
  if (data) {
    setTitle(data.name)
  }
}, [data])
  const {mutate:deleteStack, isPending} =useMutation({
    mutationFn:(id:number)=>
    instance(cookies.token).delete(`stacks/${id}`),
    onSuccess:() => {
      setTimeout(() => {
        setOpenDeleteModal(false)
        toast.success("Stack deleted successfully")
      }, 1000);
    },
    onError:(err) => {
      toast.error(err.message)
    }
  })
const handleDelete = () => {
  deleteStack(Number(id))
}
 
  return (
    <div className="p-5">
      <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Button size="large" onClick={() => navigate(-1)} icon={<ArrowLeftOutlined />}></Button>
        <h1>{title}</h1>
      </div>
      <div className="flex items-center gap-2">
        <Button className="bg-red-500! text-white" size="large" onClick={() => setOpenDeleteModal(true)}>
          <DeleteOutlined  className="text-white!"/>
        </Button>
        <Link to={`/stacks/${id}/update`}>
        <Button size="large" type="primary" className="cursor-pointer " >
          <SaveOutlined />
          Update
        </Button>
        </Link>
      </div>
      <Modal  title="Are you sure you want to delete this stack?" open={openDeleteModal} confirmLoading={isPending} onOk={handleDelete} onCancel={() => setOpenDeleteModal(false)}>
      </Modal>

    
    </div>
      <div className="p-5 mt-5 rounded-2xl border-slate-300 bg-[#2u4o8i] border w-[50%] flex items-start relative">
        <ul className="flex flex-col gap-2">
          <li className="flex flex-col">
            <span className=" text-slate-500 text-[14px]">#</span>
            <strong >{data?.id}</strong>
          </li>
          <li className="flex flex-col">
            <span className=" text-slate-500 text-[14px]">Name:</span>
            <strong>{data?.name}</strong>
          </li>
          <li className="flex flex-col">
            <span className=" text-slate-500 text-[14px]">Description:</span>
            <strong>{data?.description}</strong>
          </li>
        </ul>
        <ul className="absolute top-[30px] right-[35px] flex flex-col gap-3">
          <li className="flex flex-col">
            <span className="text-slate-400 text-[14px]">Created At</span>
            <strong>{data?.createdAt ? new Date(data.createdAt).toLocaleString("uz-UZ") : '-'}</strong>
          </li>
           <li className="flex flex-col">
            <span className="text-slate-400 text-[14px]">Updated At</span>
            <strong>{data?.updatedAt ?new Date(data.updatedAt).toLocaleString("uz-UZ") : '-'}</strong>
          </li>
        </ul>
      </div>
      <div className="bg-slate-200 p-5 rounded-md mt-10">
        <h2 className="text-[25px] font-bold mb-2">{data?.name ? data.name : '-'}</h2>
        <div className="flex items-center justify-between">
        <div className="flex gap-3">
          <Input placeholder="Search group by name" className="w-[300px]!" size="large" allowClear  ></Input>
          <CustomSelect requestTitle="teachers" placeHolder="teacher" id={data?.id} />
          <CustomSelect requestTitle="stacks" placeHolder="group" id={data?.id} />
        </div>
        <Button size="large" icon={<PlusCircleOutlined />} type="primary">Create Group</Button>
      </div>
      </div>
    </div>
  )
}

export default StacksMore