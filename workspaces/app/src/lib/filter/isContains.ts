type Params = {
  query: string;
  target: string;
};

// ひらがな・カタカナ・半角・全角を区別せずに文字列が含まれているかを調べる
export function isContains({ query, target }: Params): boolean {
  // target の先頭から順に query が含まれているかを調べる
  TARGET_LOOP: for (let offset = 0; offset <= target.length - query.length; offset++) {
    for (let idx = 0; idx < query.length; idx++) {
      const collator = new Intl.Collator('ja', { sensitivity: 'accent' });
      if (collator.compare(target[offset + idx]!, query[idx]!) !== 0) {
        continue TARGET_LOOP;
      }
    }
    // query のすべての文字が含まれていたら true を返す
    return true;
  }
  // target の最後まで query が含まれていなかったら false を返す
  return false;
}
