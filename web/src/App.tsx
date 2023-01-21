import './App.css';
import RepositoryContainer from './Components/RepositoryContainer';
import { apiEndPoints } from './helpers/api-helper';
import useApi from './helpers/hooks/use-api';
import { IRepo } from './interfaces/apiInterfaces/repo.interface';

export function App() {
  const reposData = useApi<IRepo>(apiEndPoints.LOCAL_HOST_REPOS_API);

  return (
    <div className="App">
      <RepositoryContainer repos={reposData} />
    </div>
  );
}
