
function formatTitle(title) {
    return title.replace(/[-]+/g, " ")
}

function langTags (projectLangs){
    let langTags = []
    let tagLimit = projectLangs.length <= 3? 2 : 3;
    console.log(projectLangs.length)
    console.log(tagLimit)
    for (let i = 0; i < tagLimit; i ++){
        langTags.push(`<span class="repo__tag ${projectLangs[i]}">${projectLangs[i]}</span>`)
    }

    return langTags.join('')
}

export function printCard(project, language) {
    const card = `
        <div class="repo__card">
            <div class="repo__langs" data-lang> ${langTags(language)} </div>
            <h1 class="repo__title">${formatTitle(project.name)}</h1>
            <p class="repo__description">${project.description}</p>
            <div class="repo__links">
                <a class="repo__github" href="${project.repo}" target="_blank"> Detalhes </a>
                <a class="build__button" href="${project.deploy}"target="_blank" alt="Visualizar Projeto"><img src="./assets/img/icons/eye.svg"> Visualizar </a>
            </div>
        </div>
    `
    return card
}
