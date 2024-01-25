import { Categories } from "../../components/Home/Categories";
import { Recommends } from "../../components/Home/Recommends";
import { SearchBar } from "../../components/Home/SearchBar";
import "../HomePage/Home.modules.css";
import { useState } from 'react';
import SearchResultComponent from "../../components/Home/SearchResultComponent";

export function Home() {
  const [searchResults, setSearchResults] = useState([]);

  return (
    <div className="home">
      
      <SearchBar setSearchResults={setSearchResults}/>
      <Categories />
      {searchResults.length > 0 && (
        <SearchResultComponent results={searchResults} />
      )}
      <Recommends/>
    </div>
  );
}
