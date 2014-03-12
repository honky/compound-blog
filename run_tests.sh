if [[ -z "$1" ]]
then
	reporter=nyan 
else
	reporter=$1
fi 


# other reporters are spec and dot
./node_modules/.bin/mocha --require test/init.js test/*/*.test.js -d --check-leaks --reporter $reporter