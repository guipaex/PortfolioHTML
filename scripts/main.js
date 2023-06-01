import { toggleMenu } from './menu.js'
import { printCard } from './prints.js'
import { generateProjects } from './repositories.js'

const reposContainer = document.querySelector("[data-repos]")

Promise.resolve(generateProjects()).then(function (projects){
    projects.forEach(project => {
        Promise.resolve(project.langs).then( () => {
                    reposContainer.innerHTML += printCard(project, project.langs)
                    }
                )
        });
    })