import {useState} from 'react';
import {Routes, Route} from 'react-router-dom';
import {Layout} from 'antd'

import Home from './containers/Home/Home';
import MenuComponent from './components/Menu/MenuComponent';

import 'antd/dist/antd.css';
import './App.css';
import Products from './containers/Products/Products';

const {Sider} = Layout;

function App() {
  const [collapsed, setCollapsed] = useState(false);
  
  return (
    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      <Sider 
        collapsible 
        collapsed={collapsed} 
        onCollapse={(value) => setCollapsed(value)}
      >
        <MenuComponent />
      </Sider>
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
      </Routes>
    </Layout>
  );
}

export default App;
