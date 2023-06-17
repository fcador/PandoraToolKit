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
        // Select necessary elements and get attributes
        const pandoraToolbox = document.querySelector("pandora-consent");
        const pandoraConsent = this.shadowRoot.querySelector(".pandora-consent");
        const cookies = pandoraToolbox.getAttribute('pandora-cookie');
        const cookiesArray = cookies.split(",");
        const accept = pandoraToolbox.getAttribute('pandora-accept') || 'Accept';
        const some = pandoraToolbox.getAttribute('pandora-partial') || 'Accept Selected';
        const refuse = pandoraToolbox.getAttribute('pandora-refuse') || 'Refuse';
        
        // Then open modal
        pandoraConsent.showModal();
        this.createSliders(cookiesArray);
        this.createButtons(accept, some, refuse, cookiesArray, pandoraConsent);
        this.setConsentAttributes(pandoraConsent);
    }
    
    // Method to create the different sliders and their associated labels
    createSliders(pCookies) {
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

    // Method to create the accept, partial accept, and refuse buttons
    createButtons(accept, some, refuse, cookiesArray, pandoraConsent) {
        const cookieAccept = this.createButton('pandora-consent-accept', accept);
        const cookieAcceptPartial = this.createButton('pandora-consent-accept-partial', some);
        const cookieRefuse = this.createButton('pandora-consent-refuse', refuse);

        cookieAccept.addEventListener('click', (e) => this.handleAccept(e, cookiesArray, pandoraConsent));
        cookieAcceptPartial.addEventListener('click', (e) => this.handlePartialAccept(e, cookiesArray, pandoraConsent));
        cookieRefuse.addEventListener('click', (e) => this.handleRefuse(e, pandoraConsent));

        const buttonArea = this.shadowRoot.querySelector('.btn-area');
        buttonArea.appendChild(cookieRefuse);
        buttonArea.appendChild(cookieAcceptPartial);
        buttonArea.appendChild(cookieAccept);
    }

    // Helper method to create a button
    createButton(className, innerText) {
        const button = document.createElement('button');
        button.setAttribute('type', 'submit');
        button.setAttribute('class', className);
        button.setAttribute('value', innerText);
        button.innerText = innerText;

        return button;
    }

    handleAccept(e, cookiesArray, pandoraConsent) {
        e.preventDefault();
        const acceptedCookies = cookiesArray.map((cookie) => cookie.split(":")[0].toLowerCase());
        pandoraConsent.close();
        this.dispatchEvent(new CustomEvent('cookies-accepted', { detail: { acceptedCookies }}));
    }
    
    handlePartialAccept(e, cookiesArray, pandoraConsent) {
        e.preventDefault();
        const acceptedCookies = [];
        cookiesArray.forEach((cookie) => {
            const inputName = cookie.split(":")[0].toLowerCase();
            if (this.shadowRoot.querySelector(`#${inputName}`).checked){
                acceptedCookies.push(inputName);
            }
        })
        pandoraConsent.close();
        this.dispatchEvent(new CustomEvent('cookies-partially-accepted', { detail: { acceptedCookies }}));
    }
    
    handleRefuse(e, pandoraConsent) {
        e.preventDefault();
        const refusedCookies = cookiesArray.map((cookie) => cookie.split(":")[0].toLowerCase());
        pandoraConsent.close();
        this.dispatchEvent(new CustomEvent('cookies-refused', { detail: { refusedCookies }}));
    }
    
    // Method to set the attributes for the consent popin
    setConsentAttributes(pandoraConsent) {
        const pandoraBackdrop = pandoraConsent.getAttribute("pandora-backdrop-opacity");
        const pandoraHeaderBg = pandoraConsent.getAttribute("pandora-title-bg");
        const pandoraHeaderColor = pandoraConsent.getAttribute("pandora-title-color");
        const pandoraContentBg = pandoraConsent.getAttribute("pandora-msg-bg");
        const pandoraContentColor = pandoraConsent.getAttribute("pandora-msg-color");
        const pandoraAcceptColor = pandoraConsent.getAttribute("pandora-valid-btn-color");
        const pandoraAcceptBg = pandoraConsent.getAttribute("pandora-valid-btn-bg");
        const pandoraRefuseColor = pandoraConsent.getAttribute("pandora-refuse-btn-color");
        const pandoraRefuseBg = pandoraConsent.getAttribute("pandora-refuse-btn-bg");
    
        if (pandoraBackdrop) {
            this.shadowRoot.querySelector("style").innerHTML += `.pandora-info::backdrop{opacity:${pandoraBackdrop}}`;
        }
        if (pandoraHeaderBg) {
            this.shadowRoot.querySelector(".pandora-header").style.backgroundColor = pandoraHeaderBg;
        }
        if (pandoraHeaderColor) {
            this.shadowRoot.querySelector(".pandora-header").style.color = pandoraHeaderColor;
        }
        if (pandoraContentBg) {
            this.shadowRoot.querySelector(".pandora-form").style.backgroundColor = pandoraContentBg;
        }
        if (pandoraContentColor) {
            this.shadowRoot.querySelector(".pandora-form").style.color = pandoraContentColor;
        }
        if (pandoraAcceptColor) {
            this.shadowRoot.querySelectorAll(".pandora-consent-accept, .pandora-consent-accept-partial").forEach(btn => btn.style.color = pandoraAcceptColor);
        }
        if (pandoraAcceptBg) {
            this.shadowRoot.querySelectorAll(".pandora-consent-accept, .pandora-consent-accept-partial").forEach(btn => btn.style.backgroundColor = pandoraAcceptBg);
        }
        if (pandoraRefuseColor) {
            this.shadowRoot.querySelector(".pandora-consent-refuse").style.backgroundColor = pandoraRefuseColor;
        }
        if (pandoraRefuseBg) {
            this.shadowRoot.querySelector(".pandora-consent-refuse").style.backgroundColor = pandoraRefuseBg;
        }
    }    
}
window.customElements.define('pandora-consent', PandoraConsent);