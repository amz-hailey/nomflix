import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Loader from "Components/Loader";
import { Link, Route, withRouter } from "react-router-dom";
import Videos from "Components/Videos";
import Seasons from "Components/Seasons";
import Helmet from "react-helmet";

const Container = styled.div`
  height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  padding: 50px;
`;
const Backdrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${(props) => props.bgImage});
  background-position: center center;
  background-size: cover;
  filter: blur(3px);
  opacity: 0.5;
  z-index: 0;
`;

const Content = styled.div`
  display: flex;
  width: 100%;
  height: 100%
  position:relative;
  z-index:1;
`;
const Cover = styled.div`
  width: 30%;
  height: 100%;
  background-image: url(${(props) => props.bgImage});
  background-position: center center;
  background-size: cover;
  border-radius: 5px;
`;
const Data = styled.div`
  width: 70%;
  margin-left: 10px;
`;
const Title = styled.h3`
  font-size: 32px;
`;
const ItemContainer = styled.div`
  margin: 20px 0;
`;
const Item = styled.span``;
const Divider = styled.span`
  margin: 0 10px;
`;
const Overview = styled.p`
  font-size: 12px;
  opacity: 0.7;
  line-height: 1.5;
  width: 50%;
  padding-bottom: 30px;
`;
const Production = styled.span`
  font-weight: bold;
`;
const Companies = styled.div``;
const Contries = styled.div`
  padding-bottom: 20px;
`;
const Button = styled.span`
  background-color: ${(props) => (props.active ? "#34495e" : "#2c3e50")};
  color: ${(props) => (props.active ? "white" : "black")};
  font-size:20px
  font-weight:bold
  border-bottom:30px
  border-radius: 8px;
  padding:10px
  text-align: justify;
  margin-right:10px;
`;

const IMDb = styled.span`
  margin : 8px 8px;
`;


const DetailPresenter = withRouter(
  ({ location: { pathname }, loading, result }) =>
    loading ? (
      <>
      <Helmet>
        <title>Loading | Nomflix</title>
      </Helmet>
      <Loader />
      </>
    ) : (
      <Container>
        <Helmet>
        <title>{result.original_title ? result.original_title : result.original_name} | Nomflix</title>
        </Helmet>
        <Backdrop
          bgImage={`https://image.tmdb.org/t/p/original${result.backdrop_path}`}
        />
        <Content>
          <Cover
            bgImage={
              result.poster_path
                ? `https://image.tmdb.org/t/p/original${result.poster_path}`
                : require("../../assets/noPosterSmall.jpg")
            }
          ></Cover>
          <Data>
            <Title>
              {result.original_title
                ? result.original_title
                : result.original_name}
            </Title>
            <ItemContainer>
              <Item>
                {result.release_date
                  ? result.release_date
                  : result.first_air_date.substring(0, 4)}
              </Item>
              <Divider>•</Divider>
              <Item>
                {result.runtime ? result.runtime : result.episode_run_time[0]}
                min
              </Item>
              <Divider>•</Divider>
              <Item>
                {result.genres &&
                  result.genres.map((genre, index) =>
                    index === result.genres.length - 1
                      ? genre.name
                      : `${genre.name} / `
                  )}   
              </Item>
              <IMDb>{result.imdb_id && (
                    <a href={`https://www.imdb.com/title/${result.imdb_id}`} >
                    <img src="https://pmcvariety.files.wordpress.com/2017/02/imdb1.png?w=30&h=15" alt="imdb_url" /></a>)}
              </IMDb>
            </ItemContainer>
            <Companies>
              <Production>Production Companies </Production>
              {result.production_companies &&
                result.production_companies.map((company, index) =>
                  index === result.production_companies.length - 1
                    ? company.name
                    : `${company.name} / `
                )}
            </Companies>
            <Contries>
              <Production>Production Countries </Production>
              {result.production_countries &&
                result.production_countries.map((country, index) =>
                  index === result.production_countries.length - 1
                    ? country.name
                    : `${country.name} / `
                )}
              {result.origin_country && result.origin_country}
            </Contries>
            <Overview>{result.overview}</Overview>

            <Button
              active={
                result.original_title
                  ? pathname === `/movie/${result.id}/videos`
                  : pathname === `/show/${result.id}/videos`
              }
            >
              <Link
                to={
                  result.original_title
                    ? `/movie/${result.id}/videos`
                    : `/show/${result.id}/videos`
                }
              >
                Videos
              </Link>
            </Button>
            {parseInt(result.number_of_seasons) > 0 && (
              <Button
                active={
                  result.original_title
                    ? false
                    : pathname === `/show/${result.id}/seasons`
                }
              >
                <Link
                  to={
                    result.original_title ? false : `/show/${result.id}/seasons`
                  }
                >
                  Seasons
                </Link>
              </Button>
            )}
            <Route
              path={
                result.original_title ? `/movie/:id/videos` : `/show/:id/videos`
              }
              exact
              component={Videos}
            />
            <Route path={`/show/:id/seasons`} exact component={Seasons} />
          </Data>
        </Content>
      </Container>
    )
);
DetailPresenter.propTypes = {
  result: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string
};

export default DetailPresenter;
