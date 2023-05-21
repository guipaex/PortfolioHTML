
const reposContainer = document.querySelector("[data-repos]")
const tagFiltro = 'portfolio'
const user = "guipaex";
const endpoint = `https://api.github.com/users/${user}/repos`;

let projects = []

async function getRepositories() {
    try {
        const result = await fetch(endpoint);
        const repos = await result.json();

        repos.forEach(async repository => {
            let tagged = false;
            repository.topics.forEach(async topic => {
                if (topic = tagFiltro) {
                    tagged = true;
                }
            })
            if (tagged) {
                const project = new Object();
                project.name = repository.name;
                project.description = repository.description;
                project.repo = repository.html_url;
                project.page = repository.homepage;
                project.languages = getLanguages(repository.url);
                projects.push(project)
            }
        })
    } catch (erro) {
        console.log(erro)
    }
}

async function getLanguages(url) {
    try {
        const langsURL = await fetch(`${url}/languages`);
        const langs = await langsURL.json();
        return langs;
    }
    catch (erro) {
        console.log(erro)
    }
}

async function getProjects() {
    await getRepositories()
    return projects
}
getProjects()
    .then((projects) => {
        projects.forEach(project => {
            console.log(project)
        })
    })
/*


*/
