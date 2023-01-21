import { IUser } from './user.interface';

export interface IRepo {
  id: number;
  name: string;
  full_name: string;
  owner: IUser;
  private: boolean;
  html_url: string;
  description: string;
  fork: boolean;
  url: string;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  git_url: string;
  ssh_url: string;
  clone_url: string;
  svn_url: string;
  homepage: string;
  size: number;
  stargazers_count: number;
  watchers_count: number;
  language: string;
  forks_count: number;
  forks: number;
  commits_url: string;
  default_branch: string;
}
