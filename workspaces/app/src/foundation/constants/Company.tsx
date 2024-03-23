import React, {useState, useEffect} from 'react';

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
    <React.Fragment>{content} < /React.Fragment>
  );
}

export default MyComponent;


