import useSWR from 'swr';

import {bookApiClient} from '../apiClient/bookApiClient';

export function useBookList(...[options]: Parameters<typeof bookApiClient.fetchList>) {
  return useSWR(bookApiClient.fetchList$$key(options), bookApiClient.fetchList, {suspense: true, });
}

export function useBookListFallBackDataEmpty(...[options]: Parameters<typeof bookApiClient.fetchList>) {
  return useSWR(bookApiClient.fetchList$$key(options), bookApiClient.fetchList, {suspense: true, fallbackData: []});
}
