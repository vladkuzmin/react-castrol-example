import { $, $$, letters, animate } from '../Functions/Common'
import Scene from '../Components/Scene'
import Questions from '../Components/Questions'


export default class Intro {
	
	constructor(){
		
		this.els = {
			wrapper: $('#wrapper'),
			main: $('main'),
			images: '#image',
			intro: $('#intro'),
			title: $('#intro h1'),
			paragraph: $('#intro p'),
			start: $('[data-action="start"]'),
			logo: $('#logo'),
			header: $('#header'),
			bg: $('#background')
		}

		this._load()
	}

	_load() {
		this.scene = new Scene('#image', this)
	}
	
	_init() {

		const a = this.els

		// Title animation
		// ------------------
		letters(a.title)
		a.title.classList.add('is-visible')
		animate(a.title, 'add', 35)
		// ------------------
		
		a.header.classList.add('is-visible')
		a.paragraph.classList.add('is-visible')
		a.start.classList.add('is-visible')
		a.logo.classList.add('is-visible')

		this.els.start.addEventListener('click', () => this._start())

	}

	_start() {

		this._remove()

		setTimeout(() => {
			
			this.els.intro.classList.add('is-hidden')

			new Questions('#app', { 
				className: 'questions', 
				reset: '#reset',
				back: '#back',
				progress: '#progress__circle',
				progressWidth: 282,
				image: '#image'
			})

		}, 1000)
		

	}

	_remove() {
		const a = this.els
		this.scene._remove()
		a.intro.classList.add('is-leaving')
		a.logo.classList.add('is-bottom')
		a.bg.classList.add('is-visible')
	}


}