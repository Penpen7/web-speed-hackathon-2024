import React, { useState, useEffect } from 'react';

export default function Question() {
  const [content, setContent] = useState('');

  useEffect(() => {
    fetch('/assets/question.txt') // テキストファイルのパスを指定
      .then((response) => response.text())
      .catch((error) => {
        console.error('Error fetching text file:', error);
        return ''; // エラー時は空の文字列を返す
      })
      .then((text) => {
        setContent(text);
      });
  }, []);

  return <React.Fragment>{content}</React.Fragment>;
}
