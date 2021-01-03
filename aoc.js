import * as Editor from './editor.js';


let days = [];
for (let i = 1; i <= 25; i++) {
    days[i] = [
        { name: 'Part 1', source: `day${i}-1.js` },
        { name: 'Part 2', source: `day${i}-2.js` }
    ];
}
days[12].push({ name: 'Visualize Part 1', source: 'day12-v1.js' });
days[12].push({ name: 'Visualize Part 2', source: 'day12-v2.js' });
days[25].pop();


async function run() {
    let hash = location.hash.slice(1).split('-');
    let selected = hash[0] == 'editor' || (hash[0] > 0 && hash[0] < days.length) ? hash[0] : days.length - 1;
    let selectedExtra = selected != 'editor' && hash.length > 1 && hash[1] >= 0 && hash[1] < days[selected].length ? hash[1] : 0;
    
    // Add day links.
    let nav = document.getElementById('days');
    nav.innerHTML = '';
    for (let day = 1; day <= 25; day++) {
        nav.innerHTML += ' ';
        let link;
        if (day < days.length) {
            link = document.createElement('a');
            link.href = `#${day}`;
            if (day == selected) {
                link.className = 'selected';
            }
        }
        else {
            link = document.createElement('span');
            link.className = 'unavailable';
        }
        link.textContent = day;
        nav.appendChild(link);
    }
    
    // Add editor link.
    nav.innerHTML += '&nbsp;&nbsp;';
    let link = document.createElement('a');
    link.href = '#editor';
    if (selected == 'editor') {
        link.className = 'selected';
    }
    link.textContent = '+';
    nav.appendChild(link);
    
    // Add extra links.
    let extras = document.getElementById('extras');
    extras.innerHTML = '';
    if (selected != 'editor') {
        for (let [i, extra] of days[selected].entries()) {
            extras.innerHTML += extras.innerHTML == '' ? '' : '&nbsp;&nbsp;&nbsp;';
            let link = document.createElement('a');
            link.href = `#${selected}-${i}`;
            if (i == selectedExtra) {
                link.className = 'selected';
            }
            link.textContent = extra.name;
            extras.appendChild(link);
        }
    }
    
    // Open editor.
    if (selected == 'editor') {
        Editor.protect('', 'log(data);\n', 'Hello, World!');
        Editor.load('');
    }
    else {
        let data = (await (await fetch(`days/day${selected}.txt`)).text()).replaceAll('\r', '').trim();
        let source = (await (await fetch(`days/${days[selected][selectedExtra].source}`)).text()).replaceAll('\r', '');
        Editor.protect(`${selected}-${selectedExtra}`, source, data);
        Editor.load(`${selected}-${selectedExtra}`);
    }
}


run();
addEventListener('hashchange', run);
