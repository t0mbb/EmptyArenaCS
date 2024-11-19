import { Button, message, Form  ,Row ,Col , Radio, Modal, DatePicker , InputNumber , type FormProps, Input, Typography, Divider, ConfigProvider  } from 'antd';
import { UserOutlined , UnlockOutlined } from '@ant-design/icons';
import { googleLogin, login } from '../../services/auth.service';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../../assets/css/login.css"
import { createAcc, google } from '../../services/account.service';




type FieldType = {
  email: string;
  password: string;
};

const Login = () => {
  const navigate = useNavigate(); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
   try{
    const response = await login(values.email, values.password)
      sessionStorage.setItem('accessToken', response.data.accessToken);
      sessionStorage.setItem('userData', JSON.stringify(response.data.userData));
      const user = JSON.parse(sessionStorage.getItem('userData') || '{}');
      message.success("Login Successful!" ,user.fullname);
      navigate('/home');
    } catch {
      message.error('Login failed. Wrong Email or Password'); 
    }
  };

  const LoginGoogle = () => {
    window.location.href = 'http://localhost:3000/auth/google'; 
  };
  useEffect(() => {
    const LoginGoogle = async () =>{
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code');
      
    }
    LoginGoogle();
  } , [navigate])
  
  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  
  const showModal = () => {
    setIsModalOpen(true);

  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  
  const registerConfirm = async (values : any) => {
    try{
      await createAcc(values)
      message.success('Successfully!')
      navigate('/login');
    }
    catch (err)
    {
      console.error('Error :', err);
      message.error('Register Failed !');
    }
  }
  const [form] = Form.useForm();
  return ( 
    
  <div className = "appBG">
    <ConfigProvider  theme={{ token: {  colorBorder: "#e84749"  ,colorBgBase :"#141414" , colorPrimary: '#e84749', colorText :"white", colorBgContainer : "black" }}} > 
      <Form className = "formLog"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}>

            <Typography.Title style={{marginTop : "20px"}}>Sign In</Typography.Title>
            <Divider></Divider>
        <Form.Item<FieldType>
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              type: "email",
              message: "Please input correctly email!",
            },
          ]}
          style={{marginBottom : "30px"}}
        >
          <Input placeholder="Email" prefix={<UserOutlined />} />
        </Form.Item>
  
        <Form.Item<FieldType>
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
          style={{marginBottom : "30px"}}
        >
          <Input.Password   placeholder="Password"  prefix={<UnlockOutlined />} />
        </Form.Item>
      
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            style={{ width: "100%" , background : "#9b1315" , marginBottom : "10px" }} >
            SIGN IN
          </Button>
          <div style={{marginTop : "20px" , textAlign : "center" , marginBottom : "10px"}}>
          Don't have an account? <a style={{color : "#0b94ff" , fontSize: "15.5px"}} onClick={() => showModal()}>Register</a>
          </div>
          <Divider style={{ border: "1px" }}>or login with</Divider>
          <Button onClick={LoginGoogle} >
      Google
    </Button>
        </Form.Item>
      </Form>
  </ConfigProvider>


      <ConfigProvider theme={{token : {colorBgBase : "#e9ebf7" }}}>
      <Modal
        onCancel={handleCancel}
        open={isModalOpen}
        cancelButtonProps={{style : {display : 'none'}}}
        okButtonProps={{ style: { display: 'none' } }}
 
      >
         <Typography.Title style={{color : "white"}}>Sign Up</Typography.Title>
        <Form
  onFinish={registerConfirm}
  form={form}
  style={{paddingTop : "40px"   }}>
  <Row gutter={10} >
    <Row >
      <Form.Item
        label="Email"
        name="email"
        rules={[
          { required: true, type: "email", message: 'Sửa đúng định dạng email!' },
        ]}
        style={{marginBottom: "50px"}}
      >
        <Input />
      </Form.Item>
      </Row>
      <Col span={12}>
      <Form.Item
        label="Fullname"
        name="fullname"
        rules={[
          { required: true, message: 'Please fill!' },
        ]}
      >
        <Input />
     
      </Form.Item>
     </Col>
<Row gutter={10}>
    <Col span={15}>
    <Form.Item
        label="Password"
        name="password"
        rules={[
          { required: true, message: 'Please fill!' },
        ]}
        style={{marginBottom: "30px"}}
      >
        <Input.Password />

        
      </Form.Item>
  </Col>
  <Col span={15}>
      <Form.Item
        label="Confirm Password"
        name="password2"
        dependencies={['password']}
        style={{marginBottom: "30px"}}
        rules={[
          {
            required: true, message : 'PLease fill!'
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('The new password that you entered do not match!'));
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>

  </Col>
    </Row>
  </Row>
  <Form.Item
        label="Address"
        name="address"
        rules={[
          { required: true, message: 'Please fill!' },
        ]}
      >
        <Input />
     
      </Form.Item>
  <Row gutter={20}>
    <Col span={15}>
      <Form.Item
        label="Date of Birth"
        name="dob"
        rules={[
          { required: true, message: 'Please fill!' },
        ]}
        style={{marginBottom: "30px"}}
      >
        <DatePicker />
      </Form.Item>
    </Col>
    
    <Col span={12}>
      <Form.Item
        label="Gender"
        name="gender"
        rules={[
          { required: true, message: 'Please fill!' },
        ]}
      >
        <Radio.Group>
          <Radio style={{color : "white" , marginBottom:"5px"}} value="male">Male</Radio>
          <Radio style={{color : "white" , marginBottom:"5px"}} value="female">Female</Radio>
          <Radio style={{color : "white" , marginBottom:"5px"}} value="others">Others</Radio>
        </Radio.Group>
      </Form.Item>
    </Col>
  </Row>
  
  <Form.Item
        name="phone"
        label="Phone Number"
        rules={[{ required: true , message: 'Please input your phone number!' }]}
      >
         <Col span={14}>
        <Input addonBefore={"+84"} style={{ width: '100%' }} />
        </Col>
      </Form.Item>

  
  <Form.Item wrapperCol={{ offset: 10  }}>
    <Button
      style={{ marginTop: 30 , background : "linear-gradient(to right,  #e21313 0.5% ,#181a1b 100%)",border : "1.5px solid black" , boxShadow: "0 0 10px rgba(30, 13, 125, 0.606) " , width: '100px',  // Custom width
        height: '50px',  
    }}
      type="primary"
      ghost
      htmlType="submit"
    >
      Submit
    </Button>
  </Form.Item>
</Form>
    </Modal>
    </ConfigProvider>
    
    </div>
  


  );
};





export default Login;
