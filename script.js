const USER = 'anonymousme7640';
const REPO = 'online-geyser';
const TOKEN = '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';

document.addEventListener(
    'DOMContentLoaded',
    function () {
        // select the correct radio button
        let geyser_state = readFromCloud('datastore/geyser_state');
        if (geyser_state == 'on') {
            document.getElementById('radio-on').checked = true;
        } else if (geyser_state == 'off') {
            document.getElementById('radio-off').checked = true;
        }


        // read and display the geyser's temperature
        let geyser_temperature = readFromCloud('datastore/geyser_temperature');
        document.getElementById('geyser-temperature').innerHTML = geyser_temperature;
    }
);

function readFromCloud(fileToRead) {
    xhr = new XMLHttpRequest();
    xhr.open(
        'GET',
        'https://api.github.com/repos/' + USER + '/' + REPO + '/contents/' + fileToRead + '?random=' + Math.random(),
        false
    );
    xhr.setRequestHeader("Authorization", "Basic " + btoa(USER + ':' + TOKEN));
    xhr.setRequestHeader('Accept', 'application/vnd.github.VERSION.raw');
    xhr.send();

    return xhr.response;
}

function geyserOn() {
    writeGeyserStateToCloud("on");
}

function geyserOff() {
    writeGeyserStateToCloud("off");
}

function writeGeyserStateToCloud(textToWrite) {
    let file = 'datastore/geyser_state'

    // get the sha of the file to modify
    xhr = new XMLHttpRequest();
    xhr.open(
        'GET',
        'https://api.github.com/repos/' + USER + '/' + REPO + '/contents/' + file,
        false
    );
    xhr.setRequestHeader("Authorization", "Basic " + btoa(USER + ':' + TOKEN));
    xhr.setRequestHeader('Accept', 'application/vnd.github.v3+json');
    xhr.send();
    let sha = JSON.parse(xhr.response).sha;


    // use the sha to update the file with specified contents
    xhr2 = new XMLHttpRequest();
    xhr2.open(
        'PUT',
        'https://api.github.com/repos/' + USER + '/' + REPO + '/contents/' + file,
    );
    xhr2.setRequestHeader("Authorization", "Basic " + btoa(USER + ':' + TOKEN));
    xhr2.setRequestHeader('Accept', 'application/vnd.github.v3+json');
    xhr2.send(
        JSON.stringify(
            {
                "message": "written by writeToCloud()",
                "content": btoa(textToWrite),
                "sha": sha
            }
        )
    );
}