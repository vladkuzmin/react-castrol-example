import { REGION } from '../helpers/http'

export default class Modifier {

    constructor() {
        this.cimaTop = document.querySelector('.cima--top-locations')
        this.cimaInfo = document.querySelector('.cima--info')
        this.cimaRegional = document.querySelector('.cima--regional')
        this.carousel = document.querySelector('.content.carousel')
        this.cimaMapContent = document.querySelector('.cima--map-content')
        this.cimaBranches = this.cimaRegional.querySelectorAll('.half')[1]
        this.isCarouselInit = false
    }

    render(opts = {}) {

        if (opts.locations.length === 0) return
        
        this.cimaTop.classList.add('inactive')
        
        this.cimaInfo.classList.add('active')
        this.cimaRegional.classList.add('active')
        this.cimaMapContent.classList.add('active')

        let str = ''

        switch (opts.locations.length) {
            case 1: 
                str = `${opts.locations[0].searchName}`
                break
            case 2:
                str = `${opts.locations[0].searchName} and ${opts.locations[1].searchName}`
                break
        }

        document.querySelector('[data-js-search-text]').parentNode.innerHTML = `Data for the last ${opts.period} months in ${str} <span data-js-search-text></span>`

        this.loadRegion(opts.locations)

        if (!this.isCarouselInit) {
            window.dispatchEvent(new Event('resize'))
            this.isCarouselInit = true
        }
    }


    async loadRegion(locations) {

        const regions = locations.map(async loc => {
            const region = 
                await REGION.get('', {
                        params: {
                            lon: loc.geometry.location.lng,
                            lat: loc.geometry.location.lat
                        }
                    }).then((response) => {
                        if (response.data) {
                            if (response.data.result[0].region !== null) {
                                return response.data.result[0].region
                            } else if (response.data.result[0].country !== null) {
                                return response.data.result[0].country
                            }
                        } else {
                            return 'United Kingdom'
                        }
                        
                    }).catch(() => {
                        return 'United Kingdom'
                    })
            
            return region
        })

        let regionsNames  = await Promise.all(regions)

        let locs = []

        regionsNames.map((x, i) => {
            
            let installations = '0'
            let branches = '0'

            switch (x.toLowerCase()) {
                case 'west yorkshire':
                case 'yorkshire and the humber':
                    installations = '20,063';
                    branches = '1';
                    break;
                case 'east midlands':
                    installations = '16,406';
                    branches = '1';
                    break;
                case 'east of england':
                    installations = '24,849';
                    branches = 2;
                    break;
                case 'london':
                    installations = '57,169';
                    branches = 1;
                    break;
                case 'north west':
                    installations = '19,457';
                    branches = '3';
                    break;
                case 'south east':
                    installations = '42,038';
                    branches = '4';
                    break;
                case 'south west':
                    installations = '14,279';
                    branches = '2';
                    break;
                case 'scotland':
                    installations = '18,331';
                    branches = '3';
                    break;
                case 'west midlands':
                    installations = '19,174';
                    branches = '1';
                    break;
                default:
                    installations = '250,288';
                    branches = '22';
            }

            locs.push({
                instalations: installations,
                branches: branches,
                region: branches === '22' ? 'United Kingdom' : locations[i].region,
                regionAPI: x
            })
        })

        if (locs.length === 2 && (locs[0].regionAPI === locs[1].regionAPI)) {
            locs = [locs[0]]
        } 

        const markup = `${locs.map((x, i) => `
            <div style="${i === 0 ? `margin-bottom: 30px;`: ``}">
                <h3>${x.region}</h3>
                <dl>
                    <dt>Branches:</dt>
                    <dd>${x.branches}</dd>
                </dl>
                <dl>
                    <dt>Instalations:</dt>
                    <dd>${x.instalations}</dd>
                </dl>
            </div>
        `).join('')}`

        this.cimaBranches.innerHTML = markup
    }
}