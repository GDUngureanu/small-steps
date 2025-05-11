function loadSnippet(divId, path) {
    fetch(path)
        .then(response => response.text())
        .then(html => {
            document.getElementById(divId).innerHTML = html;
        })
}