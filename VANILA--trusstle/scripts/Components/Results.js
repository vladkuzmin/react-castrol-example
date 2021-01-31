import { $, $$, ajax, letters, animateElems, animate  } from "../Functions/Common"

export default class Results {

	constructor(path, results) {
		this.selector = $('#questions')
		this.path = path
		this.results = results
		this.data = null
		this.schemes = []
		this.consider = []
		this.image = $('#image')
		this.background = $('#background')
		this._init()
	}

	_init() {
		this._results()
		this.background.classList.remove('is-visible')
		this._images()
	}

	_results() {
		ajax(`/assets/data/results/${this.path}.json`,
			(data) => {				
				for (let item of data) {
					
					let filters = []

					Object.keys(this.results).map((key) => {

						if (item.filters[key]) {
							filters.push(item.filters[key].indexOf(this.results[key]) > -1)
						}
						
					})

					if (filters.indexOf(false) === -1) {
						this.schemes.push(item)
					}
				}

				// ENGLAND consider
				// ------------------
				if (this.path === 'england' && this.results.deposit === 'No') {
					this.results.deposit = 'Yes'
					for (let item of data) {

						let filters = []

						Object.keys(this.results).map((key) => {

							if (item.filters[key]) {
								filters.push(item.filters[key].indexOf(this.results[key]) > -1)
							}
							
						})

						if (filters.indexOf(false) === -1) {
							this.consider.push(item)
						}
					}
				}
				// ------------------
				

				this._render()
			}
		)
	}

	_render() {
		let markup = `
			<div class="results">
				<h2 class="results__title">Here are your home ownership scheme options</h2>
				<p class="results__desc">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut, amet nostrum molestiae quasi, maxime quae, dolor nisi cupiditate omnis quo quia tenetur error tempora minima voluptatibus nam. Tempora architecto, excepturi?</p>
				<div class="result__options">
					${ this.schemes.map((o) =>`
						<div class="result">
							<div>
								<div class="result__title">${o.title}</div>
								<div class="result__subtitle">Deadline end</div>
							</div>

							<div class="result__desc">${o.desc}</div>
							<div class="result__btns">
								<a href="${o.link}" alt="${o.link}" class="button -secondary">
								<div><span>Find out more</span></div></a>
							</div>
						</div>
					`).join('')}
					${ this.consider.length > 1 ? `
						<div class="result">
							<div>
								<div class="result__title">Consider...</div>
								<div class="result__subtitle">Deadline end</div>
							</div>

							<div class="result__desc">
								${ this.consider.map((n) => `<span>${n.title}</span>`).join('')} 
							</div>
							<div class="result__btns">
								<a href="#" alt="" class="button -secondary">
								<div><span>Find out more</span></div></a>
							</div>
						</div>
						` : ``
					}
				</div>
			</div>
		`
		this.selector.innerHTML = markup

		this.els = {
			results: $('.results'),
			title: $('.results__title'),
			desc: $('.results__desc'),
			options: $$('.result__options > div')
		}

		animateElems(this.els)

	}

	_images() {

		let arr = [
			'/assets/img/scenes/gov-scheme/one.svg',
			'/assets/img/scenes/gov-scheme/two.svg'
		]

		let images = `${arr.map((img) => `<img src="${img}"/>`).join('')}`
		this.image.innerHTML = images
		animate(this.image, 'add', 120)
	}

}