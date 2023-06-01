const URL = `https://api.github.com/users/guipaex/repos`
const FILTER= 'portfolio';

async function generateProjects() {
    let projects = await getProjects(URL)
    projects.forEach(project => {
        const langs = Promise.resolve(project.langs)
        langs.then(function (language) {
            project.langs = language
        })
    })
    return projects
}

async function getProjects(url) {
    try {
        const reposResponse = await fetch(url);
        const repositories = await reposResponse.json();
        const taggedProjects = repositories.filter(repo => repo.topics.includes(FILTER))
        let projects = []
        taggedProjects.forEach(repo => {
            const project = {
                name: repo.name,
                description: repo.description,
                repo: repo.html_url,
                deploy: repo.homepage,
                langs: getLanguages(repo.languages_url)
            };
            projects.push(project)
        });
        return projects
    } catch (error) {
        console.log(error)
    }
}

async function getLanguages(languageURL) {
    try {
        const response = await fetch(languageURL);
        const languages = await response.json();
        const langs = Object.keys(languages)
        return langs
    }
    catch (erro) { console.log(erro) }
}

export { generateProjects }
