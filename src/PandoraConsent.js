/**
 * @author Fabien Cador - fabiencador@gmail.com
 */

const pandoraConsentTpl = document.createElement('template');
pandoraConsentTpl.innerHTML = `
<style>
.pandora-consent{width: fit-content; max-width: 50vw; max-height: 50vh; font-family: Roboto, sans-serif; border-radius: 10px;background-color: #f4f4f4;padding: 0}
.pandora-consent > *:empty{display: none}
.pandora-consent :is(.pandora-header, .pandora-form){padding: 10px 20px; font-size: 14px; text-align: justify;}
.pandora-consent .pandora-form{display: flex; flex-direction: column; justify-content: center; align-items: center;}
.pandora-consent .pandora-form .pandora-checkbox-container{width: 100%;}
.pandora-consent .pandora-form label{width: 100%; display: flex;justify-content: space-between; align-items: center;}
.pandora-consent .pandora-form label p{display: block;}
.pandora-consent::backdrop{opacity: 0.5; background: grey}
.pandora-consent .pandora-header{background-color: #008000;font-size: 22px; color: #f4f4f4;}
.pandora-consent .btn-area {display: flex; justify-content: right;}
.pandora-consent .btn-area :is(.pandora-consent-accept, .pandora-consent-accept-partial, .pandora-consent-refuse) {width: fit-content; padding: 10px 20px; margin: 10px 20px; border-radius: 50px; background-color: #008000; font-size: 12px; font-weight: bold; color: #f4f4f4; border: 1px transparent solid;}
.pandora-consent .btn-area .pandora-consent-refuse {width: fit-content; padding: 10px 20px; margin: 10px 20px; border-radius: 50px; background-color: #f4f4f4; font-size: 12px; font-weight: bold; color: #008000; border: 1px transparent solid;}
.pandora-consent .btn-area :is(.pandora-consent-accept:hover, .pandora-consent-accept-partial:hover, .pandora-consent-refuse:hover){cursor: pointer; background-color: #f4f4f4; color: #008000; border: 1px #008000 solid;}
.pandora-consent .btn-area .pandora-consent-refuse:hover{cursor: pointer; background-color: #f4f4f4; color: #008000; border: 1px #008000 solid;}
.pandora-consent .pandora-form .toggle{position:relative; display: inline-block; width: 60px; height: 34px;}
.pandora-consent .pandora-form .toggle input{opacity: 0; width: 0; height: 0;}
.pandora-consent .pandora-form .toggle .slider{position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: #ccc; -webkit-transition: .2s; transition: .2s; border-radius: 50px;}
.pandora-consent .pandora-form .toggle .slider:before{position: absolute; content:""; cursor: pointer;width: 26px; height: 26px; left: 4px; bottom: 4px; background-color: #f4f4f4; border-radius: 50%;}
.pandora-consent .pandora-form .toggle input:checked + .slider{background-color: #008000;}
.pandora-consent .pandora-form .toggle input:focus + .slider{box-shadow: 0 0 1px #008000;}
.pandora-consent .pandora-form .toggle input:checked + .slider:before{transform: translateX(26px);}
</style>

<dialog class="pandora-consent">
<div class="pandora-header">
<slot name="title"/>
</div>
<form class="pandora-form" method="post">
</form>
<div class="btn-area">
</div>
</dialog>
`

class PandoraConsent extends HTMLElement{
    constructor() {
        super();
        this.attachShadow({mode: "open"});
        this.shadowRoot.appendChild(pandoraConsentTpl.content.cloneNode(true));
    }

