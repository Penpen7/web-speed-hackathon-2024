import {Suspense} from 'react';
import {useParams} from 'react-router-dom';
import type {RouteParams} from 'regexparam';
import invariant from 'tiny-invariant';

import {useBook} from '../../features/book/hooks/useBook';
import {EpisodeListItemExplicit} from '../../features/episode/components/EpisodeListItem';
import {useEpisode} from '../../features/episode/hooks/useEpisode';
import {useEpisodeList} from '../../features/episode/hooks/useEpisodeList';
import {Box} from '../../foundation/components/Box';
import {Flex} from '../../foundation/components/Flex';
import {Separator} from '../../foundation/components/Separator';
import {Space} from '../../foundation/styles/variables';

import {ComicViewer} from './internal/ComicViewer';
import {ErrorBoundary} from "react-error-boundary";
import {CommonLayout} from '../../foundation/layouts/CommonLayout';

const EpisodeDetailPage: React.FC = () => {
  const {bookId, episodeId} = useParams<RouteParams<'/books/:bookId/episodes/:episodeId'>>();
  invariant(bookId);
  invariant(episodeId);

  const {data: book} = useBook({params: {bookId}});
  const {data: episode} = useEpisode({params: {episodeId}});
  const {data: episodes} = useEpisodeList({query: {bookId}});

  return (
    <Box>
      <section aria-label="漫画ビューアー">
        <ComicViewer episodeId={episode.id} />
      </section>

      <Separator />

      <Box aria-label="エピソード一覧" as="section" px={Space * 2}>
        <Flex align="center" as="ul" direction="column" justify="center">
          {episodes.map((episode) => (
            <EpisodeListItemExplicit key={episode.id} episode={episode} bookId={bookId} episodeId={episode.id} />
          ))}
        </Flex>
      </Box>
    </Box>
  );
};

const EpisodeDetailPageWithSuspense: React.FC = () => {
  return (
    <ErrorBoundary fallback={<CommonLayout />}>
      <Suspense fallback={<CommonLayout />}>
        <EpisodeDetailPage />
      </Suspense>
    </ErrorBoundary>
  );
};

export {EpisodeDetailPageWithSuspense as EpisodeDetailPage};
