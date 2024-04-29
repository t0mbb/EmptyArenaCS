import React, { useState } from "react";
import { useEffect } from "react";
import {

  Button,
  Form,
  ConfigProvider,

  message,
  FloatButton,

  Divider,
  Modal,

  Card,
  Select,
  InputNumber,
  Tag,
  Input,
  Avatar,
  List,
  Popconfirm,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import {
  findPoolTable,
} from "../../../services/pooltable.service";

import { useNavigate, useParams } from "react-router-dom";

import "../../../assets/css/table.css";
import { getListCategory , findProductbyCatId } from "../../../services/product.service";
import { createOrderItem , getListOrderItem , deleteOrderItem , getListOrder } from "../../../services/orders.service";
import { startService, stopService } from "../../../services/pooltable.service";


const Home = () => {
  const navigate = useNavigate();
  let { id } = useParams();
  const [table, setList] = useState<any>([]);
  const [product, setProduct] = useState<any>([]);
  const [category , setCategory] = useState<any>([]);
  const [listOrderItem , setOrderItem] = useState<any>([]);
  const [orderDetail, setOrderDetail]  = useState<any>([]);

 
  const getDetailFromBE = async () => {
    const res = await findPoolTable(id);
    const respond = await getListCategory();
    const response = await getListOrderItem(id);
    const responding = await getListOrder(id);
    setList(res.data.Result);
    setCategory(respond.data.category);
    setOrderItem(response.data.orderItem);
    setOrderDetail(responding.data.order)
  };
  const start = () => {
    startService(id);
    window.location.reload();
  };
  const stop = () => {
    stopService(id);
    window.location.reload();
  };

  useEffect(() => {
    getDetailFromBE();
  }, []);

  const [form] = Form.useForm();


  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const confirmOrderItem = async (values: any) => {
    try{
      setIsModalOpen(false);
      console.log(values);
      await createOrderItem(values);
      window.location.reload();
      message.success("Success adding order")
    }
    catch(error){
      console.error('Error ', error);
      setIsModalOpen(false);
      message.error('Something went wrong !');
   
    }
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const DeleteOrderItem = async (_id : any) =>
    {
    try{
      console.log(_id);
      await deleteOrderItem(_id);
      
      window.location.reload();
        message.success("Success adding order")
      }
      catch (error){
        message.error('Something went wrong !');
      }
    }
  const onSelectCatergory = async (value: any) => {
    const res = await findProductbyCatId(value)
    console.log(value);
    setProduct(res.data.Result);
  }
 
  
  return (
    <ConfigProvider
      theme={{
        token: {
          colorBgBase: "#141414",
          colorBgContainer: "#",
          colorText: "white",
          colorBorderSecondary: "#a61d24",
          borderRadius: 10,
        },
      }}>

      <Modal
        title="Order"
        style={{justifyContent : 'center' , display : 'flex'   }}
        open={isModalOpen}
        onCancel={handleCancel}
        okButtonProps={{ style: { display: "none" } }}>
        <Divider />
        
          Category | 
            <Select
              style={{ width: 200 , marginLeft : 100 , marginTop : 5 , marginBottom : 10 , textTransform: 'uppercase'  }}
              options={ category.map((cat : any) => ({
                value: cat._id, 
                label: cat.name, 
              }))}
              onSelect={onSelectCatergory}
            ></Select> 
    
          {
            product.length > 0 
            ? (<>
            <Form variant="filled" form={form} onFinish={confirmOrderItem} initialValues={{pool_table_id : id} }>
            <Divider>Product Order</Divider>
             <Form.Item
            label="Name Of Product"
            name="product_id"
            rules={[{ required: true, message: "Please choose!" }]}>
            <Select
              style={{ width: 300  , borderBlockColor : 'red'}}
              options={ product.map((pro : any) => ({
                value: pro._id, 
                label: pro.name, 
              }))}
            />
          </Form.Item>
          <Form.Item hidden
            label="poolTable"
            name="pool_table_id"
            rules={[{ required: true, message: "Please choose!" }]}>
            <Input hidden/>
          </Form.Item>
          <Form.Item
            label="Quantity"
            name="quantity"
            rules={[{ required: true, type : 'number', message: "Please fill!" }]}>
          <InputNumber min={1} max={10}/>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
            <Button style={{marginLeft : 50, marginTop : 15}} type="primary" ghost htmlType="submit">
              Submit
            </Button>
          </Form.Item>
          </Form>
            </>)
            : null
          }  
      </Modal>



      <FloatButton
        shape="circle"
        type="primary"
        onClick={showModal}
        style={{
          width: "60px",
          height: "60px",
          position: "absolute",
          marginRight: 20,
          
        }}
        icon={<PlusOutlined />}
      />
      <div
        style={{
          overflowX: "auto",
          display: "flex",
          justifyContent: "center",
        }}>
        <Button
          className="button"
          style={{
            marginTop: 15,
            marginRight: 300,
            color: "whitesmoke",
            backgroundColor:
              table.status === "used" || table.status === "maintained"
                ? "gray"
                : "#e74748",
          }}
          onClick={start}
          disabled={table.status === "used" || table.status === "maintained"}>
          Start Service
        </Button>
        <Button
          className="button"
          style={{
            marginTop: 15,
            color: "whitesmoke",
            backgroundColor: table.status === "used" ? "#e74748" : "gray",
          }}
          disabled={
            table.status === "available" || table.status === "maintained"
          }
          onClick={stop}>
          Stop Service
        </Button>
      </div>
      <Divider />
      <div style ={{display : "flex"}}>
        <div style= {{flex : 1}}>
          <Card>
                <p style={{justifyContent : "center" , display : "flex" , textTransform: 'uppercase' ,fontWeight : 'bold', fontSize : 14}}> Order Item</p>     
            <Divider/>
      <List
    itemLayout="horizontal"
    style={{justifyContent: "left"}}
    dataSource={listOrderItem}
    renderItem={(item:any) => (
      <List.Item actions={[
        <Popconfirm
          title="Delete the task"
          description="Are you sure to delete this task?"
          onConfirm={() => DeleteOrderItem(item._id)}
          okText="Yes"
          cancelText="No"
        >
          <Button danger className="button">
            Delete
          </Button>
        </Popconfirm>]}>
        <List.Item.Meta
         avatar={<Avatar src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${1}`} />}
          title={<span style = {{textTransform: 'uppercase'}}>Product Name :  {item.product_id.name} </span>}
          description={<span style={{color : "whitesmoke"}}>Quantity : x{item.quantity} </span>}
        />
         <div style={{marginRight: 3}}>{new Date(item.createdAt).toLocaleString()}</div>

      </List.Item>
    )}
  />
  </Card>
  </div>
        <div style={{ marginLeft : 20 }}>
          <Card title="Information" style={{ width: 300, height: 600 }}>
           <p>Table Number |  <Tag style ={{marginLeft : 25 , marginBottom : 5 , padding : 5  }}> {table.number}</Tag></p>
          <p>Price per hour | <Tag style ={{marginLeft : 25 , marginBottom : 5 , padding : 5}}> {table.price}  $ </Tag></p>
         <p>Table Type |  <Tag style ={{marginLeft : 25 , padding : 5 , textTransform: 'uppercase'}}> {table.brandname}</Tag></p> 
            <Divider />
            {orderDetail ?
             (<>
             <p>Starting | <Tag style ={{marginLeft : 25 , padding : 5 , textTransform: 'uppercase'}}> 
             <div>{new Date(orderDetail.start_time).toLocaleTimeString()}</div>
             <div>{new Date(orderDetail.start_time).toLocaleDateString()}</div>
             </Tag> </p>
            </>) : null}
            
          </Card>
        </div>
        
      </div>
    </ConfigProvider>
  );
};

export default Home;
