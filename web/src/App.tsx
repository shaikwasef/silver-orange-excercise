import './App.css';
import RepositoryContainer from './Components/RepositoryContainer';
import useApi from './hooks/use-api';
import { IRepo } from './interfaces/serviceInterface/repo.interface';

export function App() {
  const reposData = useApi<IRepo>('http://localhost:4000/repos');

  return (
    <div className="App">
      <RepositoryContainer repos={reposData} />
    </div>
  );
}
