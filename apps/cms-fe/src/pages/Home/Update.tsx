

import { Row, Col, Card, Avatar, Typography, Space } from "antd";

const { Text } = Typography;

export const Update: React.FC = () => {

  return (
    <Row gutter={20}>
      <Col span={6}>
        <Card
          title="Identity"
          style={{ height: "300px", borderRadius: "15px" }}
          headStyle={{ textAlign: "center" }}
        >
          <Space align="center" direction="horizontal">

           
          </Space>
        </Card>
      </Col>
      <Col span={6}>
        <Card
          title="Permissions"
          style={{ height: "300px", borderRadius: "15px" }}
          headStyle={{ textAlign: "center" }}
        >

        </Card>
      </Col>
    </Row>
  );
};

export default Update;