function firstTimeInit() {
    openModal('welcome-modal');
}

function firstTimeSetupLoadDefaults() {
    $('#welcome-setup-username').val('cvm-hue-user' + (Math.floor(Math.random() * 8999) + 1000).toString());
    $('#welcome-setup-server-list').val(`vps1.shijimanet.com
vps1vm8.shijimanet.com
vms.shijimanet.com/vm0
vms.shijimanet.com/vm1
vms.shijimanet.com/vm2
vms.shijimanet.com/vm3
vms.shijimanet.com/vm4
vms.shijimanet.com/vm5
vms.shijimanet.com/vm6
vms.shijimanet.com/vm7
vms.shijimanet.com/vm8
vps1vm8.shijimanet.com/vm9
vps1vm8.shijimanet.com/vm10
`);
}

function firstTimeSetupSaveSettings() {
    localStorage.setItem('username', $('#welcome-setup-username').val());
    localStorage.setItem('servers', JSON.stringify($('#welcome-setup-server-list').val().split('\n')));
    localStorage.setItem('chatSound', 'https://file.garden/aUYIWVAKvQxCBY-_/sfx/Click.mp3')
    localStorage.setItem('showChatTime', JSON.stringify(true));
    localStorage.setItem('showChatTimeInUTC', JSON.stringify(true));
    localStorage.setItem('vmViewFit', JSON.stringify(false));
}
