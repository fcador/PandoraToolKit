/**
 * @author Fabien Cador - fabiencador@gmail.com
 */

const pandoraDisplayTpl = document.createElement('template');
pandoraDisplayTpl.innerHTML = `
<dialog class="pandora-display">
<div class="pandora-header">
<slot name="title" class="title"/>
<div class="close">X</div>
</div>
<iframe></iframe>
</dialog>
`

class PandoraDisplay extends HTMLElement{
    constructor() {
        super();
        this.attachShadow({mode: "open"} );
        this.shadowRoot.appendChild(pandoraDisplayTpl.content.cloneNode(true));
    }

    openPandora() {
        let pandoraDisplay = document.querySelector("pandora-display");
        let pandoraBox = this.shadowRoot.querySelector(".pandora-display");
        let pandoraBackdrop = this.shadowRoot.querySelector("style");
        let pandoraHeader =  this.shadowRoot.querySelector(".pandora-header");
    }
}