import React, { useEffect, useState } from "react";
import { tvApi } from "../api";
import styled from "styled-components";
import PropTypes from "prop-types";

const Container = styled.div`
  background-image: url(${props => props.path});
  width: 100%;
  height :100%
  background-repeat: no-repeat;
  padding: 100px;
  margin :20px 0px
`;
const Title = styled.h2`
  font-weight: bold;
  text-align :left;
`;
const ItemList = styled.li`
  padding:20px
`;
const SeasonAll = styled.ul`
  display: flex;
`;
const SeasonInfo = ({ name, path}) => (
  <ItemList>
    <Container path={path ? `https://image.tmdb.org/t/p/w200${path}` : require("../assets/noPosterSmall.jpg")}>
     
    </Container>
    <Title>{name}</Title>    
  </ItemList>
);

const Seasons = ({
  location: { pathname },
  match: {
    params: { id }
  }
}) => {
  const [isShow] = useState(pathname.includes("/show/"));
  const [seasons, setSeasons] = useState(null);
  const parsedId = parseInt(id);

  useEffect(() => {
    const callApi = async () => {
      try {
        if (isShow) {
          const {
            data: { seasons }
          } = await tvApi.showDetail(parsedId);
          setSeasons(seasons);
        }
      } catch (e) {
        console.log(e);
      }
    };
    callApi();
  }, []);

  return (
    <SeasonAll>
      {seasons &&
        seasons.map((season) => (
          <SeasonInfo name={season.name} path={season.poster_path} />
        ))}

    </SeasonAll>
  );
};

Seasons.propTypes = {
  name: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired
};

export default Seasons;
