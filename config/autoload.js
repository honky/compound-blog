module.exports = function(compound) {
  var defaultModules = [
    'jugglingdb',
    'co-assets-compiler',
    'marked',
    'everyauth'
  ],
    developmentModules = [];

  if ('development' === compound.app.get('env')) {
    developmentModules = [
      'ejs-ext',
      'seedjs',
      'co-generators',
      'marked',
      'everyauth'
    ]
  }

  if (typeof window === 'undefined') {
    return defaultModules.concat(developmentModules).map(require);
  } else {
    return []
  }
};