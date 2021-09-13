import React, { useState } from 'react';
import ActorGrid from '../Components/actor/actorGrid';
import CustomRadio from '../Components/CustomRadio';
import MainPageLayout from '../Components/MainPageLayout';
import ShowGrid from '../Components/show/showGrid';
import { apiGet } from '../misc/config';
import { useLastQuery } from '../misc/custom-hooks';
import {
  RadioInputsWrapper,
  SearchButtonWrapper,
  SearchInput,
} from './Home.styled';

const Home = () => {
  const [ip, setInput] = useLastQuery('');
  const [results, setResults] = useState(null);
  const [SearchOption, setSearchOption] = useState('shows');
  const isShowsSearched = SearchOption === 'shows';
  const onRadioChange = ev => {
    setSearchOption(ev.target.value);
  };

  const onInputChange = ev => {
    setInput(ev.target.value); // target contains the input typed
  };

  const onSearch = () => {
    apiGet(`/search/${SearchOption}/?q=${ip}`).then(result => {
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
      return results[0].show ? (
        <ShowGrid data={results} />
      ) : (
        <ActorGrid data={results} />
      );
    }
    return null;
  };

  // on change detects if anything is changed in searchbar
  return (
    <MainPageLayout>
      <SearchInput
        type="text"
        placeholder="Search for Something"
        onChange={onInputChange}
        value={ip}
        onKeyDown={onKeyDown}
      />
      <RadioInputsWrapper>
        <div>
          <CustomRadio
            label="shows"
            id="shows-search"
            value="shows"
            onChange={onRadioChange}
            checked={isShowsSearched}
          />
        </div>
        <div>
          <CustomRadio
            label="actors"
            id="actors-search"
            value="people"
            onChange={onRadioChange}
            checked={!isShowsSearched}
          />
        </div>
      </RadioInputsWrapper>
      <SearchButtonWrapper>
        <button type="button" onClick={onSearch}>
          Search
        </button>
        {resultRender()}
      </SearchButtonWrapper>
    </MainPageLayout>
  );
};

export default Home;
