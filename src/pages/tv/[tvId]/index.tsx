import TvDetails from '@app/components/TvDetails';
import { getServerBaseUrl } from '@app/utils/serverUrl';
import type { TvDetails as TvDetailsType } from '@server/models/Tv';
import axios from 'axios';
import type { GetServerSideProps, NextPage } from 'next';

interface TvPageProps {
  tv?: TvDetailsType;
}

const TvPage: NextPage<TvPageProps> = ({ tv }) => {
  return <TvDetails tv={tv} />;
};

export const getServerSideProps: GetServerSideProps<TvPageProps> = async (
  ctx
) => {
  try {
    const response = await axios.get<TvDetailsType>(
      `${getServerBaseUrl()}/api/v1/tv/${ctx.query.tvId}`,
      {
        headers: ctx.req?.headers?.cookie
          ? { cookie: ctx.req.headers.cookie }
          : undefined,
      }
    );

    return {
      props: {
        tv: response.data,
      },
    };
  } catch (e) {
    return {
      props: {},
    };
  }
};

export default TvPage;
