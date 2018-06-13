# Contributing

**Prerequisites**:

* **Node >=8**
* **npm >= 5**/**yarn >= 1.7**

## Technical overview

* this project uses React/ReactDOM with Typescript ( no type safety no happy life )
* state management is handled via custom DI / Component State - if it makes sense / Redux
* for XHR calls use `HttpClient` only ( it's a wrapped axios singleton )
* All side effects ( XHR calls etc ) are handled and executed only within epics via [redux-observable](https://redux-observable.js.org/)
* [jest](https://facebook.github.io/jest/)/[enzyme](http://airbnb.io/enzyme/) is used for unit testing
* [testcafe](https://devexpress.github.io/testcafe/) is used for e2e testing
* [prettier](https://prettier.io/) and [tslint](https://palantir.github.io/tslint/) are used for unified code style and javascript/typescript best practices
* build process is powered by webpack, but you won't get access to that because we are handling everything with customized [create-react-app](https://github.com/wmonk/create-react-app-typescript) binaries === easy life for you ;)
* use yarn or [npm](https://www.npmjs.com/) as a package manager
* whenever you commit we have githooks that will reformat your code to follow styleguides and also we try to fix any linting errors. Unfortunately some lint errors cannot be fixed automatically, so you'll need to fix them by hand and commit again
* we follow strict rules for commit messages - conventional change log format. Please use CLI for doing commits via `npm run cz`/`yarn cz`. As you'll get more familiar with the standard you can use whatever tool for git management ( again we preffer VSCode ), and you can write your commit messages there ( don't worry if you won't follow the format we have git hooks that will not allow you to do the commit ;) )
* whenever you push we run all style/linter checks + unit tests ( again if something fails, your push will not be succesfull )

**Windows users:**

* we highly recommend to use _VSCode integrated terminal with git-bash_. If you preffer standalone terminal we recommend [Cmder](http://cmder.net/) or [Hyper](https://hyper.is/)
* the best option although is to use [Ubuntu on Windows](https://docs.microsoft.com/en-us/windows/wsl/about)

## Version control guide

Please read following guide how we work with git with all yours **WHY's** answered:

### 1. Git

* every ticket should be handled in your personal branch which will be used for Pull request against develop branch

#### Branch naming

* please use following naming for your branches:
  * `[name initials]/[ticket-number]/[optional-description]`
  * `[name initials]/[description]`

Example:

* `mh/MP-123`
  * mh == Martin Hochel / MP-123 == ticket number
* `mh/MP-231/login`
  * same as above + optional branch description "login"
* `mh/docs`
  * if there is no ticket just provide your initials and short description

#### Branch commits:

* all branch commits needs to be squashed to one commit so we get clean git history
* this one final commit should contain what ticket it closes in the footer + our conventional commit messages guides

```sh
feat(login): implement login

Closes #MP-123
```

#### 1.1 Some Git rules

There are a set of rules to keep in mind:

* Perform work in a feature branch.

  _Why:_

  > Because this way all work is done in isolation on a dedicated branch rather than the main branch. It allows you to submit multiple pull requests without confusion. You can iterate without polluting the master branch with potentially unstable, unfinished code. [read more...](https://www.atlassian.com/git/tutorials/comparing-workflows#feature-branch-workflow)

* Branch out from `develop`

  _Why:_

  > This way, you can make sure that code in master will almost always build without problems, and can be mostly used directly for releases (this might be overkill for some projects).

* Never push into `develop` or `master` branch. Make a Pull Request.

  _Why:_

  > It notifies team members that they have completed a feature. It also enables easy peer-review of the code and dedicates forum for discussing the proposed feature.

* Update your local `develop` branch and do an **interactive rebase before pushing** your feature and making a Pull Request.

  _Why:_

  > Rebasing will merge in the requested branch (`master` or `develop`) and apply the commits that you have made locally to the top of the history without creating a merge commit (assuming there were no conflicts). Resulting in a nice and clean history. [read more ...](https://www.atlassian.com/git/tutorials/merging-vs-rebasing)

* Resolve potential conflicts while rebasing and before making a Pull Request.
* Delete local and remote feature branches after merging.

  _Why:_

  > It will clutter up your list of branches with dead branches. It insures you only ever merge the branch back into (`master` or `develop`) once. Feature branches should only exist while the work is still in progress.

* Before making a Pull Request, make sure your feature branch builds successfully and passes all tests (including code style checks).

  _Why:_

  > You are about to add your code to a stable branch. If your feature-branch tests fail, there is a high chance that your destination branch build will fail too. Additionally, you need to apply code style check before making a Pull Request. It aids readability and reduces the chance of formatting fixes being mingled in with actual changes.

* Use [this](./.gitignore) `.gitignore` file.

  _Why:_

  > It already has a list of system files that should not be sent with your code into a remote repository. In addition, it excludes setting folders and files for most used editors, as well as most common dependency folders.

* Protect your `develop` and `master` branch.

  _Why:_

  > It protects your production-ready branches from receiving unexpected and irreversible changes. read more... [Github](https://help.github.com/articles/about-protected-branches/) and [Bitbucket](https://confluence.atlassian.com/bitbucketserver/using-branch-permissions-776639807.html)

#### 1.2 Git workflow

Because of most of the reasons above, we use [Feature-branch-workflow](https://www.atlassian.com/git/tutorials/comparing-workflows#feature-branch-workflow) with [Interactive Rebasing](https://www.atlassian.com/git/tutorials/merging-vs-rebasing#the-golden-rule-of-rebasing) and some elements of [Gitflow](https://www.atlassian.com/git/tutorials/comparing-workflows#gitflow-workflow) (naming and having a develop branch). The main steps are as follows:

* For a new project, initialize a git repository in the project directory. **For subsequent features/changes this step should be ignored**.

  ```sh
  cd <project directory>
  git init
  ```

* Checkout a new feature/bug-fix branch.
  ```sh
  git checkout -b <branchname>
  ```
* Make Changes.

  ```sh
  git add
  git commit -a
  ```

  _Why:_

  > `git commit -a` will start an editor which lets you separate the subject from the body. Read more about it in _section 1.3_.

* Sync with remote to get changes you’ve missed.

  ```sh
  git checkout develop
  git pull --rebase
  ```

  _Why:_

  > This will give you a chance to deal with conflicts on your machine while rebasing(later) rather than creating a Pull Request that contains conflicts.

* Update your feature branch with latest changes from develop by interactive rebase.

  ```sh
  git checkout <branchname>
  git rebase -i --autosquash develop
  ```

  _Why:_

  > You can use `--autosquash` to squash all your commits to a single commit. Nobody wants many commits for a single feature in develop branch. [read more...](https://robots.thoughtbot.com/autosquashing-git-commits)

  > **NOTE:**
  >
  > * `git rebase i <after-this-commit>` must be launched with as argument the last commit you want to retain as-is, not the first one you want to change.
  >
  > * if you wanna just squash your all your branch commits you need to execute `git rebase i HEAD~[NUMBER OF COMMITS]` or `git rebase i HEAD~[SHA]`. That number is number of commits in your branch since you've created your branch. You can also use commit hash onto which you wanna squash.

  > _How to get the number of commits since branching against branch(develop) ?_
  >
  > ```sh
  > git rev-list --count develop..
  > ```

  > * Your editor will open with a file like:
  >
  > ```
  > pick fda59df commit 1
  > pick x536897 commit 2
  > pick c01a668 commit 3
  > ```
  >
  > Each line represents a commit (in chronological order, the latest commit will be at the bottom).
  >
  > To transform all these commits into a single one, change the file to this:
  >
  > ```
  > pick fda59df commit 1
  > squash x536897 commit 2
  > squash c01a668 commit 3
  > ```
  >
  > This means, you take the first commit, and squash the following onto it. If you remove a line, the corresponding commit is actually really lost. Don't bother changing the commit messages because they are ignored. After saving the squash settings, your editor will open once more to ask for a commit message for the squashed commit.

  ```

  ```

* If you don’t have conflicts, skip this step. If you have conflicts, [resolve them](https://help.github.com/articles/resolving-a-merge-conflict-using-the-command-line/) and continue rebase.
  ```sh
  git add <file1> <file2> ...
  git rebase --continue
  ```
* Push your branch. Rebase will change history, so you'll have to use `-f` to force changes into the remote branch. If someone else is working on your branch, use the less destructive `--force-with-lease`.

  ```sh
  git push -f
  ```

  _Why:_

  > When you do a rebase, you are changing the history on your feature branch. As a result, Git will reject normal `git push`. Instead, you'll need to use the -f or --force flag. [read more...](https://developer.atlassian.com/blog/2015/04/force-with-lease/)

- Make a Pull Request.
- Pull request will be accepted, merged and close by a reviewer.
- Remove your local feature branch if you're done.

  ```sh
  git branch -d <branchname>
  ```

  to remove all branches which are no longer on remote

  ```sh
  git fetch -p && for branch in `git branch -vv | grep ': gone]' | awk '{print $1}'`; do git branch -D $branch; done
  ```

  to sync existing origin branches with your local ones

  ```sh
  git remote update origin --prune
  ```

#### 1.3 Writing good commit messages

**TL;DR**

* we are using [conventional commit messages](https://conventionalcommits.org/)
* for proper messages guidelines we use a pre-commit hook that validates your message
* if you wanna create proper commit messages easier, you can use `commitizen`. just run `yarn cz` and follow the instructions within your CLI

**More info**

Having a good guideline for creating commits and sticking to it makes working with Git and collaborating with others a lot easier. Here are some rules of thumb ([source](https://chris.beams.io/posts/git-commit/#seven-rules)):

* Separate the subject from the body with a newline between the two.

  _Why:_

  > Git is smart enough to distinguish the first line of your commit message as your summary. In fact, if you try git shortlog, instead of git log, you will see a long list of commit messages, consisting of the id of the commit, and the summary only.

* Limit the subject line to 100 characters and Wrap the body at 100 characters.

  _why_

  > Commits should be as fine-grained and focused as possible, it is not the place to be verbose. [read more...](https://medium.com/@preslavrachev/what-s-with-the-50-72-rule-8a906f61f09c)

* Do not end the subject line with a period.
* Use [imperative mood](https://en.wikipedia.org/wiki/Imperative_mood) in the subject line.

  _Why:_

  > Rather than writing messages that say what a committer has done. It's better to consider these messages as the instructions for what is going to be done after the commit is applied on the repository. [read more...](https://news.ycombinator.com/item?id=2079612)

- Use the body to explain **what** and **why** as opposed to **how**.
