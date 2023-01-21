import { IRepo } from './../interfaces/serviceInterface/repo.interface';

export function sortByDate(repos: IRepo[]) {
  return repos.sort((a, b) => {
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  });
}
