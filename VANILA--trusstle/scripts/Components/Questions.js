import { $, $$, ajax, animate, animateElems } from "../Functions/Common"
import Results from "../Components/Results"

export default class Questions {

	constructor(selector, opts = {}) {
		
		this.selector 		= document.querySelector(selector)
		this.reset 			= document.querySelector(opts.reset || '#reset')
		this.image 			= document.querySelector(opts.image || '#image')
		this.progressEl		= document.querySelector(opts.progressEl || '#progress')
		this.progress 		= document.querySelector(opts.progress || '#progress__circle')
		this.progressWidth 	= opts.progressWidth || 1000
		
		this.data 			= {}
		this.answered 		= {}
		this.keys 			= {}
		
		this.className 		= opts.className || 'question'
		this.path 			= null
		this.progressPerc  	= 0
		this._init()

	}

	_init() {

		this.selector.parentNode.classList.add('is-active')
		setTimeout(() => {
			this.progressEl.classList.add('is-visible')
		}, 100)

		this._reset()
		
		if (this.reset) {
			this.reset.addEventListener('click', () => this._reset())
		}

		if (this.back) {
			this.back.addEventListener('click', () => this._back())	
		}
	}

	_reset() {

		this.path 			= null
		this.keys 			= {}
		this.progressPerc  	= 0

		ajax(
			`/assets/data/${this.className}/general.json`,
			(data) => {
				this.data 			= data
				this.answered['0'] 	= []
				this._show(0)
			})
	}

	_show(question) {
		
		const a = this.className

		let o = this.data[question]

		this.progressEl.style.display = 'block'

		if (this.path) o = this.data[this.path][question]
		

		const markup = `
			<div class="${a}">
				<div class="${a}__title">${o.title}</div>
				${ o.desc ? 
					`<div class="${a}__desc">${o.desc}</div>`
					: ``
				} 
				<div class="options">
					${ o.options.map((item, i) => `
						<div>
							<input type="radio" name="radio" data-${o.key}="${item.value}" id="q${i}"/>
							<label for="q${i}">${item.label}</label>
						</div>
					`).join('')}
				</div>
				<div id="back-to-previous" class="back-btn">
					<img src="/assets/img/icons/back.svg" alt="Previous question" />
					<span>Previous question</span>
				</div>
			</div>
		`

		this.selector.innerHTML = markup
		
		this.els = {
			question: $(`.${a}`),
			title: $(`.${a}__title`),
			options: $$(`.options > div`),
			back: $(`.back-btn`)
		}

		if ($(`.${a}__desc`)) {
			this.els.desc = $(`.${a}__desc`)
		}
		
		animateElems(this.els)
		this.els.back.addEventListener('click', () => this._back())


		// BACK BUTTON
		// =================
		if(this.answered[0].length === 0) {
			this.els.back.style .display = "none"
		} else {
			this.els.back.style .display = "block"
		}
		// =================


		// IMAGE 
		// ====================
		if (o.img) {
			setTimeout(() => {
				this._image(o.img)
			}, 450)
		}
		// ====================


		const buttons = this.selector.querySelector(`.${this.className}`).querySelectorAll('input')

		for (let i = 0; i < buttons.length; i++) {
			
			buttons[i].addEventListener('click', () => {
				
				const key = Object.keys(buttons[i].dataset)[0]
				const value = buttons[i].dataset[key]
				const next = o.options[i].next
				
				// aswered questions
				// --------------
				this.answered[this.path ? this.path : '0'].push(question)
				// --------------

				this._remove()
				this._submit(o.options[i])

			})
		}

	}

	_submit(o) {

		if (o.key) this.keys[o.key] = o.label
		const type = typeof o.next

		if (type === 'string') {

			if (o.next === 'json') {
				const path = o.label.toLowerCase().replace(' ', '-')

				ajax(
					`/assets/data/${this.className}/${path}.json`,
					(data) => {
						this.data[path] = data
						this.path = path
						this.answered[this.path] = []
						this._show(0)
						this._progress()
					})
			
			} else if (o.next === 'results') {
				this._complete()
				this._progress(1)
				
				setTimeout(() =>{
					new Results(this.path, this.keys)
				}, 750)

			} else {
				let markup = `
					<div class="results">
						<div class="result -lg">
							<div class="results__wrap">
								<div class="result__title">${o.next}</div>
								<div class="result__desc">${o.desc}</div>
								<div class="result__btns">
									<a href="#" alt="" class="button -secondary">
										<div>
											<span>Find out more</span>
										</div>
									</a>
									<div class="back-btn" id="back-to-questions">
										<img src="/assets/img/icons/back.svg" alt="Previous question"/>
										<span>Previous question</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				`

				// IMG
				// =================
				if (o.img) {
					setTimeout(() => {
						this._image(o.img)
					}, 450)
				}
				// =================
				this.selector.innerHTML = markup

				this.els = {
					title: $(`.result__title`),
					desc: $(`.result__desc`),
					back: $(`.back-btn`),
					button: $(`.result .button`),
					results: $(`.results`)
				}

				animateElems(this.els)
				
				this.progressEl.style.display = 'none'
				this.els.back.addEventListener('click', () => this._back())

			}

			return
		}

		this.els = {}
		this._show(o.next)
		this._progress()

	}

	_back() {

		this._remove()
		
		let path = this.path ? this.path : '0'
		let prev = this.answered[path].length - 1

		if (prev < 0 && path !== '0') {
			this.path = null
			this._back()
			return 
		} else if (prev < 0 && path === '0') {
			return	
		}

		this.answered[path].pop()
		this._show(prev)
		this._progress()
		
	}

	_backButton(action) {
		this.back.classList[action]('is-active')
	}

	_progress(perc) {

		if(!perc) {

			if (!this.path || this.answered[this.path].length === 0) { 
				perc = 0.1 * this.answered[0].length
			} else {
				perc = (0.1 * this.answered[0].length) + (this.answered[this.path].length/Object.keys(this.data[this.path]).length)
			}
		}

		this.progressPerc = perc

		this.progress.style.strokeDashoffset = this.progressWidth - (this.progressWidth*this.progressPerc)
	}

	_remove(){
		const images = $$('#image img')
		for (let i = 0; i < images.length; i++) {
			images[i].classList.remove('is-active')
		}
	}

	_image(arr) {
		let images = `${arr.map((img) => `<img src="${img}"/>`).join('')}`
		this.image.innerHTML = images
		animate(this.image, 'add', 120)
	}

	_complete() {
		this._remove()
		this.els.question.classList.add('is-leaving')
		this.progressEl.classList.remove('is-visible')

	}

}