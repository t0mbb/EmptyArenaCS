import React, { useState } from 'react';
import { useEffect} from 'react';
import { Card, Avatar, Row, Col, Form, Input, Button , DatePicker ,  Radio  , message , Modal} from 'antd';
import { SettingOutlined, EditOutlined, EllipsisOutlined  , PhoneOutlined} from '@ant-design/icons';


import { accDetails } from '../../services/account.service';
import { useParams , useNavigate } from 'react-router-dom';
import '../../assets/css/table.css';
import Logo from "../../assets/image/tooc.jpg"
import background from "../../assets/image/ava.jpg"

import { accUpdate } from '../../services/account.service';
import { rePass } from '../../services/account.service';

import moment  from 'moment';

const { Meta } = Card;

const Detail = () => {
  const navigate = useNavigate();
  const [accDetail, setList] = useState<any>();
  const [form] = Form.useForm();
  const [isViewing, setIsViewing] = useState(false);
  const user = JSON.parse(sessionStorage.getItem('userData') || '{}'); 
  const id = user._id;
  const getListAccFromBE = async () => {
    const details = await accDetails(user._id);
    console.log(details);
    setList(details.data.Result);
    form.setFieldsValue({
      fullname : details.data.Result.fullname,
      email: details.data.Result.email,
      phone : details.data.Result.phone,
      dob : moment(details.data.Result.dob),
      address : details.data.Result.address,
      gender : details.data.Result.gender,
    })
  };
  const [isEditing, setIsEditing] = useState(false); 
  const toggleView = () => {
    setIsViewing(!isViewing);
    setIsEditing(false); // Disable editing mode when viewing
  };

  const toggleEdit = () => {
    setIsEditing(true);
    setIsViewing(true); // Ensure the form is visible when editing
  };
  const confirm = async (values: any) => {
    try {
   
      await accUpdate(id, {values});
      message.success('Account updated successfully');
      navigate('/account');
    } catch (error) {
      console.error('Error updating account:', error);
      message.error('Failed to update account');
    }
  };

  const confirmPass = async ( value : any) => {
  try { 
    await rePass(id , {value})
  }
  catch (err) {

  }
  }
  useEffect(() => {
    getListAccFromBE();
  }, []);

  return (
    <Row gutter={16} style={{ marginLeft : "auto" , marginRight : "auto"}}>
    <Col span={10}>
      <Card
        style={{ width: '75%'  , background: "white" , margin : 30}}
        cover={
          <img
            alt="example"
            src={background}
          />
        }
        
        actions={[
          <SettingOutlined key="setting" onClick={toggleView} />,
          <EditOutlined key="edit" onClick={toggleEdit}  style={{
            color: isEditing ? '#e21313' : 'inherit',
          }}
           />,
          <EllipsisOutlined key="ellipsis" />,
        ]}
>
        <Meta
          avatar={<Avatar src={Logo} />}
          title={accDetail?.fullname}
          description={accDetail?.rankID.name}
        />
      </Card>
    </Col>

    {isViewing && ( 
        <Col span={12}>
          <Card style={{background : "transparent" , borderRadius: '30px'  }}>
            <Form
              layout="vertical"
              style={{
                padding: '30px',
                background: "transparent" , 
                borderRadius: '8px',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                
              }}
              form={form}
              onFinish={confirm}
            >
              <Form.Item label="Họ Và Tên" name="fullname" className="custom-form-item"  >
                <Input placeholder="Enter name" className="custom-input" disabled={!isEditing}  style={!isEditing ? { border: 'none', background: 'transparent' } : {}}/>
                
              </Form.Item>
              <Form.Item label="Email" name="email" className="custom-form-item">
                <Input placeholder="Enter email"  className="custom-input" disabled={!isEditing} style={!isEditing ? { border: 'none', background: 'transparent' } : {}}/>
              </Form.Item>
              <Form.Item label="Ngay Thang Nam Sinh" name="dob" className="custom-form-item">
                 <DatePicker  className="custom-input" disabled={!isEditing} style={!isEditing ? { border: 'none', background: 'transparent' } : {}}/>
              </Form.Item>
              <Form.Item label="Phone" name="phone" className="custom-form-item" >
                   <Input addonBefore={"+84"}prefix={<PhoneOutlined />}  style={!isEditing ? { border: 'none', background: 'transparent' } : {}} className="custom-input" disabled={!isEditing} />
              </Form.Item>
              <Form.Item label="Address" name="address" className="custom-form-item" >
                <Input placeholder="Enter address"  className="custom-input" disabled={!isEditing} style={!isEditing ? { border: 'none', background: 'transparent' } : {}}/>
              </Form.Item>
              <Form.Item label="Gender" name="gender "  className="custom-form-item">
              <Radio.Group disabled={!isEditing}  style={!isEditing ? { border: 'none', background: 'transparent' } : {}}>
          <Radio className="custom-input"  value="male">Male</Radio>
          <Radio className="custom-input" value="female">Female</Radio>
          <Radio className="custom-input" value="others">Others</Radio>
        </Radio.Group>
              </Form.Item>
              {isEditing && (
              <Form.Item className="custom-form-item" style={{background: "transparent"}} >
                <Button type="primary" htmlType="submit" style={{marginLeft : "250px" , background : "#9a1616"}} className="custom-button">
                  Submit
                </Button>
              </Form.Item>
              )}
            </Form>
          </Card>
        </Col>
      )}

    <Modal>
      <Col span={12}>
      <Card style={{background : "transparent" , borderRadius: '30px'  }}>
            <Form
              layout="vertical"
              style={{
                padding: '30px',
                background: "transparent" , 
                borderRadius: '8px',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                
              }}
              form={form}
              onFinish={confirmPass}
            >
              <Form.Item label="Họ Và Tên" name="fullname" className="custom-form-item"  >
                <Input placeholder="Enter name" className="custom-input" disabled={!isEditing}  style={!isEditing ? { border: 'none', background: 'transparent' } : {}}/>
                
              </Form.Item>
              <Form.Item label="Email" name="email" className="custom-form-item">
                <Input placeholder="Enter email"  className="custom-input" disabled={!isEditing} style={!isEditing ? { border: 'none', background: 'transparent' } : {}}/>
              </Form.Item>
              <Form.Item label="Ngay Thang Nam Sinh" name="dob" className="custom-form-item">
                 <DatePicker  className="custom-input" disabled={!isEditing} style={!isEditing ? { border: 'none', background: 'transparent' } : {}}/>
              </Form.Item>
             
              <Form.Item label="Address" name="address" className="custom-form-item" >
                <Input placeholder="Enter address"  className="custom-input" disabled={!isEditing} style={!isEditing ? { border: 'none', background: 'transparent' } : {}}/>
              </Form.Item>
              <Form.Item label="Gender" name="gender "  className="custom-form-item">
        
              </Form.Item>
             
              <Form.Item className="custom-form-item" style={{background: "transparent"}} >
                <Button type="primary" htmlType="submit" style={{marginLeft : "250px" , background : "#9a1616"}} className="custom-button">
                  Submit
                </Button>
              </Form.Item>
      
            </Form>
          </Card>
      </Col>
    </Modal>
  </Row>

);
};

export default Detail;
