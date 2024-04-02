import { Row, Col, Card, Avatar, Typography, Space } from 'antd';
import { useParams } from 'react-router-dom';

const { Text } = Typography;

export const Update: React.FC = () => {
  let { id } = useParams();
  console.log(id);
  //distructoring
  return (
    <Row gutter={20}>
      <Col span={6}>
        <Card
          title="Identity"
          style={{ height: '300px', borderRadius: '15px' }}
          headStyle={{ textAlign: 'center' }}
        >
          <Space align="center" direction="horizontal"></Space>
        </Card>
      </Col>
      <Col span={6}>
        <Card
          title="Permissions"
          style={{ height: '300px', borderRadius: '15px' }}
          headStyle={{ textAlign: 'center' }}
        ></Card>
      </Col>
    </Row>
  );
};

export default Update;
