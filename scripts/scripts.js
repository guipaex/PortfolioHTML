
const reposContainer = document.querySelector("[data-repos]")
const tagFiltro = 'portfolio'
const user = "guipaex";
const endpoint = `https://api.github.com/users/${user}/repos`;

let projects = []

async function getRepositories(){
	try{
		const result = await fetch(endpoint);
        const repos = await result.json();

        repos.forEach( repository => {
            let tagged = false
            repository.topics.forEach(topic => {
                if (topic = tagFiltro){
                    tagged = true
                };
            });
            if(tagged){
                const project = new Object();
                project.name = repository.name
                project.description = repository.description
                project.repo = repository.html_url
                project.page = repository.homepage
                project.languages = getLanguages(repository.url)
                projects.push(project)
            }
        });
	}
	catch (erro){ 
        console.log(erro)
    }
}
async function getLanguages(url){
	try{
		const langs = await fetch(`${url}/languages`);
		return langs.json()
	}
	catch (erro) { console.log(erro)}
}

getRepositories()

console.log(projects)
export default projects
