import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { useMutation } from '@tanstack/react-query';
import { Button, Form, Input } from 'antd';
import { instance } from '../../hooks';
import toast from 'react-hot-toast';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
const [, setCookie, ] = useCookies(['token']);
    const LoginFn=useMutation({
        mutationFn: (data: { email: string; password: string }) => instance().post('auth/login', data),
        onSuccess: (res) => {
            setTimeout(() => {
                toast.success('Login successful!');
                
                setCookie('token', res.data.data.tokens.accessToken);
                navigate('/');
            }, 1000)
        }
    });

  const onFinish = (values: { email: string; password: string }) => {
    LoginFn.mutate(values)
  };

  return (
    <div className='flex justify-center items-center h-screen bg-slate-900/50'>
        <Form autoComplete='off'
      name="login"
      initialValues={{ remember: true }}
      style={{ minWidth: 340 }}
      onFinish={onFinish}
      className='bg-white! rounded-lg! shadow-md! p-5!'
    >
      <Form.Item 
        name="email"
        rules={[{ required: true, message: 'Please input your Email!' }]}
      >
        <Input autoComplete='false' size='large' prefix={<UserOutlined className='text-[20px] text-[#c4c4c4]!' />} placeholder="user@gmail.com" />
      </Form.Item>
      <Form.Item 
        name="password"
        rules={[{ required: true, message: 'Please input your Password!' }]}
      >
        <Input.Password autoComplete='false' size='large'  prefix={<LockOutlined />} type="password" placeholder="Password" />
      </Form.Item>
      

      <Form.Item>
        <Button size='large' block type="primary" htmlType="submit">
          Log in
        </Button>
      </Form.Item>
    </Form>
    </div>
  );
};

export default Login;