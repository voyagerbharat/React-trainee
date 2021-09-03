import React, { useState } from 'react';
import MainPageLayout from '../Components/MainPageLayout';
import { apiGet } from '../misc/config';

const Home = () => {
  const [ip, setInput] = useState('');
  const [results, setResults] = useState(null);

  const onInputChange = ev => {
    setInput(ev.target.value); // target contains the input typed
  };

  const onSearch = () => {
    apiGet(`/search/shows/?q=${ip}`).then(result => {
      setResults(result);
    });
  };

  // onkeydown is used if we type something and then hit enters it cals the onSearch fn
  const onKeyDown = ev => {
    if (ev.keyCode === 13) {
      onSearch();
    }
  };

  const resultRender = () => {
    if (results && results.length === 0) {
      return <div>No Results</div>;
    }
    if (results && results.length > 0) {
      return (
        <div>
          {results.map(item => (
            <div key={item.show.id}>{item.show.name}</div>
          ))}
        </div>
      );
    }
    return null;
  };

  // on change detects if anything is changed in searchbar
  return (
    <MainPageLayout>
      <input
        type="text"
        onChange={onInputChange}
        value={ip}
        onKeyDown={onKeyDown}
      />
      <button type="button" onClick={onSearch}>
        Search
      </button>
      {resultRender()}
    </MainPageLayout>
  );
};

export default Home;
