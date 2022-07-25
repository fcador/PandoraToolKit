const template = document.createElement('template');
template.innerHTML = `
<style>
.pandora-consent{width: fit-content; max-width: 50vw; max-height: 50vh; font-family: Roboto, sans-serif; border-radius: 10px;background-color: #f4f4f4;padding: 0}
.pandora-consent :is(.pandora-header, .pandora-form){padding: 10px 20px; font-size: 14px; text-align: justify;}
.pandora-consent .pandora-form{display: flex; flex-direction: column; justify-content: center; align-items: center;}
.pandora-consent .pandora-form div{width:100% ;display: flex;justify-content: space-between; align-items: center;}
.pandora-consent::backdrop{opacity: 0.5; background: grey}
.pandora-consent .pandora-header{background-color: #008000;font-size: 22px; color: #f4f4f4;}
.pandora-consent .btn-area {display: flex; justify-content: right;}
.pandora-consent .btn-area :is(.pandora-consent-accept, .pandora-consent-accept-some, .pandora-consent-refuse) {width: fit-content; padding: 10px 20px; margin: 10px 20px; border-radius: 50px; background-color: #008000; font-size: 12px; font-weight: bold; color: #f4f4f4; border: 1px transparent solid;}
.pandora-consent .btn-area .pandora-consent-refuse {width: fit-content; padding: 10px 20px; margin: 10px 20px; border-radius: 50px; background-color: #f4f4f4; font-size: 12px; font-weight: bold; color: #008000; border: 1px transparent solid;}
.pandora-consent .btn-area :is(.pandora-consent-accept:hover, .pandora-consent-accept-some:hover, .pandora-consent-refuse:hover){cursor: pointer; background-color: #f4f4f4; color: #008000; border: 1px #008000 solid;}
.pandora-consent .btn-area .pandora-consent-refuse:hover{cursor: pointer; background-color: #f4f4f4; color: #008000; border: 1px #008000 solid;}
</style>

<dialog class="pandora-consent">
<div class="pandora-header">
<slot name="title"/>
</div>
<form class="pandora-form" method="post">
</form>
<div class="btn-area"></div>
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
            cookieAccept.innerHTML = accept;
        }else{
            cookieAccept.setAttribute('value', 'Accept');
            cookieAccept.innerHTML = 'Accept';
        }
        if(some) {
            cookieAcceptSome.setAttribute('value', some);
            cookieAcceptSome.innerHTML = some;
        }else{
            cookieAcceptSome.setAttribute('value', 'Accept Selected');
            cookieAcceptSome.innerHTML = 'Accept Selected';
        }
        if (refuse){
            cookieRefuse.setAttribute('value', refuse);
            cookieRefuse.innerHTML = refuse;
        }else{
            cookieRefuse.setAttribute('value', 'Refuse');
            cookieRefuse.innerHTML = 'Refuse';
        }


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
        this.shadowRoot.querySelector('.btn-area').appendChild(cookieRefuse);
        this.shadowRoot.querySelector('.btn-area').appendChild(cookieAcceptSome);
        this.shadowRoot.querySelector('.btn-area').appendChild(cookieAccept);
    }

    createCheckboxes(pCookies) {
        let i= 1;
        pCookies.forEach( (cookie) => {
            i++;
            let div = document.createElement('div');
            div.setAttribute('class', 'pandora-checkbox-container'+i);
            this.shadowRoot.querySelector('.pandora-form').appendChild(div);
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
            let cookieLabel = document.createElement('label');
            cookieLabel.setAttribute('for', inputName);
            cookieLabel.innerHTML = inputValue;
            this.shadowRoot.querySelector('.pandora-checkbox-container'+i).appendChild(cookieLabel);
            this.shadowRoot.querySelector('.pandora-checkbox-container'+i).appendChild(cookieInput);
        })
    }
}
window.customElements.define('pandora-consent', PandoraConsent);