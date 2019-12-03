import React, { useEffect, useState } from "react";
import { moviesApi, tvApi } from "../api";
import styled from "styled-components";
const Container = styled.div`
  padding: 30px 0px;
`;
const Videos = ({
  location: { pathname },
  match: {
    params: { id }
  }
}) => {
  const [isMovie] = useState(pathname.includes("/movie/"));
  const [videos, setVideos] = useState(null);
  const parsedId = parseInt(id);

  useEffect(() => {
    const callApi = async () => {
      try {
        if (isMovie) {
          const {
            data: {
              videos: { results }
            }
          } = await moviesApi.movieDetail(parsedId);
          setVideos(results);
        } else {
          const {
            data: {
              videos: { results }
            }
          } = await tvApi.showDetail(parsedId);
          setVideos(results);
        }
      } catch (e) {
        console.log(e);
      }
    };
    callApi();
  }, []);

  return (
    <Container>
      {videos &&
        videos.map((video) => (
          <iframe
            key={video.id}
            title={video.key}
            src={`https://www.youtube.com/embed/${video.key}?rel=0`}
            width="300"
            height="300"
            frameBorder="0"
            allow="autoplay;  gyroscope; accelerometer encrypted-media;"
            allowFullScreen
          ></iframe>
        ))}
    </Container>
  );
};

export default Videos;
