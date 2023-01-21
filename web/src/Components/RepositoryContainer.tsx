import { IRepo } from '../interfaces/serviceInterface/repo.interface';
import RepositoryCard from './RepositoryCard';
import Styles from '../Styles/Components/repositoryContainer.module.scss';
import {
  getRepoLanguages,
  sortByDate,
} from '../utils/repository-container.utils';
import LanguageButtonsGroup from './LanguageButtonsGroup';
import { useState } from 'react';
interface PropsInterface {
  repos: IRepo[];
}

export default function RepositoryContainer(props: PropsInterface) {
  const { repos } = props;
  const [sortedRepos, setSortedRepos] = useState(sortByDate(repos));

  const repoComponents = sortedRepos.map((repo) => {
    return RepositoryElement(repo);
  });

  const languages = getRepoLanguages(repos);

  const handleLanguageChange = (value: string) => {
    const filteredRepos =
      value === 'All' ? repos : repos.filter((repo) => repo.language === value);
    setSortedRepos(sortByDate(filteredRepos));
  };

  return (
    <div className={Styles.repositoryContainer}>
      <LanguageButtonsGroup
        languages={languages}
        handleClick={handleLanguageChange}
      />
      {repoComponents}
    </div>
  );
}

function RepositoryElement(repo: IRepo): JSX.Element {
  const { name, description, language, forks, id } = repo;
  return (
    <RepositoryCard
      key={id}
      name={name}
      description={description}
      language={language}
      forks={forks}
    />
  );
}
