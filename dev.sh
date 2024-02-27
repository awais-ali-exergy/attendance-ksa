
#/bin/bash
BRANCH=develop
branch_name=$(git symbolic-ref -q HEAD)
branch_name=${branch_name##refs/heads/}
branch_name=${branch_name:-HEAD}
user_name=$(git config user.name)

currentDate=`date`

echo "current branch: $branch_name"
# Get to code.  Exit if unsaved changes in repo


if `git status | grep -q "nothing to commit"`; then
  git checkout --quiet $BRANCH || exit 1
  git reset --hard $branch_name
  yarn build:develop
  git add . 
  git commit -m "Build by $user_name of $BRANCH for $branch_name at $currentDate"
  git push --force
 
  git checkout $branch_name;

  # curl --location --request GET 'https://dev-eod-apiwasfati.kakashi.app/ci-cd.php?key=efx777';
else
  echo "ERROR: repo has unsaved changes"
  sleep 5

  exit 1
fi

#git checkout develop
