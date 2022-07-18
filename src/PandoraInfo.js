/**
* @author Fabien Cador - fabiencador@gmail.com
*/

//TODO Deal with multiple modal handlers in one page

const pandoraInfoTpl = document.createElement('template');
pandoraInfoTpl.innerHTML = `
<style>
.pandora-info{width: fit-content; max-width: 50vw; max-height: 50vh; font-family: Roboto, sans-serif; border-radius: 10px;background-color: #f4f4f4;padding: 0}
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
    constructor() {
        super();
        this.attachShadow({mode: "open"} );
        this.shadowRoot.appendChild(pandoraInfoTpl.content.cloneNode(true));
    }

    openPandora(){
        let pandoraCustom = document.querySelector("pandora-info");
        let pandoraBox = this.shadowRoot.querySelector(".pandora-info");
        let pandoraBackdrop = this.shadowRoot.querySelector("style")
        let pandoraHeader =  this.shadowRoot.querySelector(".pandora-header");
        let pandoraContent = this.shadowRoot.querySelector(".pandora-content");
        let pandoraValid = this.shadowRoot.querySelector(".pandora-btn-validation");

        if (pandoraCustom.getAttribute("pandora-backdrop-opacity"))
            pandoraBackdrop.innerHTML += ".pandora-info::backdrop{opacity:"+pandoraCustom.getAttribute("pandora-backdrop-opacity")+"}";
        if (pandoraCustom.getAttribute("pandora-backdrop-color"))
            pandoraBackdrop.style.backgroundColor = pandoraCustom.getAttribute("pandora-backdrop-color");
        if (pandoraCustom.getAttribute("pandora-color-title"))
            pandoraHeader.style.color = pandoraCustom.getAttribute("pandora-color-title");
        if (pandoraCustom.getAttribute("pandora-bg-title"))
            pandoraHeader.style.backgroundColor = pandoraCustom.getAttribute("pandora-bg-title");
        if (pandoraCustom.getAttribute("pandora-msg-color"))
            pandoraContent.style.color = pandoraCustom.getAttribute("pandora-msg-color");
        if (pandoraCustom.getAttribute("pandora-msg-bg"))
            pandoraContent.style.backgroundColor = pandoraCustom.getAttribute("pandora-msg-bg");
        if (pandoraCustom.getAttribute("pandora-valid-btn-color"))
            pandoraValid.style.color = pandoraCustom.getAttribute("pandora-valid-btn-color");
        if (pandoraCustom.getAttribute("pandora-valid-btn-bg"))
            pandoraValid.style.backgroundColor = pandoraCustom.getAttribute("pandora-valid-btn-bg");

        pandoraBox.showModal();

        this.shadowRoot.querySelector('.pandora-btn-validation').addEventListener('click', ()=>{
            pandoraBox.close();
        })
    }

    connectedCallback() {
        document.querySelector('.pandora-i-open').addEventListener('click', ()=>{
            this.openPandora();
        })
    }
}
window.customElements.define('pandora-info', PandoraInfo);