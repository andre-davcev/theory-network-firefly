export interface VersionGit {
  dirty: boolean;
  raw: string;
  hash: string;
  distance: number;
  tag: string;
  semver: any;
  suffix: string;
  semverString: string;
  version: string;
}
