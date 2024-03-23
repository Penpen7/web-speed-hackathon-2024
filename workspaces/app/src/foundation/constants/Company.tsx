import React, {useState, useEffect} from 'react';
import {Color, Space, Typography} from '../styles/variables';
import {Text} from '../components/Text';
function fetchTextFile() {
  return fetch('/assets/company.txt') // テキストファイルのパスを指定
    .then(response => response.text())
    .catch(error => {
      console.error('Error fetching text file:', error);
      return ''; // エラー時は空の文字列を返す
    });
}

function MyComponent() {
  const [content, setContent] = useState('');

  useEffect(() => {
    fetchTextFile().then(text => {
      setContent(text);
    });
  }, []);

  return (
    <Text as="p" color={Color.MONO_100} typography={Typography.NORMAL12}>
      <React.Fragment>{content}< /React.Fragment>
    </Text>
  );
}

export default MyComponent;


