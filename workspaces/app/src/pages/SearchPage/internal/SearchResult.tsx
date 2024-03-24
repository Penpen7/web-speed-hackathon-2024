import {Suspense, useEffect} from 'react';

import type {GetBookListResponse} from '@wsh-2024/schema/src/api/books/GetBookListResponse';

import {BookListItemExplicit} from '../../../features/book/components/BookListItem';
import {Flex} from '../../../foundation/components/Flex';
import {Text} from '../../../foundation/components/Text';
import {Color, Typography} from '../../../foundation/styles/variables';
import {isContains} from '../../../lib/filter/isContains';
import {useBookListFallBackDataEmpty} from '../../../features/book/hooks/useBookList';

type Props = {
  keyword: string;
};

export const SearchResult: React.FC<Props> = ({keyword}) => {
  const {data: books} = useBookListFallBackDataEmpty({query: {name_ruby: keyword}});
  return (
    <Flex align="center" as="ul" direction="column" justify="center">
      <Suspense
        fallback={
          <Text color={Color.MONO_100} typography={Typography.NORMAL14}>
            「{keyword}」を検索中...
          </Text>
        }
      >
        {books == null ?
          <Text color={Color.MONO_100} typography={Typography.NORMAL14}>
            「{keyword}」を検索中...
          </Text> :
          <>
            {typeof books === "object" ?
              books.map((book) => (
                <BookListItemExplicit book={book} key={book.id} />
              )) :
              < Text color={Color.MONO_100} typography={Typography.NORMAL14}>
                関連作品は見つかりませんでした
              </Text>
            }
          </>
        }
      </Suspense>
    </Flex >
  );
};
