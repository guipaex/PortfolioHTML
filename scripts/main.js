const user = "guipaex"; // SET Repositorie owner
const url = `https://api.github.com/users/${user}/repos`; //Endpoint dos repositorios

const reposContainer = document.querySelector("[data-repos]")

axios.get(url).then(response => {
		const repositories = response.data;

		for (i=0; i < repositories.length; i++){

			const repoLink = repositories[i].html_url;							//Pega a URL do Repositório no GitHub
			const projectName = repositories[i].name.replace(/[- ]+/g, " ")		//Pega o nome do Repositório e troca os "-" por espaço
			const projectDescription = repositories[i].description;						//Pega Descrição do projeto
			const projectBuild = repositories[i].homepage;						//Pega a página de Build do projeto	
			const projectAPI = repositories[i].url								//Pega a URL de API do projeto específico

			//EndPoint das linguages do repositorio: https://api.github.com/repos/${user}/"nome-do-projeto"/languages`

			let projectLangs = axios.get(`${projectAPI}/languages`).then(response => {
				const langs = response.data;
				return langs
			}).catch(error => console.log(error))

			console.log(`${projectAPI}/languages`)
			console.log(projectLangs)
			
			//Exclui o repositório do READ.ME e os que não possuem LivePreview
			if(	projectName !== user && projectBuild !== null){
				createCard(projectName, projectDescription, repoLink, projectBuild)
			}
		}
	}).catch(error => console.log(error))


	function createCard(title, description, gitLink, previewLink){
		
		let card =
		`<div class="repo__card">
			<h1 class="repo__title">${title}</h1>
			<p class="repo__description">${description}</p>
			<div class="repo__langs">
				<span class="repo__tag HTML">HTML</span>
				<span class="repo__tag CSS">CSS</span>
				<span class="repo__tag JavaScript">JavaScript</span>
			</div>
			<div class="repo__links">
				<a class="repo__github" href="${gitLink}"><img src="img/icons/github.svg"></a>
				<a class="repo__preview" href="${previewLink}" alt="Live Preview"><img src="img/icons/eye.svg">Live Preview</a>
			</div>
		</div>`

		reposContainer.innerHTML += card
	}


/* Pro futuro...
Botão de fazer o Fork https://github.com/${user}/${rep-url}/fork
*/