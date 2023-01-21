import { IRepo } from '../interfaces/serviceInterface/repo.interface';
import RepositoryCard from './RepositoryCard';
import Styles from '../Styles/Components/repositoryContainer.module.scss';
import { sortByDate } from '../utils/repository-container.utils';
interface PropsInterface {
  repos: IRepo[];
}

export default function RepositoryContainer(props: PropsInterface) {
  const { repos } = props;
  const sortedRepos = sortByDate(repos);
  const repoComponents = sortedRepos.map((repo) => {
    return RepositoryElement(repo);
  });
  return <div className={Styles.repositoryContainer}>{repoComponents}</div>;
}

function RepositoryElement(repo: IRepo): JSX.Element {
  const { name, description, language, forks } = repo;
  return (
    <RepositoryCard
      name={name}
      description={description}
      language={language}
      forks={forks}
    />
  );
}
