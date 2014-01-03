module.exports = function(compound, User) {
	// define User here
	//returns true or false
	function verifyCredentials(givenCredential) {
		if (givenCredential === this.passwort) {
			return true;
		} else {
			return false;
		}
	}
};