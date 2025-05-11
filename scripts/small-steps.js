
fetch('/content/small-steps.json')
    .then(response => response.json())
    .then(steps => {
        const smallStepsList = document.getElementById('small-steps-list');
        steps.forEach(step => {
            const listItem = document.createElement('li');
            listItem.textContent = step;
            smallStepsList.appendChild(listItem);
        });
    })
