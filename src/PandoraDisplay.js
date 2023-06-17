/**
 * @author Fabien Cador - fabiencador@gmail.com
 */

const pandoraDisplayTpl = document.createElement('template');
pandoraDisplayTpl.innerHTML = `
<style>
.pandora-display{position: relative; width: 95vw; height:95vh; overflow: hidden; font-family: Roboto, sans-serif; border-radius: 10px;background-color: transparent;padding: 0;border: 0}
/*.pandora-display > *:empty{display: none}*/
.pandora-display .pandora-header{padding: 10px 20px; font-size: 14px; text-align: justify;}
.pandora-display::backdrop{opacity: 0.5; background: grey}
.pandora-display .pandora-header{background-color: #ff0000;font-size: 22px; color: #f4f4f4;}
.pandora-display div{position: absolute; display: flex; justify-content: center; width: 24px; top: 5px; right: 20px; z-index: 10;background-color: #ff0000; border-radius: 10px; padding: 5px 10px;}
.pandora-display iframe{flex-grow: 1; margin: 0; padding: 0; }
</style>
<dialog class="pandora-display">
<div>
    <img class="pandora-btn-close" alt="close button" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMjAgNTEyIiBmaWxsPSIjZjRmNGY0Ij48IS0tISBGb250IEF3ZXNvbWUgUHJvIDYuMC4wLWJldGEyIGJ5IEBmb250YXdlc29tZSAtIGh0dHBzOi8vZm9udGF3ZXNvbWUuY29tIExpY2Vuc2UgLSBodHRwczovL2ZvbnRhd2Vzb21lLmNvbS9saWNlbnNlIChDb21tZXJjaWFsIExpY2Vuc2UpIC0tPjxwYXRoIGQ9Ik0zMTIuMSAzNzVjOS4zNjkgOS4zNjkgOS4zNjkgMjQuNTcgMCAzMy45NHMtMjQuNTcgOS4zNjktMzMuOTQgMEwxNjAgMjg5LjlsLTExOSAxMTljLTkuMzY5IDkuMzY5LTI0LjU3IDkuMzY5LTMzLjk0IDBzLTkuMzY5LTI0LjU3IDAtMzMuOTRMMTI2LjEgMjU2TDcuMDI3IDEzNi4xYy05LjM2OS05LjM2OS05LjM2OS0yNC41NyAwLTMzLjk0czI0LjU3LTkuMzY5IDMzLjk0IDBMMTYwIDIyMi4xbDExOS0xMTljOS4zNjktOS4zNjkgMjQuNTctOS4zNjkgMzMuOTQgMHM5LjM2OSAyNC41NyAwIDMzLjk0TDE5My45IDI1NkwzMTIuMSAzNzV6Ii8+PC9zdmc+" />
</div>
</dialog>
`

class PandoraDisplay extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: "open"});
        this.shadowRoot.appendChild(pandoraDisplayTpl.content.cloneNode(true));
    }

    openPandora() {
        let pandoraDisplay = this;
        let pandoraBox = this.shadowRoot.querySelector(".pandora-display");
        let pandoraBackdrop = this.shadowRoot.querySelector("style");
        let pandoraClose = this.shadowRoot.querySelector('div');

        // Suppression des précédents éléments
        let oldIframe = pandoraBox.querySelector('iframe');
        if (oldIframe) oldIframe.remove();
        let oldError = pandoraBox.querySelector('p');
        if (oldError) oldError.remove();

        let player = pandoraDisplay.getAttribute('pandora-player');
        let src = pandoraDisplay.getAttribute('pandora-src');
        let error = document.createElement('p');
        let iframe = document.createElement('iframe');

        if (!player || !src) {
            error.innerText = "Missing the attribute pandora-player or pandora-src into the pandora-display tag";
            pandoraBox.appendChild(error);
        } else if (player === "vimeo" || player === "yt") {
            iframe.setAttribute("src", player === "vimeo"
                ? `https://player.vimeo.com/video/${src}?h=a2cbf47a7c&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479`
                : `https://www.youtube.com/embed/${src}`);
            iframe.style.border = "0";
            pandoraBox.appendChild(iframe);
        } else {
            error.innerText = "Video player is not recognized";
            pandoraBox.appendChild(error);
        }

        if (pandoraDisplay.getAttribute("pandora-backdrop-opacity"))
            pandoraBackdrop.innerHTML += `.pandora-info::backdrop{opacity:${pandoraDisplay.getAttribute("pandora-backdrop-opacity")}}`;
        if (pandoraDisplay.getAttribute("pandora-backdrop-color"))
            pandoraBackdrop.style.backgroundColor = pandoraDisplay.getAttribute("pandora-backdrop-color");
        if (pandoraDisplay.getAttribute("pandora-closeBg-color"))
            pandoraClose.style.backgroundColor = pandoraDisplay.getAttribute("pandora-closeBg-color");

        this.shadowRoot.querySelector('.pandora-btn-close').addEventListener('click', this.closePandora.bind(this));
        pandoraBox.showModal();
        pandoraBox.style.display = "flex";
    }

    closePandora() {
        let pandoraBox = this.shadowRoot.querySelector(".pandora-display");
        pandoraBox.querySelector('iframe')?.remove();
        pandoraBox.style.display = "none";
        pandoraBox.close();
    }

    connectedCallback() {
        document.querySelector('.pandora-d-open').addEventListener('click', this.openPandora.bind(this));
    }

    disconnectedCallback() {
        document.querySelector('.pandora-d-open').removeEventListener('click', this.openPandora.bind(this));
    }
}

window.customElements.define('pandora-display', PandoraDisplay);