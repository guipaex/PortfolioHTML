//const user = "guipaex";
const url = `https://api.github.com/users/${user}/repos`;
const tagFiltro = 'portfolio';
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
		let validRepositories = []
		repositories.forEach(async repository => { 
            let tagged = false;
            repository.topics.forEach(async topic => {
                if (topic == tagFiltro) {
                    tagged = true;
                }
            })
            if (tagged) {
                validRepositories.push(repository)
            }
        })

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