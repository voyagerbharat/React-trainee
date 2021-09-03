import React, { useState } from 'react';
import MainPageLayout from '../Components/MainPageLayout';

const Home = () => {
  const [ip, setInput] = useState('');

  const onInputChange = ev => {
    setInput(ev.target.value); // target contains the input typed
  };

  const onSearch = () => {
    // eslint-disable-next-line
    console.log('clicked');
    // fetch is used to fetch data from remote and it returns promise , so we use then and data is in raw format we convert it to json then simple console it
    fetch(`https://api.tvmaze.com/search/shows?q=${ip}`)
      .then(r => r.json())
      .then(result => {
        // eslint-disable-next-line
        console.log(result);
      });
  };

  // onkeydown is used if we type something and then hit enters it cals the onSearch fn
  const onKeyDown = ev => {
    if (ev.keyCode === 13) {
      onSearch();
    }
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
    </MainPageLayout>
  );
};

export default Home;
