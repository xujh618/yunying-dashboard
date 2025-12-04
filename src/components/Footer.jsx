import { Layout } from 'antd';

const { Footer: AntFooter } = Layout;

const Footer = () => {
  return (
    <AntFooter className="footer">
      运营数据看板 ©{new Date().getFullYear()} Created by 技术团队
    </AntFooter>
  );
};

export default Footer;