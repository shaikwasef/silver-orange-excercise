import { useCallback } from 'react';
import CircularProgress from '@mui/material/CircularProgress';

import { ErrorComponent, RepositoryContainer } from './components';
import { apiEndPoints } from './helpers/api-helper';
import useApi from './helpers/hooks/use-api';
import { IApiError, IRepo } from './interfaces';

import './App.css';
import { sortByDate } from './utils';

export function App() {
  const [reposData, error, loading] = useApi<IRepo>(
    apiEndPoints.LOCAL_HOST_REPOS_API
  );

  const getComponent = useCallback(
    (data: IRepo[], loader: boolean, apiError: IApiError | undefined) => {
      if (loader) {
        return <CircularProgress className="loaderClass" />;
      }
      if (apiError) {
        return <ErrorComponent error={apiError} />;
      }
      return <RepositoryContainer repos={sortByDate(data)} />;
    },
    []
  );

  return <div>{getComponent(reposData, loading, error)}</div>;
}