    connectedCallback() {
        let pandoraToolbox = document.querySelector("pandora-consent");
        let pandoraConsent = this.shadowRoot.querySelector(".pandora-consent");
        pandoraConsent.showModal();
        let cookies = pandoraToolbox.getAttribute('pandora-cookie');
        let samesite = pandoraToolbox.getAttribute('pandora-cookie-samesite');
        let cookiesArray = cookies.split(",");
        let accept = pandoraToolbox.getAttribute('pandora-accept');
        let some = pandoraToolbox.getAttribute('pandora-partial');
        let refuse = pandoraToolbox.getAttribute('pandora-refuse');

        this.createCheckboxes(cookiesArray);

        let cookieAccept = document.createElement('button');
        let cookieAcceptPartial = document.createElement('button');
        let cookieRefuse = document.createElement('button');
        cookieAccept.setAttribute('type', 'submit');
        cookieAccept.setAttribute('class', 'pandora-consent-accept');
        cookieAcceptPartial.setAttribute('type', 'submit');
        cookieAcceptPartial.setAttribute('class', 'pandora-consent-accept-partial');
        cookieRefuse.setAttribute('type', 'submit');
        cookieRefuse.setAttribute('class', 'pandora-consent-refuse');

        if (accept){
            cookieAccept.setAttribute('value', accept);
            cookieAccept.innerHTML = accept;
        }else{
            cookieAccept.setAttribute('value', 'Accept');
            cookieAccept.innerHTML = 'Accept';
        }
        if(some) {
            cookieAcceptPartial.setAttribute('value', some);
            cookieAcceptPartial.innerHTML = some;
        }else{
            cookieAcceptPartial.setAttribute('value', 'Accept Selected');
            cookieAcceptPartial.innerHTML = 'Accept Selected';
        }
        if (refuse){
            cookieRefuse.setAttribute('value', refuse);
            cookieRefuse.innerHTML = refuse;
        }else{
            cookieRefuse.setAttribute('value', 'Refuse');
            cookieRefuse.innerHTML = 'Refuse';
        }

        if (!samesite)
            samesite = "strict";
        if (samesite === "none")
            samesite = samesite + ";Secure";

        cookieAccept.addEventListener('click', (e) => {
            e.preventDefault();
            cookiesArray.forEach( (cookie) => {
                let inputName = cookie.split(":")[0].toLowerCase();
                document.cookie = inputName + "=true;path=/;samesite=" + samesite;
            } )
            pandoraConsent.close();
        });

        cookieAcceptPartial.addEventListener('click', (e) => {
            e.preventDefault();
            cookiesArray.forEach( (cookie) => {
                let inputName = cookie.split(":")[0].toLowerCase();
                if (this.shadowRoot.querySelector('#' + inputName).checked){
                    document.cookie = inputName + "=true;path=/;samesite=" + samesite;
                }
            } )
            pandoraConsent.close();
        });

        cookieRefuse.addEventListener('click', (e) => {
            e.preventDefault();
            pandoraConsent.close();
        });

        let pandoraBackdrop = this.shadowRoot.querySelector("style")
        let pandoraHeader =  this.shadowRoot.querySelector(".pandora-header");
        let pandoraContent = this.shadowRoot.querySelector(".pandora-form");
        let pandoraAccept = this.shadowRoot.querySelector(".pandora-consent-accept");
        let pandoraAcceptPartial = this.shadowRoot.querySelector(".pandora-consent-accept-partial");
        let pandoraRefuse = this.shadowRoot.querySelector(".pandora-consent-refuse");

        if (pandoraConsent.getAttribute("pandora-backdrop-opacity"))
            pandoraBackdrop.innerHTML += ".pandora-info::backdrop{opacity:"+pandoraConsent.getAttribute("pandora-backdrop-opacity")+"}";
        if (pandoraConsent.getAttribute("pandora-backdrop-color"))
            pandoraBackdrop.style.backgroundColor = pandoraConsent.getAttribute("pandora-backdrop-color");
        if (pandoraConsent.getAttribute("pandora-title-color"))
            pandoraHeader.style.color = pandoraConsent.getAttribute("pandora-title-color");
        if (pandoraConsent.getAttribute("pandora-title-bg"))
            pandoraHeader.style.backgroundColor = pandoraConsent.getAttribute("pandora-title-bg");
        if (pandoraConsent.getAttribute("pandora-msg-color"))
            pandoraContent.style.color = pandoraConsent.getAttribute("pandora-msg-color");
        if (pandoraConsent.getAttribute("pandora-msg-bg"))
            pandoraContent.style.backgroundColor = pandoraConsent.getAttribute("pandora-msg-bg");
        if (pandoraConsent.getAttribute("pandora-valid-btn-color")) {
            pandoraAccept.style.color = pandoraConsent.getAttribute("pandora-valid-btn-color");
            pandoraAcceptPartial.style.color = pandoraConsent.getAttribute("pandora-valid-btn-color");
        }
        if (pandoraConsent.getAttribute("pandora-valid-btn-bg")) {
            pandoraAccept.style.backgroundColor = pandoraConsent.getAttribute("pandora-valid-btn-bg");
            pandoraAcceptPartial.style.backgroundColor = pandoraConsent.getAttribute("pandora-valid-btn-bg");
        }
        if (pandoraConsent.getAttribute("pandora-refuse-btn-color"))
            pandoraRefuse.style.backgroundColor = pandoraConsent.getAttribute("pandora-refuse-btn-color");
        if (pandoraConsent.getAttribute("pandora-refuse-btn-bg"))
            pandoraRefuse.style.backgroundColor = pandoraConsent.getAttribute("pandora-refuse-btn-bg");

        this.shadowRoot.querySelector('.btn-area').appendChild(cookieRefuse);
        this.shadowRoot.querySelector('.btn-area').appendChild(cookieAcceptPartial);
        this.shadowRoot.querySelector('.btn-area').appendChild(cookieAccept);
    }

    createCheckboxes(pCookies) {
        let i= 0;
        pCookies.forEach( (cookie) => {
            i++;
            let div = document.createElement('div');
            let inputName = cookie.split(":")[0].toLowerCase();
            let inputValue = cookie.split(":")[1];
            let cookieInput = document.createElement('input');
            let cookieLabel = document.createElement('label');
            let toggle = document.createElement('div');
            let slider = document.createElement('div');

            div.setAttribute('class', 'pandora-checkbox-container pandora-checkbox-container'+i);
            cookieInput.setAttribute('type', 'checkbox');
            cookieInput.setAttribute('name', inputName);
            cookieInput.setAttribute('id', inputName);
            cookieInput.setAttribute('value', inputValue);
            cookieInput.checked = true;
            cookieInput.setAttribute('class', 'pandora-consent-checkbox');
            cookieLabel.setAttribute('for', inputName);
            cookieLabel.setAttribute('class', 'label label'+i)
            cookieLabel.innerHTML = '<p>'+inputValue+'</p>';
            toggle.setAttribute('class', 'toggle toggle'+i)
            slider.setAttribute('class', 'checked slider slider'+i);
            this.shadowRoot.querySelector('.pandora-form').appendChild(div);
            this.shadowRoot.querySelector('.pandora-checkbox-container'+i).appendChild(cookieLabel);
            this.shadowRoot.querySelector('.label'+i).appendChild(toggle);
            this.shadowRoot.querySelector('.toggle'+i).appendChild(cookieInput);
            this.shadowRoot.querySelector('.toggle'+i).appendChild(slider);
        })
    }
}
window.customElements.define('pandora-consent', PandoraConsent);