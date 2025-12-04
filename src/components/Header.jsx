import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';
import siteConfig from '../../_site.config.js';

const { Header: AntHeader } = Layout;

const Header = () => {
  return (
    <AntHeader className="header">
      <div className="flex items-center">
        <div className="text-xl font-bold text-blue-600">{siteConfig.title}</div>
      </div>
      <Menu
        mode="horizontal"
        defaultSelectedKeys={['1']}
        className="border-b-0"
      >
        <Menu.Item key="1">
          <Link to="/">首页</Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link to="/digital-library">数字智库</Link>
        </Menu.Item>
        <Menu.Item key="3">
          <Link to="/smart-procurement">广告智采</Link>
        </Menu.Item>
        <Menu.Item key="4">
          <Link to="/material-price">材价库</Link>
        </Menu.Item>
        <Menu.Item key="5">
          <Link to="/admin">管理后台</Link>
        </Menu.Item>
      </Menu>
    </AntHeader>
  );
};

export default Header;