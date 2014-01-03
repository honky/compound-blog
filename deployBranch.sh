##this is an example for how i would like deploying to happen

if [[ -z "$1" ]]
then
	branch="$(git symbolic-ref HEAD 2>/dev/null)" || branch="(unnamed branch)" 
else
	branch=$1
fi 

echo "Deploying Branch: "  $branch

##add some time to regret things
sleep 2

#let the party start
git commit -a
git pull
git checkout development 
git merge $branch --ff
git checkout master
git merge development --ff 
git push --a
git checkout $branch
