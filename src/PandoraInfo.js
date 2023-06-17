/**
 * @author Fabien Cador - fabiencador@gmail.com
 */

const pandoraInfoTpl = document.createElement('template');
pandoraInfoTpl.innerHTML = `
<style>
.pandora-info{width: fit-content; max-width: 50vw; max-height: 50vh; font-family: Roboto, sans-serif; border-radius: 10px;background-color: #f4f4f4;padding: 0}
.pandora-info > *:empty{display: none}
.pandora-info :is(.pandora-header, .pandora-content){padding: 10px 20px; font-size: 14px; text-align: justify;}
.pandora-info::backdrop{opacity: 0.5; background: grey}
.pandora-info .pandora-header{background-color: #0000ff;font-size: 22px; color: #f4f4f4;}
.pandora-info .btn-area {display: flex; justify-content: right;}
.pandora-info .btn-area .pandora-btn-validation {width: fit-content; padding: 10px 20px; margin: 10px 20px; border-radius: 50px; background-color: #0000ff; font-size: 12px; font-weight: bold; color: #f4f4f4; border: 1px transparent solid;}
.pandora-info .btn-area .pandora-btn-validation:hover{cursor: pointer; background-color: #f4f4f4; color: #0000ff; border: 1px #0000ff solid;}
</style>

<dialog class="pandora-info">
<div class="pandora-header">
<slot name="title" class="title"/>
</div>
<div class="pandora-content">
<slot name="message" class="message"/>
</div>
<div class="btn-area">
<div class="pandora-btn-validation">
<slot name="valid" class="valid"/>
</div>
</div>
</dialog>
`

class PandoraInfo extends HTMLElement{
    static get observedAttributes() {
        return ['pandora-backdrop-opacity', 'pandora-backdrop-color', 'pandora-title-color', 'pandora-title-bg', 'pandora-msg-color', 'pandora-msg-bg', 'pandora-valid-btn-color', 'pandora-valid-btn-bg'];
    }

    constructor() {
        super();
        this.attachShadow({mode: "open"} );
        this.shadowRoot.appendChild(pandoraInfoTpl.content.cloneNode(true));
        
        this.pandoraBox = this.shadowRoot.querySelector(".pandora-info");
        this.pandoraBackdrop = this.shadowRoot.querySelector("style");
        this.pandoraHeader =  this.shadowRoot.querySelector(".pandora-header");
        this.pandoraContent = this.shadowRoot.querySelector(".pandora-content");
        this.pandoraValid = this.shadowRoot.querySelector(".pandora-btn-validation");
        
        this.btnClickListener = () => this.openPandora();
        this.pandoraValid.addEventListener('click', () => this.pandoraBox.close());
    }

    connectedCallback() {
        document.querySelector('.pandora-i-open').addEventListener('click', this.btnClickListener);
    }

    attributeChangedCallback(name, oldValue, newValue) {
        switch(name) {
            case 'pandora-backdrop-opacity':
                this.pandoraBackdrop.innerHTML += `.pandora-info::backdrop{opacity:${newValue}}`;
                break;
            case 'pandora-backdrop-color':
                this.pandoraBackdrop.style.backgroundColor = newValue;
                break;
            case 'pandora-title-color':
                this.pandoraHeader.style.color = newValue;
                break;
            case 'pandora-title-bg':
                this.pandoraHeader.style.backgroundColor = newValue;
                break;
            case 'pandora-msg-color':
                this.pandoraContent.style.color = newValue;
                break;
            case 'pandora-msg-bg':
                this.pandoraContent.style.backgroundColor = newValue;
                break;
            case 'pandora-valid-btn-color':
                this.pandoraValid.style.color = newValue;
                break;
            case 'pandora-valid-btn-bg':
                this.pandoraValid.style.backgroundColor = newValue;
                break;
            default:
                console.warn(`Unhandeled attribute changed: ${name} from ${oldValue} to ${newValue}`);
        }
    }

    openPandora(){
        this.pandoraBox.showModal();
    }
    
    disconnectedCallback() {
        document.querySelector('.pandora-i-open').removeEventListener('click', this.btnClickListener);
    }
}

window.customElements.define('pandora-info', PandoraInfo);