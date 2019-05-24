// eslint-disable-next-line no-undef
fin.InterApplicationBus.subscribe({ uuid: '*' }, 'new-window', sub_msg =>
	console.log('TOPIC new-window published a new message: ', sub_msg)
).catch(err => console.log(err));

// eslint-disable-next-line no-undef
fin.InterApplicationBus.subscribe({ uuid: '*' }, 'newWindow', sub_msg =>
	console.log('TOPIC newWindow published a new message: ', sub_msg)
).catch(err => console.log(err));
