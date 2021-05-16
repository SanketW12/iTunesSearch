import React from "react";
import styled from "styled-components";

import { Col, Card } from "antd";
const { Meta } = Card;

const Resultcard = styled(Col)`
  display: flex;
  justify-content: center;
`;

const PhotoCover = styled.img.attrs((props) => ({
  src: props.image,
}))`
  width: 250px;
  height: 150px;
`;

export default function ReasultCard(prop) {
  return (
    <>
      <Resultcard xs={22} sm={9} lg={5}>
        <Card
          loading={prop.load}
          hoverable
          style={{ width: 250 }}
          cover={<PhotoCover image={prop.cover}></PhotoCover>}
        >
          <Meta title={prop.tittle} description={prop.artist} />
        </Card>
        ,
      </Resultcard>
    </>
  );
}
