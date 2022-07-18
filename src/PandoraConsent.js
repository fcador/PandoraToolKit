const template = document.createElement('template');
template.innerHTML = `
<style>
    
</style>

<dialog class="pandora-consent">
<div class="pandora-header">
<slot name="title"/>
</div>
<form class="pandora-form">
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
        let cookiesArray = JSON.decode(cookies);
        console.log(cookiesArray)
    }
}
window.customElements.define('pandora-consent', PandoraConsent);