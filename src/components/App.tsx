import React, { useRef, useState } from 'react';
import useAsyncEffect from 'use-async-effect';
import styled from 'styled-components';
import * as api from '../lib/octoApi';

import GlobalStyles from '../styles/global';

import PreviewBar from './PreviewBar';
import StatBar from './StatBar';
import StatBox from './StatBox';

const StyledApp = styled.div`
  display: flex;
  flex-flow: column nowrap;
  flex: 1 1 auto;
  justify-content: flex-end;
`;

const App: React.FC = () => {
  const interval = useRef<any>();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState();

  const fetchStats = async () => {
    const response = await api.fetchStats();
    setStats(response);
  };

  useAsyncEffect(async () => {
    await fetchStats();
    setLoading(false);

    interval.current = setInterval(fetchStats, 500);
    return () => clearInterval(interval.current);
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <GlobalStyles />
      <StyledApp>
        <StatBox {...stats} />
        <div className="App__bottom">
          <PreviewBar />
          <StatBar {...stats} />
        </div>
      </StyledApp>
    </>
  );
};

export default App;
