import { useState, useEffect, useCallback } from 'react';

// Utility Functions
import axios from 'axios';
import styled from 'styled-components';
import useIsMountedRef from 'use-is-mounted-ref';
import { Helmet } from 'react-helmet';

// Sub-components
import SearchBar from './SearchBar';
import BankList from './BankList';

// Cache API call
const cache = {};

const App = () => {
  const isMountedRef = useIsMountedRef();
  const [bankList, setBankList] = useState([]);
  const [selectedCity, setSelectedCity] = useState('MUMBAI');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewFavs, setViewFavs] = useState(false);
  const [isLoading, setLoading] = useState(false);
  // Hydrating favorites into localStorage to persist the data
  const favoritesInStorage = localStorage.getItem('favorites');
  const [selectedBanks, setSelectedBanks] = useState(
    !!favoritesInStorage ? JSON.parse(favoritesInStorage) : []
  );

  const fetchBanks = useCallback(async () => {
    setLoading(true);
    try {
      if (isMountedRef.current) {
        if (cache[selectedCity]) {
          const data = cache[selectedCity];
          setBankList(data);
        } else {
          const response = await axios.get(
            'https://vast-shore-74260.herokuapp.com/banks',
            {
              params: { city: selectedCity }
            }
          );
          cache[selectedCity] = response?.data;
          setBankList(response?.data);
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [isMountedRef, selectedCity]);

  const filterList = (dataList, query) => {
    let filteredDataList = dataList;
    if (viewFavs) {
      filteredDataList = dataList.filter((data) =>
        selectedBanks.includes(data.ifsc)
      );
    }

    return query
      ? filteredDataList.filter((data) =>
          data?.bank_name.toLowerCase().includes(query.toLowerCase())
        )
      : filteredDataList;
  };

  useEffect(() => {
    fetchBanks();
  }, [fetchBanks]);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(selectedBanks));
  }, [selectedBanks]);

  return (
    <Container>
      <Helmet>
        <title>Bank Search Application</title>
      </Helmet>
      <SearchBar
        viewFavs={viewFavs}
        setViewFavs={setViewFavs}
        selectedCity={selectedCity}
        setSelectedCity={setSelectedCity}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <BankList
        selectedBanks={selectedBanks}
        setSelectedBanks={setSelectedBanks}
        bankList={filterList(bankList, searchQuery)}
        isLoading={isLoading}
      />
    </Container>
  );
};

export default App;

const Container = styled.section`
  max-width: 1400px;
  width: 96%;
  margin: 3em auto;
`;
