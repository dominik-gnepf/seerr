import CollectionDetails from '@app/components/CollectionDetails';
import { getServerBaseUrl } from '@app/utils/serverUrl';
import type { Collection } from '@server/models/Collection';
import axios from 'axios';
import type { GetServerSideProps, NextPage } from 'next';

interface CollectionPageProps {
  collection?: Collection;
}

const CollectionPage: NextPage<CollectionPageProps> = ({ collection }) => {
  return <CollectionDetails collection={collection} />;
};

export const getServerSideProps: GetServerSideProps<
  CollectionPageProps
> = async (ctx) => {
  try {
    const response = await axios.get<Collection>(
      `${getServerBaseUrl()}/api/v1/collection/${ctx.query.collectionId}`,
      {
        headers: ctx.req?.headers?.cookie
          ? { cookie: ctx.req.headers.cookie }
          : undefined,
      }
    );

    return {
      props: {
        collection: response.data,
      },
    };
  } catch (e) {
    return {
      props: {},
    };
  }
};

export default CollectionPage;
