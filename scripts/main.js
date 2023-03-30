// GET REPOS from Git
const user = "guipaex";

const url = `https://api.github.com/users/${user}/repos`; //Endpoint dos repositorios

const renderResult = document.querySelector("[data-repos]")

axios.get(url).then(response => {
		const repos = response.data;

		for (i=0; i < repos.length; i++){

			let repoLink 	=	repos[i].html_url;						//Pega a URL do Repositório no GitHub
			let projName 	= repos[i].name.replace(/[- ]+/g, " ")		//Pega o nome do Repositório e troca os "-" por espaço
			let projDesc 	= repos[i].description;						//Pega Descrição do projeto
			let repoPage 	= repos[i].homepage;						//Pega a página de Build do projeto	
			let projURL 	= repos[i].url								//Pega a URL de API do projeto específico
			

			//EndPoint das linguages do repositorio: https://api.github.com/repos/${user}/"nome-do-projeto"/languages`


			let projLangs = axios.get(`${projURL}/languages`).then(response => {
				const langs = response.data;
				return langs
			}).catch(error => console.log(error))

			console.log(`${projURL}/languages`)

			console.log(projLangs)
			
			//Exclui o repositório do READ.ME e os que não possuem LivePreview
			if(	projName !== user && repoPage !== null){
				createCard(projName, projDesc, repoLink, repoPage)
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
				<span class="repo__tag HTML">HTML</span>
				<span class="repo__tag HTML">HTML</span>
			</div>
			<div class="repo__links">
				<a class="repo__github" href="${gitLink}"><img src="img/icons/github.svg"></a>
				<a class="repo__preview" href="${previewLink}" alt="Live Preview"><img src="img/icons/eye.svg">Live Preview</a>
			</div>
		</div>`

		renderResult.innerHTML += card
	}


/* Pro futuro...
Botão de fazer o Fork https://github.com/${user}/${rep-url}/fork
*/