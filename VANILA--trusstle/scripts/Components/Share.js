import { $ } from '../Functions/Common'

export default class Share {

	constructor() {
		this.els = {
			shareToggle: $('#social-toggle'),
			shareButtons: $('#social-buttons'),
			facebook: $('#facebook'),
			twitter: $('#twitter'),
			copy: $('#copy'),
			alert: $('#copy ._alert') 
		}

		this._init()
	}

	_init() {

		const a = this.els

		a.shareToggle.addEventListener('click', () => this._show())
		a.facebook.addEventListener('click', (e) => this._facebook(e))
		a.twitter.addEventListener('click', (e) => this._twitter(e))
		a.copy.addEventListener('click', (e) => this._copy(e))

	}

	_show() {
		this.els.shareButtons.classList.toggle('is-active')
	}

	_facebook(e) {
		e.preventDefault()

		const url			= window.location.href
		const escapedUrl 	= encodeURIComponent(url)

		window.open('https://www.facebook.com/sharer/sharer.php?u=' + escapedUrl)
	}

	_twitter(e) {
		e.preventDefault()

		const url 			= window.location.href
		const escapedUrl 	= encodeURIComponent(url)
		const shareText		= 'Some twitter text here'
		const escapedText 	= encodeURIComponent(shareText)

		window.open('https://twitter.com/intent/tweet?url=' + escapedUrl + '&text=' + escapedText)

	}

	_copy(e) {
		
		e.preventDefault()

		const url 		= location.origin
		const embedCode = 	`
			<div style="width:100%; height:600px; margin:0 auto; background:#CCC; position:relative;">
				<iframe src="${url}" style="position:absolute; top:0; left:0; width:100%; height:100%; border:0;"></iframe>
			</div>
			<a href="${url}" target="_blank">Government Schemes by Trussle</a>`

		const input 	= document.createElement('textarea')
		input.value = embedCode

		$('body').appendChild(input)
		$('body textarea').select()

		document.execCommand('copy')

		$('body').removeChild($('body textarea'))

		this.els.alert.classList.add('is-active')

		setTimeout(() => {
			this.els.alert.classList.remove('is-active')
		}, 750) 


	}
 
}