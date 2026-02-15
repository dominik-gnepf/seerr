import MovieDetails from '@app/components/MovieDetails';
import { getServerBaseUrl } from '@app/utils/serverUrl';
import type { MovieDetails as MovieDetailsType } from '@server/models/Movie';
import axios from 'axios';
import type { GetServerSideProps, NextPage } from 'next';

interface MoviePageProps {
  movie?: MovieDetailsType;
}

const MoviePage: NextPage<MoviePageProps> = ({ movie }) => {
  return <MovieDetails movie={movie} />;
};

export const getServerSideProps: GetServerSideProps<MoviePageProps> = async (
  ctx
) => {
  try {
    const response = await axios.get<MovieDetailsType>(
      `${getServerBaseUrl()}/api/v1/movie/${ctx.query.movieId}`,
      {
        headers: ctx.req?.headers?.cookie
          ? { cookie: ctx.req.headers.cookie }
          : undefined,
      }
    );

    return {
      props: {
        movie: response.data,
      },
    };
  } catch (e) {
    return {
      props: {},
    };
  }
};

export default MoviePage;
