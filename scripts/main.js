const user = "guipaex";
const url = `https://api.github.com/users/${user}/repos`;

const reposContainer = document.querySelector("[data-repos]")

axios.get(url).then( async response => {
		const repositories = response.data;

		for (i=0; i < repositories.length; i++){

			const repoLink = repositories[i].html_url;							//Pega a URL do Repositório no GitHub
			const projectName = repositories[i].name.replace(/[- ]+/g, " ")		//Pega o nome do Repositório e troca os "-" por espaço
			const projectDescription = repositories[i].description;				//Pega Descrição do projeto
			const projectBuild = repositories[i].homepage;						//Pega a página de Build do projeto	
			const projectAPI = repositories[i].url								//Pega a URL de API do projeto específico

			//EndPoint das linguages do repositorio: https://api.github.com/repos/${user}/"nome-do-projeto"/languages`

			const projectLangs = await axios.get(`${projectAPI}/languages`)
			.then(response => {
				const langs = response.data;
				return langs
			}).then( obj => {
				return Object.keys(obj) //retorna um Array com as keys do objeto 'langs'(No caso, as keys são as linguagens)
			}).catch(error => console.log(error))

			

			// console.log(`${projectAPI}/languages`)
			
			//Exclui o repositório do READ.ME e os que não possuem LivePreview
			if(	projectName !== user && projectBuild !== null){

				const lang1 = projectLangs[0]
				const lang2 = projectLangs[1]
				const lang3 = projectLangs[2]

				createCard(projectName, projectDescription, lang1, lang2, lang3, repoLink, projectBuild)
			}
		}
	}).catch(error => console.log(error))


	function createCard(title, description, lang1, lang2, lang3 , gitLink, previewLink){
		
		if (lang3 !== undefined){
			lang3 = `<span class="repo__tag ${lang3}">${lang3}</span>`
		} else {
			lang3 = ""
		}

		const card =
		`<div class="repo__card">
			<h1 class="repo__title">${title}</h1>
			<p class="repo__description">${description}</p>
			<div class="repo__langs" data-lang>
				<span class="repo__tag ${lang1}">${lang1}</span>
				<span class="repo__tag ${lang2}">${lang2}</span>
				${lang3}
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