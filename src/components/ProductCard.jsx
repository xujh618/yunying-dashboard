import React from 'react';
import { Card, Button } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';

const { Meta } = Card;

const ProductCard = ({ product }) => {
  return (
    <Card
      hoverable
      cover={<img alt={product.name} src={product.image || 'https://via.placeholder.com/300x200'} />}
      actions={[
        <Button type="primary" icon={<ArrowRightOutlined />}>
          了解更多
        </Button>,
      ]}
    >
      <Meta title={product.name} description={product.description} />
    </Card>
  );
};

export default ProductCard;