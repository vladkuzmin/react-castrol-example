import { $, animate } from '../Functions/Common'

export default class Scene {
	
	constructor(el, intro) {
		this.intro = intro
		this.el = $(el)
		this._init()
	}

	_init() {
		animate(this.el, 'add', 120, () => {
			$('main').classList.remove('is-scaled')
			setTimeout(() => {
				$('#wrapper').classList.remove('is-frozen')
				this.intro._init()
			}, 750)
		}) 
	}

	_remove() {
		
		const imgs = this.el.querySelectorAll('img')
		for(let i = 0; i < imgs.length; i++) {
			imgs[i].classList.remove('is-active')
		}

	}

}