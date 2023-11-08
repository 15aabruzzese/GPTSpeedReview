import fetch from 'node-fetch';

// You need to install the types for node if you're using TypeScript
// npm install @types/node --save-dev

interface GithubDiffOptions {
  token: string;
  owner: string;
  repo: string;
  base: string;
  head: string;
}

async function getGithubDiff({
  token,
  owner,
  repo,
  base,
  head
}: GithubDiffOptions): Promise<string> {
  const url = `https://api.github.com/repos/${owner}/${repo}/compare/${base}...${head}`;

  const response = await fetch(url, {
    headers: {
      'Authorization': `token ${token}`,
      'Accept': 'application/vnd.github.v3.diff'
    }
  });

  if (!response.ok) {
    throw new Error(`GitHub API responded with status code ${response.status}`);
  }

  return response.text();
}

// Example usage
const githubToken = 'your_github_token'; // Replace with your GitHub token
const owner = 'owner_of_the_repo'; // Replace with the owner of the repo
const repo = 'repository_name'; // Replace with the repository name
const baseBranch = 'main'; // Replace with the base branch name
const headBranch = 'feature-branch'; // Replace with the head branch name

getGithubDiff({
  token: githubToken,
  owner: owner,
  repo: repo,
  base: baseBranch,
  head: headBranch
})
  .then(diff => {
    console.log('Diff between branches:', diff);
  })
  .catch(error => {
    console.error('Error getting diff:', error);
  });
