import {Suspense, useCallback, useEffect, useId, useState} from 'react';

import {Box} from '../../foundation/components/Box';
import {Text} from '../../foundation/components/Text';
import {Color, Space, Typography} from '../../foundation/styles/variables';

import {Input} from './internal/Input';
import {SearchResult} from './internal/SearchResult';
import {useBookList} from '../../features/book/hooks/useBookList';

const SearchPage: React.FC = () => {
  const searchResultsA11yId = useId();

  const [isClient, setIsClient] = useState(false);
  const [keyword, setKeyword] = useState('');
  const {data: books} = useBookList({query: {name_ruby: keyword}});

  const onChangedInput = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setKeyword(event.target.value);
    },
    [setKeyword])

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <Box px={Space * 2}>
      <Input disabled={!isClient} onChange={onChangedInput} />
      <Box aria-labelledby={searchResultsA11yId} as="section" maxWidth="100%" py={Space * 2} width="100%">
        <Text color={Color.MONO_100} id={searchResultsA11yId} typography={Typography.NORMAL20} weight="bold">
          検索結果
        </Text>
        {keyword !== '' && <SearchResult books={books} keyword={keyword} />}
      </Box>
    </Box>
  );
};

const SearchPageWithSuspense: React.FC = () => {
  return (
    <Suspense fallback={null}>
      <SearchPage />
    </Suspense>
  );
};

export {SearchPageWithSuspense as SearchPage};
