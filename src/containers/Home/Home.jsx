import React, {useState, useEffect} from 'react';
import { Button, Table, Modal } from 'antd';
import axios from 'axios';
import './Home.scss';

// developers: ['Lucid Sheep Games']
// genre: ['Party']
// id: 1
// name: "#Breakforcist Battle"
// publishers: ['Lucid Sheep Games']
// releaseDates: {Japan: 'Unreleased', NorthAmerica: 'April 12, 2018', Europe:
export const BASE_URL = 'https://api.sampleapis.com';

function Home() {
  const [loading, setLoading] = useState(false)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [activeItem, setActiveItem] = useState(null);
  const [data, setData] = useState([])

  useEffect(() => {
    fetchGames();
  }, [])

  const fetchGames = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`${BASE_URL}/switch/games`);
      setData(response.data)
      setLoading(false)
    } catch (error) {
      console.error(error);
      setLoading(false)
    }
  }
  
  const columns = [
    {
      title: 'Name of The Game',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Genre',
      dataIndex: 'genre',
      key: 'genre',
    },
    {
      title: 'Publishers',
      dataIndex: 'publishers',
      key: 'publishers',
    },
    {
      title: 'Developers',
      dataIndex: 'developers',
      key: 'developers',
    },
  ];

  return (
    <div className="home-container">
      <h1>Home</h1>
      <Table 
        dataSource={data} 
        columns={columns} 
        loading={loading}
        size={'small'}
        width="100%"
        className="table"
        onRow={(record, rowIndex) => {
          return {
            onClick: () => setActiveItem(record)
          }
        }}
        // pagination={false}
      />

      <Modal 
        title={activeItem?.name} 
        visible={!!activeItem}
        footer={null}
        onCancel={() => setActiveItem(null)}
      >
        {activeItem && <>
          <p>Genre: <b>{activeItem.genre}</b></p>
          <p>Developers: <b>{activeItem.developers}</b></p>
          <p>Publishers: <b>{activeItem.publishers}</b></p>
          <p>Release Dates: {
            Object.keys(activeItem.releaseDates).map(country => (
              <div>
                <span>{country}{' '}</span>
                <b>{activeItem.releaseDates[country]}</b>
              </div>
            ))
          }</p>
        </>}
      </Modal>
    </div>
  )
}

export default Home
