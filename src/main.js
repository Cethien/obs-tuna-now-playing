'use strict';

var app = document.getElementById('app');
var artists = document.getElementById('artists');
var title = document.getElementById('title');

import * as fetcher from './dataFetcher.js';

async function setData(data) {
	artists.innerText = data.artists.join(', ');
	title.innerText = data.title;
}

async function update() {
	var data = await fetcher.getData();
	var appVisibility = data.status === 'playing' ? 'visible' : 'hidden';
	if (data.status === 'playing') {
		await setData(data);
	}
	app.style.visibility = appVisibility;
}

export async function run() {
	try {
		var isServerOnline = await fetcher.isTunaServerReachable();
		if (isServerOnline) {
			// update every 1 second
			setInterval(update, 1000);
		} else {
			console.log(
				"Tuna Server couldn't be reached. Is the Tuna Server running on http://localhost:1608?"
			);
		}
	} catch (error) {
		console.error(error);
	}
}
