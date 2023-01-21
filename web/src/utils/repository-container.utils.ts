import { IRepo } from './../interfaces/serviceInterface/repo.interface';

export function sortByDate(repos: IRepo[]) {
  return repos.sort((a, b) => {
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  });
}

export function getRepoLanguages(repos: IRepo[]) {
  let languages = {};
  repos.forEach((repo) => {
    languages = { ...languages, [repo.language]: repo.language };
  });
  return ['All', ...Object.keys(languages)];
}
