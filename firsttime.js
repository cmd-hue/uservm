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
vms.befacivm.us.to/1
vms.befacivm.us.to/2
vms.befacivm.us.to/3
userfriendly.aolonline.top/ufvm1
computernewb.com/~lily/fgvm2/
cvm.madz.mov/vm1
cvm.madz.mov/vm2
cvm.madz.mov/vm3
enderman0125.collabvm.org/
vm1.hddnetworks.xyz
vm2.hddnetworks.xyz
vm3.hddnetworks.xyz
guh.alwaysdata.net/collab-vm/astralvm1
guh.alwaysdata.net/collab-vm/astralvm2
enixnet.com/collab-vm/vm1
enixnet.com/collab-vm/vm2
vm1.skycore.website
vm3.skycore.website
bobikowice.pl/cvm
bobikowice.pl/cvm2
vps1vm8.shijimanet.com/vm13
vps1vm8.shijimanet.com/vm14
vps1vm8.shijimanet.com/vm15
vps1vm8.shijimanet.com/vm12
vps1vm8.shijimanet.com/vm16
vps1vm8.shijimanet.com/vm17
vps1vm8.shijimanet.com/vm18
vps1vm8.shijimanet.com/vm19
vps1vm8.shijimanet.com/vm20`);
}

function firstTimeSetupSaveSettings() {
    localStorage.setItem('username', $('#welcome-setup-username').val());
    localStorage.setItem('servers', JSON.stringify($('#welcome-setup-server-list').val().split('\n')));
    localStorage.setItem('chatSound', 'https://file.garden/aUYIWVAKvQxCBY-_/sfx/Click.mp3')
    localStorage.setItem('showChatTime', JSON.stringify(true));
    localStorage.setItem('showChatTimeInUTC', JSON.stringify(true));
    localStorage.setItem('vmViewFit', JSON.stringify(false));
}
