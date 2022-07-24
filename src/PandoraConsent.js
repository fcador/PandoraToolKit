const template = document.createElement('template');
template.innerHTML = `
<style>
    
</style>

<dialog class="pandora-consent">
<div class="pandora-header">
<slot name="title"/>
</div>
<form class="pandora-form" method="post">
</form>
</dialog>
`

class PandoraConsent extends HTMLElement{
    constructor() {
        super();
        this.attachShadow({mode: "open"});
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {
        let pandoraConsent = this.shadowRoot.querySelector(".pandora-consent");
        pandoraConsent.showModal();
        let cookies = document.querySelector("pandora-consent").getAttribute('pandora-cookie');
        let cookiesArray = cookies.split(",");
        let accept = document.querySelector("pandora-consent").getAttribute('pandora-accept');
        let some = document.querySelector("pandora-consent").getAttribute('pandora-some');
        let refuse = document.querySelector("pandora-consent").getAttribute('pandora-refuse');

        this.createCheckboxes(cookiesArray);

        let cookieAccept = document.createElement('button');
        let cookieAcceptSome = document.createElement('button');
        let cookieRefuse = document.createElement('button');
        cookieAccept.setAttribute('type', 'submit');
        cookieAccept.setAttribute('class', 'pandora-consent-accept');
        cookieAcceptSome.setAttribute('type', 'submit');
        cookieAcceptSome.setAttribute('class', 'pandora-consent-accept-some');
        cookieRefuse.setAttribute('type', 'submit');
        cookieRefuse.setAttribute('class', 'pandora-consent-refuse');

        if (accept){
            cookieAccept.setAttribute('value', accept);
        }else{
            cookieAccept.setAttribute('value', 'Accept');
        }
        if(some) {
            cookieAcceptSome.setAttribute('value', some);
        }else{
            cookieAcceptSome.setAttribute('value', 'Accept Selected');
        }
        if (refuse){
            cookieRefuse.setAttribute('value', refuse);
        }else{
            cookieRefuse.setAttribute('value', 'Refuse');
        }

        this.shadowRoot.querySelector('.pandora-form').appendChild(cookieRefuse);
        this.shadowRoot.querySelector('.pandora-form').appendChild(cookieAcceptSome);
        this.shadowRoot.querySelector('.pandora-form').appendChild(cookieAccept);

        cookieAccept.addEventListener('click', (e) => {
            e.preventDefault();
            cookiesArray.forEach( (cookie) => {
                let inputName = cookie.split(":")[0].toLowerCase();
                document.cookie = inputName + "=true;path=/";
            } )
            pandoraConsent.close();
        });

        cookieAcceptSome.addEventListener('click', (e) => {
            e.preventDefault();
            cookiesArray.forEach( (cookie) => {
                let inputName = cookie.split(":")[0].toLowerCase();
                if (this.shadowRoot.querySelector('#' + inputName).checked){
                    document.cookie = inputName + "=true;path=/";
                }
            } )
            pandoraConsent.close();
        });

        cookieRefuse.addEventListener('click', (e) => {
            e.preventDefault();
            pandoraConsent.close();
        });
    }

    createCheckboxes(pCookies) {
        pCookies.forEach( (cookie) => {
            let inputName = cookie.split(":")[0].toLowerCase();
            let inputValue = cookie.split(":")[1];
            console.log(inputValue);
            let cookieInput = document.createElement('input');
            cookieInput.setAttribute('type', 'checkbox');
            cookieInput.setAttribute('name', inputName);
            cookieInput.setAttribute('id', inputName);
            cookieInput.setAttribute('value', inputValue);
            cookieInput.setAttribute('checked', 'checked');
            cookieInput.setAttribute('class', 'pandora-consent-checkbox');
            this.shadowRoot.querySelector('.pandora-form').appendChild(cookieInput);
            let cookieLabel = document.createElement('label');
            cookieLabel.setAttribute('for', inputName);
            cookieLabel.innerHTML = inputValue;
            this.shadowRoot.querySelector('.pandora-form').appendChild(cookieLabel);
        })
    }
}
window.customElements.define('pandora-consent', PandoraConsent);