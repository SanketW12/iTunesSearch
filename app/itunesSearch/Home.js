import React, { useState } from 'react';
import styled from 'styled-components';
import { create } from 'apisauce';
import { Input, Layout, Row, Col, Divider, Button, Typography } from 'antd';

import ReasultCard from './Card';

const { Title } = Typography;
const { Header, Content } = Layout;
const { Search } = Input;

const MainLayout = styled(Layout)`
  display: flex;
  flex-direction: column;
  height: 100%;
`;
const Heading = styled.h1`
  color: white;
  text-align: center;
`;

const Body = styled(Content)`
  background-color: #32363e;
`;

const SearchField = styled(Search)`
  margin: 3rem 0 2rem 0;
  outline: 0;
  border: 0;
`;

const ResultContainer = styled.div`
  background-color: #32363e;
`;

export default function Home() {
  const [searchTerm, setSearchTerm] = useState();
  const [songs, setSongs] = useState([]);
  const [loadMore, setLoadmore] = useState(false);
  const [loader, setLoader] = useState(true);
  const [record, setrecord] = useState(true);

  const baseUrl = 'https://itunes.apple.com';

  const api = create({
    baseUrl,
    headers: {
      'access-control-allow-origin': '*',
      'Content-type': 'application/json; charset=UTF-8',
      timeout: 10000
    }
  });

  function getSearch(event) {
    setSearchTerm(event.target.value);
  }

  const noData = () => {
    setLoadmore(false);
  };

  async function onSearch(event) {
    if (event === '') {
      alert('Enter something to search');
    } else {
      const temp = await api.get('https://itunes.apple.com/search', { term: searchTerm, limit: 9 }, { headers: {} });
      setSongs(temp.data.results);

      temp.data.results.length === 0 ? noData() : setLoadmore(true);
      setLoader(false);
      setrecord(false);
    }
  }

  const loadMoreFuc = async () => {
    const temp = await api.get('https://itunes.apple.com/search', { term: searchTerm, limit: 20 }, { headers: {} });
    setSongs(temp.data.results);
    setLoadmore(false);
  };

  return (
    <>
      <MainLayout>
        <Header style={{ backgroundColor: '#20232A' }}>
          <Heading>iTunes Search</Heading>
        </Header>

        <Body>
          <Row justify="center">
            <Col xs={22} sm={11} md={7} lg={5}>
              <SearchField
                placeholder="Search Song or Artist"
                allowClear
                enterButton={'Search'}
                size="large"
                onSearch={onSearch}
                value={searchTerm}
                onChange={getSearch}
              />
            </Col>
          </Row>
          <Divider style={{ backgroundColor: '#40444B' }} />

          <ResultContainer>
            <Row justify="center" gutter={[16, 40]}>
              {songs.length === 0 ? (
                record ? null : (
                  <Title level={4}>NO RESULT FOUND</Title>
                )
              ) : (
                songs.map(data => {
                  return (
                    <ReasultCard
                      load={loader}
                      tittle={data.trackName}
                      cover={data.artworkUrl100}
                      artist={data.artistName}
                    ></ReasultCard>
                  );
                })
              )}
            </Row>
          </ResultContainer>
          {loadMore ? (
            <Divider>
              <Button onClick={loadMoreFuc} ghost>
                Load More
              </Button>
            </Divider>
          ) : null}
        </Body>
      </MainLayout>
    </>
  );
}
