import './App.css';
import RepositoryContainer from './Components/RepositoryContainer';
import { apiEndPoints } from './helpers/api-helper';
import useApi from './helpers/hooks/use-api';
import CircularProgress from '@mui/material/CircularProgress';
import { IRepo } from './interfaces/apiInterfaces/repo.interface';
import { IApiError } from './interfaces/use-api.interface';
import ErrorComponent from './Components/ErrorComponent';

export function App() {
  const [reposData, error, loading] = useApi<IRepo>(
    apiEndPoints.LOCAL_HOST_REPOS_API
  );

  function getComponent(
    data: IRepo[],
    loader: boolean,
    apiError: IApiError | undefined
  ) {
    if (loader) {
      return <CircularProgress className="loaderClass" />;
    }
    if (apiError) {
      return <ErrorComponent error={apiError} />;
    }
    return <RepositoryContainer repos={data} />;
  }

  return <div>{getComponent(reposData, loading, error)}</div>;
}
