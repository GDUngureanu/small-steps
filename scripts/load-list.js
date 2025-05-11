function loadList(divId, path) {
    fetch(path)
        .then(response => response.json())
        .then(item => {
            const list = document.getElementById(divId);
            
            item.forEach(step => {
                const listItem = document.createElement('li');
                listItem.textContent = step;
                list.appendChild(listItem);
            });
        })
        .catch(error => {
            console.error(`Error loading List from ${path}:`, error);
        });
}