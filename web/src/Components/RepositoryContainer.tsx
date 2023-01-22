import { IRepo } from '../interfaces/apiInterfaces/repo.interface';
import RepositoryCard from './RepositoryCard';
import Styles from '../Styles/Components/repositoryContainer.module.scss';
import {
  getRepoLanguages,
  sortByDate,
} from '../utils/repository-container.utils';
import LanguageButtonsGroup from './LanguageButtonsGroup';
import RepoInfoModal from './RepoInfoModal';
import { useState } from 'react';
interface PropsInterface {
  repos: IRepo[];
}

export default function RepositoryContainer(props: PropsInterface) {
  const { repos } = props;
  const [sortedRepos, setSortedRepos] = useState<IRepo[]>([]);
  const [focusedRepo, setFocusedRepo] = useState<IRepo>();
  const [modalOpen, setModalOpen] = useState(false);

  const handleLanguageChange = (value: string) => {
    const filteredRepos =
      value === 'All' ? repos : repos.filter((repo) => repo.language === value);
    setSortedRepos(sortByDate(filteredRepos));
  };

  const handleRepoClick = (id: number) => {
    const clickedRepoIdx = repos.findIndex((repo) => repo.id === id);
    setFocusedRepo(repos[clickedRepoIdx]);
    setModalOpen(true);
  };

  const repoComponents = getSortedRepoComponents(
    sortedRepos.length ? sortedRepos : sortByDate(repos),
    handleRepoClick
  );

  const languages = getRepoLanguages(repos);

  return (
    <div className={Styles.repositoryContainer}>
      {focusedRepo && modalOpen && (
        <RepoInfoModal
          open={modalOpen}
          handleClose={() => setModalOpen(false)}
          repo={focusedRepo}
        />
      )}
      <LanguageButtonsGroup
        languages={languages}
        handleClick={handleLanguageChange}
      />
      <div className={Styles.reposGridContainer}>{repoComponents}</div>
    </div>
  );
}

function getSortedRepoComponents(
  repos: IRepo[],
  handleRepoClick: (id: number) => void
) {
  return repos.map((repo) => RepositoryElement(repo, handleRepoClick));
}

function RepositoryElement(
  repo: IRepo,
  handleRepoClick: (id: number) => void
): JSX.Element {
  const { name, description, language, forks, id } = repo;
  return (
    <div
      key={id}
      onClick={() => handleRepoClick(id)}
      className={Styles.cardContainers}
    >
      <RepositoryCard
        name={name}
        description={description}
        language={language}
        forks={forks}
      />
    </div>
  );
}
