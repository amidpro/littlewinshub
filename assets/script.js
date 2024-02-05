// Function to toggle navigation menu
const nav = document.getElementById('nav');
const toggleButton = document.getElementById('toggle-nav');

toggleButton.addEventListener('click', () => {
  nav.classList.toggle('active');
});

// Function for habits page
document.addEventListener('DOMContentLoaded', function() {
    const goalInput = document.getElementById('goalInput');
    const addGoalBtn = document.getElementById('addGoalBtn');
    const goalList = document.getElementById('goalList');

    // Array to store goals
    let goals = [];

    // Function to render goals
    function renderGoals() {
        goalList.innerHTML = '';
        goals.forEach((goal, index) => {
            const goalItem = document.createElement('div');
            goalItem.classList.add('goal-item');
            goalItem.innerHTML = `
                <input type="checkbox" id="goal${index}" ${goal.completed ? 'checked' : ''}>
                <label for="goal${index}" ${goal.completed ? 'style="text-decoration: line-through;"' : ''}>${goal.text}</label>
                <button class="edit-btn">Edit</button>
            `;
            goalList.appendChild(goalItem);

            // Add event listener for checkbox
            const checkbox = goalItem.querySelector(`#goal${index}`);
            checkbox.addEventListener('change', () => {
                goals[index].completed = checkbox.checked;
                renderGoals();
            });

            // Add event listener for edit button
            const editBtn = goalItem.querySelector('.edit-btn');
            editBtn.addEventListener('click', () => {
                const newText = prompt('Enter new goal:', goal.text);
                if (newText !== null && newText.trim() !== '') {
                    goals[index].text = newText.trim();
                    renderGoals();
                }
            });
        });
    }

    // Function to handle adding new goal
    function addGoal() {
        const text = goalInput.value.trim();
        if (text === '') return;
        if (goals.length >= 5) {
            alert('You\'re more likely to complete your goals for today if you keep it minimal. Please complete one of your other tasks before adding another.');
            return;
        }
        goals.push({ text, completed: false });
        goalInput.value = '';
        renderGoals();
    }

    // Event listener for add goal button
    addGoalBtn.addEventListener('click', addGoal);

    // Event listener for enter key
    goalInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            addGoal();
        }
    });
});
