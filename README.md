### Welcome to compound-blog###

This is a project nearly every Webdeveloper does from time to time - writing a blog or cms from scratch using the programming language he or she wants to learn. So do I, and I invite everybody to take part in this compound js, bootstrap 3 thing.

To install and run it yourself:

1. run  ```git clone https://github.com/honky/compound-blog``` to clone the repository
2. run  ```cd compound-blog``` to change to the considered dir
3. run  ```npm install -l``` to install required modules (see a list at package.json)
4. run  ```sudo npm install compound -g``` to use the compound framework
5. run  ```compound db update``` to create the sqlite database tables
6. run  ```compound seed``` to seed the sqlite database with sample data
7. to run the server in debug mode use:  ```compound server 8888```
8. open a browser ```localhost:8888``` and try  ```user``` and  ```password``` as credentials to login the system
9. ???
10. Profit!

The system is in development, sadly far from done. 

### Features ###

* MVC + H with user and admin divided namespaces
* multilanguage support by yml files
* npm tests
* Full usage of juggling db - no 'exceptions'
* Session management (currently) 
* Bootstrap
* Markdown / including editor

### TODO ###

* a lot of things


### Branching ###

Please use the **feature branch** < **development branch** < **master branch** model.
see deployBranch.sh

For developing, and seeing the latest features, use the development branch, and branch of for your feature.
After submitting working code, merge feature branch and development. 

### Models ###

* Posts
	imagine blog posts
* Pages 
	more static, but still from db, might need additional files, like pictures, gallerys etc
* Comments - development only
	can be on pages, posts or whatever
* Tags - development only
* Categories - development only

etc


### Contact ###

Please feel free to contact me, I would really enjoy programming this with somebody else.

### License ###

see license file, please consider that modules might be licensed differently.

