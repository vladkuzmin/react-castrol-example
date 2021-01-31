 export const $ = (el) => document.querySelector(el)
 export const $$ = (els) => document.querySelectorAll(els)

 export const ajax = (url, callback) => {
	fetch(url)
		.then((resp) => resp.json())
		.then((resp) => {
			callback(resp)
		})
		.catch((err) => console.log(err))
}

export const letters = (el) => {
	const str = el.innerHTML
	const arr = str.split(' ')
	let markup = `${arr.map((x) => `
		<div>
			${x.split('').map((y)=> `<span>${y}</span>`).join('')}
		</div>`).join('')}`
	el.innerHTML = markup
}

export const animate = (el, action, speed, cb) => {	

	const els = el.querySelectorAll('div > *' || '*')
	let count = 0

	for (let i = 0; i < els.length; i++) {
		count += speed
		setTimeout(() => {
			els[i].classList[action]('is-active')
			if (i === els.length - 1 && cb) {
				setTimeout(() => cb(), speed)
			}
		}, count)
	}
}

export const animateElems = (els) => {
		
		if(els.title) {
			letters(els.title)
			animate(els.title, 'add', 15)
		}
		
		setTimeout(() => {
			
			if (els.desc) {
				els.desc.classList.add('is-visible')
			}
			
			if (els.options) {
				let count = 0
				for (let i = 0; i < els.options.length; i++) {
					setTimeout(() => {
						els.options[i].classList.add('is-visible')
					}, count)
					count += 50
				}
			}

			if(els.button) {
				els.button.classList.add('.is-visible')
			}

			if (els.back) {
				els.back.classList.add('is-visible')
			}

			if(els.results) {
				els.results.classList.add('is-visible')
			}

		}, 250)

}