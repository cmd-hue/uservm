function firstTimeInit() {
    openModal('welcome-modal');
}

function firstTimeSetupLoadDefaults() {
    $('#welcome-setup-username').val('cmdhue-cvm' + (Math.floor(Math.random() * 8999) + 1000).toString());
    $('#welcome-setup-server-list').val(``);
}

function firstTimeSetupSaveSettings() {
    localStorage.setItem('username', $('#welcome-setup-username').val());
    localStorage.setItem('servers', JSON.stringify($('#welcome-setup-server-list').val().split('\n')));
    localStorage.setItem('chatSound', 'http://computernewb.com/collab-vm/notify.ogg')
    localStorage.setItem('showChatTime', JSON.stringify(true));
    localStorage.setItem('showChatTimeInUTC', JSON.stringify(true));
    localStorage.setItem('vmViewFit', JSON.stringify(false));
}
