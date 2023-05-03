const user = "guipaex";
const url = `https://api.github.com/users/${user}/repos`;

const reposContainer = document.querySelector("[data-repos]")

document.addEventListener('load', createCards())

async function createCards(){
	const repositories = await getRepositories(url) //obj JSON recebido ASSINCRONAMENTE.
	
	for(i = 0; i < repositories.length; i++){
		const repoLangs = await getLanguages(repositories[i].url)
		reposContainer.innerHTML+= printCard(repositories[i], repoLangs)
	}
}

async function getRepositories(url){
	try{
		const githubEndPoint = await fetch(url);
		const repositories = await githubEndPoint.json();
		//Pega a response e cria um array de objetos com todos os repositórios;
		
		const validRepositories = repositories.filter(repository => repository.homepage !== null)
		//Os repositorios válidos são os que possuem uma URL de Build.

		return validRepositories
	}
	catch (erro) { console.log(erro)}

}
async function getLanguages(repository){
	try{
		const langsEndPoint = await fetch(`${repository}/languages`);
		const langs = await langsEndPoint.json();
		return langs
	}
	catch (erro) { console.log(erro)}

}

function printCard(repo, langs){
	
	const title = repo.name.replace(/[-]+/g, " ");
	const description = repo.description;
	const repoLink = repo.html_url;
	const build = repo.homepage;

	const card =`<div class="repo__card">
		<div class="repo__langs" data-lang> ${createLangTag(langs)} </div>
		<h1 class="repo__title">${title}</h1>
		<p class="repo__description">${description}</p>
		<div class="repo__links">
			<a class="repo__github" href="${repoLink}" target="_blank" >Ver repositório</a>
			<a class="build__button" href="${build}"target="_blank" alt="Live Preview"><img src="img/icons/eye.svg">Build</a>
		</div>
	</div>`
	
	return card
}

function createLangTag(langs){
	const repoLangs = Object.keys(langs)

	const langTag = []
	
	repoLangs.forEach(language => {
		langTag.push(`<span class="repo__tag ${language}">${language}</span>`)
	});
	
	return langTag.join('')
}