import React, { Component } from 'react'

import Icon from './Icon'

class Cta extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isCopy: false
        }
    }

    copyUrl = () => {
        
        const   input = document.createElement('input'),
                text = window.location.href;

        document.body.appendChild(input);
        input.value = text;
        input.select();
        document.execCommand('copy');
        document.body.removeChild(input);


        this.setState({
            isCopy: true
        })
        setTimeout(() => {
            this.setState({
                isCopy: false,
                isSocial: false
            })  
        }, 1500)
    }

    emailTo = () => {
        window.location.href = "mailto:evfluids@castrol.com?subject=Castrol e-Fluids&body=Your message here"
    }

    showSocial = () => {
        if (navigator.share) {
            navigator.share({
              title: 'Castrol EV',
              url: window.location.href
            })
            .catch(console.error);
          } else {
            this.toggleSocial()
          }    
    }

    shareFacebook = () => {
        this.toggleSocial()
        let shareURL = "https://www.facebook.com/sharer/sharer.php?"
        var params = {
            u: window.location.href, 
            title: "TEXT",
        }
        this.openWindow(shareURL, params)
    }

    shareTwitter = () => {
        this.toggleSocial()
        let shareURL = "http://twitter.com/share?"
        var params = {
            url: window.location.href, 
            text: "TEXT",
            hashtags: "castrol,castrolev"
        }
        this.openWindow(shareURL, params)
    }

    openWindow(shareURL, params) {
        for(let prop in params) shareURL += '&' + prop + '=' + encodeURIComponent(params[prop])
        window.open(shareURL, '', 'left=0,top=0,width=550,height=450,personalbar=0,toolbar=0,scrollbars=0,resizable=0')
    }

    toggleSocial() {
        this.setState({
            isSocial: !this.state.isSocial
        })
    }

    render() {
        return (           
            <> 
                <div className="footer">
                    <div className="footer__item">
                        <Icon
                            className = "-social"
                            icon = 'link'
                            text = "Copy link"
                            handleClick = { this.copyUrl }
                        />
                        { this.state.isCopy 
                            ? <div className="message">
                                Url is copied
                            </div>
                            : ''
                        }
                    </div>

                    <div className="footer__item">
                        <Icon
                            className = "-social"
                            icon = 'email'
                            text = "Request more info"
                            handleClick = { this.emailTo }
                        />
                    </div>

                    <div className="footer__item">
                        <Icon
                            className = {`-social ${this.state.isSocial ? 'is-active' : ''}`}
                            icon = 'share'
                            text = "Share"
                            handleClick = { this.showSocial }
                        />
                        {
                            this.state.isSocial 
                            ?   <div className="footer__social">
                                    <Icon
                                        className="-social"
                                        icon = 'facebook'
                                        handleClick = { this.shareFacebook }
                                    />
                                    <Icon
                                        className="-social "
                                        icon = 'twitter'
                                        handleClick = { this.shareTwitter }
                                    />
                                </div>
                            : ''
                        }
                    </div>
                </div>
            </>
        );
    }
}

export default Cta