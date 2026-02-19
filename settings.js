function resetAllSettings() {
    localStorage.clear();
    window.location.reload();
}

function dontResetAllSettings() {
    closeCurrentModal(() => destroyModal('reset-warning-modal'));
}

function resetConfirmation() {
    let modal = makeSimpleModal('reset-warning-modal', 'Reset Confirmation', 'You are about to reset <b>ALL</b> settings of CollabVM++. Are you sure you want to do this? This CANNOT be undone.', [
        {
            classes: 'btn-red', html: 'Yes', click: () => resetAllSettings()
        },
        {
            classes: '', html: 'No', click: () => dontResetAllSettings()
        }
    ], false);
    openModal('reset-warning-modal');
}

function loadSettingsToUI() {
    $('#settings-username').val(localStorage.getItem('username'));
    $('#settings-servers').val(JSON.parse(localStorage.getItem('servers')).join('\n'));
    $('#settings-chat-sound').val(localStorage.getItem('chatSound'));
    $('#settings-chat-time').prop('checked', JSON.parse(localStorage.getItem('showChatTime')));
    $('#settings-chat-time-utc').prop('checked', JSON.parse(localStorage.getItem('showChatTimeInUTC')));
    $('#settings-esheep').prop('checked', JSON.parse(localStorage.getItem('showEsheep')));
    $('#settings-sidelink').prop('checked', JSON.parse(localStorage.getItem('showSidelink')));
    $('#settings-vm-view-fit').prop('checked', JSON.parse(localStorage.getItem('vmViewFit')));
}

function saveSettingsFromUI() {
    localStorage.setItem('username', $('#settings-username').val());
    localStorage.setItem('servers', JSON.stringify($('#settings-servers').val().split('\n')));
    localStorage.setItem('chatSound', $('#settings-chat-sound').val());
    localStorage.setItem('showChatTime', JSON.stringify($('#settings-chat-time').prop('checked')));
    localStorage.setItem('showChatTimeInUTC', JSON.stringify($('#settings-chat-time-utc').prop('checked')));
    localStorage.setItem('vmViewFit', JSON.stringify($('#settings-vm-view-fit').prop('checked')));
    localStorage.setItem('showEsheep', JSON.stringify($('#settings-esheep').prop('checked')));
    localStorage.setItem('showSidelink', JSON.stringify($('#settings-sidelink').prop('checked')));
    
    if ($('#settings-vm-view-fit').prop('checked')) $('canvas').css('max-width', '97vw');
    else $('canvas').css('max-width', 'auto');

    if (currentConn) currentConn.sendGuac(['rename', $('#settings-username').val()]); // rename if we are connected
}

function applySettings() {
    if (JSON.parse(localStorage.getItem('vmViewFit'))) $('canvas').css('max-width', '97vw');
}