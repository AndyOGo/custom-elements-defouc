var fs       = require('fs-promise');
var gituser  = require('git-user-info')();
var gconfig  = fs.readFileSync('.git/config', 'utf8');
var inquirer = require('./inquirer');
var exec     = require('child-process-promise').exec;

var questions = [
	{
		name:    'title',
		message: 'Plugin name: '
	},
	{
		name:    'description',
		message: 'Plugin description:'
	},
	{
		name:    'keywords',
		message: 'Plugin keywords: posthtml, html, posthtml-plugin,'
	},
	{
		name:    'name',
		message: 'Your name:',
		default: gituser.name
	},
	{
		name:    'email',
		message: 'Your email:',
		default: gituser.email
	},
	{
		name:    'username',
		message: 'GitHub username:',
		default: (gconfig.match(/([^\n:]+)\/posthtml-/) || [])[1]
	}
];

var fn;
var name;
var repo;
var url;

inquirer.prompt(questions).then(function (results) {
	// update keywords as array
	var keywords = results.keywords.trim().split(/\s*,\s*/);

	var date = new Date();

	var initialDate = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);

	fn = results.title.replace(/[^\w-]/g, '');
	name = 'posthtml-' + fn.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
	repo = results.username + '/' + name;
	url  = 'https://github.com/' + repo;

	return fs.readJson('package.json').then(function (pkg) {
		// update package description
		pkg.name = name;

		pkg.keywords = pkg.keywords.concat(keywords);

		if (results.description) {
			pkg.description = results.description;
		}

		if (results.name) {
			pkg.author = results.name;

			if (results.email) {
				pkg.author += ' <' + results.email + '>';
			}
		} else {
			delete pkg.author;
		}

		// update package urls
		pkg.repository = repo;

		pkg.bugs = url + '/issues';

		pkg.homepage = url + '#readme';

		// update package development dependencies
		delete pkg.devDependencies['child-process-promise'];
		delete pkg.devDependencies.inquirer;
		delete pkg.devDependencies['fs-extra'];
		delete pkg.devDependencies['fs-promise'];
		delete pkg.devDependencies['git-user-info'];

		// remove install script
		delete pkg.scripts.postinstall;

		// update boilerplate files
		var readme  = parsed('lib/README.md');
		var changes = parsed('lib/CHANGELOG.md');
		var contrib = parsed('lib/CONTRIBUTING.md');
		var indexjs = parsed('lib/index.js');
		var testjs  = parsed('lib/test.js');

		// remove setup directories and update package
		return Promise.all([
			fs.remove('.git'),
			fs.remove('lib'),
			fs.writeJson('package.json', pkg),
			fs.outputFile('README.md', readme),
			fs.outputFile('CHANGELOG.md', changes),
			fs.outputFile('CONTRIBUTING.md', contrib),
			fs.outputFile('index.js', indexjs),
			fs.outputFile('test.js', testjs)
		]);

		function parsed(input) {
			return fs.readFileSync(input, 'utf8')
			.replace(/PLUGIN_FN/g, fn)
			.replace(/PLUGIN_TITLE/g, results.title)
			.replace(/PLUGIN_NAME/g,  name)
			.replace(/PLUGIN_DESC/g,  results.description)
			.replace(/GITHUB_NAME/g,  results.username)
			.replace(/AUTHOR_NAME/g,  results.name)
			.replace(/AUTHOR_EMAIL/g, results.email)
			.replace(/INITIAL_DATE/g, initialDate);
		}
	}).then(function () {
		return exec('npm prune');
	}).then(function () {
		return exec('git init');
	}).then(function () {
		return exec('git remote add origin git@github.com:' + repo + '.git');
	});
});
