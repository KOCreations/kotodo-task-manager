function addItem() {
    const inputField = document.getElementById('itemInput');
    const itemList = document.getElementById('itemList');
    const itemValue = inputField.value.trim();

    if (itemValue !== "") {
        const newItem = document.createElement('li');
        
        // Put the text in a span so we can strike it out separately
        const textSpan = document.createElement('span');
        textSpan.textContent = itemValue;
        newItem.appendChild(textSpan);
        
        // Create a Delete button
        const delBtn = document.createElement('button');
        delBtn.textContent = "X";
        delBtn.classList.add('delete-btn');
        
        // Create an Edit button
        const editBtn = document.createElement('button');
        editBtn.textContent = "Edit";
        editBtn.classList.add('edit-btn');
        
        // Logic to Delete
        delBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevents the strike-throuh from triggering
            newItem.remove();
            localStorage.setItem("savedList", itemList.innerHTML);
        });
       
        // Logic to Strike-through (now on the whole li)
        newItem.addEventListener('click', function() {
            newItem.classList.toggle('checked');
            localStorage.setItem("savedList", itemList.innerHTML);

        });
        
        // Logic to edit list item
        editBtn.addEventListener('click', (event) => {
            event.stopPropagation();
            if (! newItem.classList.contains('checked')) {
                const updatedText = prompt("Edit your task:", textSpan.textContent);

                if (updatedText !== null && updatedText.trim() !== "") {
                textSpan.textContent = updatedText.trim();
                localStorage.setItem("savedList", itemList.innerHTML);
                
                }
            }
        }); 
        
        newItem.appendChild(editBtn);
        newItem.appendChild(delBtn);
        itemList.appendChild(newItem);
        
        // This clears the input field back to blank once the new item has been 
        // entered. This prevents double entering a task
        inputField.value = "";
        
        // Save the whole list to the browser's memory
        localStorage.setItem("savedList", itemList.innerHTML);
    }
}    

const input = document.getElementById('itemInput');
const button = document.getElementById('addItem');

input.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        button.click();
    }
});

const clearBtn = document.getElementById('clearAllBtn');

clearBtn.addEventListener('click', () => {
    // 1. Ask for confirmation (optional but safer!)
    if (confirm("Are you sure you want to delete the whole list?")) {
        // 2. Clear the visual list in the HTML
        const itemList = document.getElementById('itemList');
        itemList.innerHTML = "";

        // 3. Wipe the browser's memory for this list
        localStorage.removeItem("savedList");
    }
});

// This runs automatically when the page is opened
window.addEventListener("DOMContentLoaded", () => {
    const saved = localStorage.getItem("savedList");
    const itemList = document.getElementById('itemList');
    
    if (saved && itemList) {
        // 1. Restore the HTML from memory
        itemList.innerHTML = saved;

        // 2. Re-attach the click listeners (they don't save with the HTML!)
        Array.from(itemList.children).forEach(li => {
            // Re-attach Strike-through
            li.addEventListener('click', () => {
                li.classList.toggle('checked');
                localStorage.setItem("savedList", itemList.innerHTML);
            });

            // Re-attach Delete logic
            const delBtn = li.querySelector('.delete-btn');
            if (delBtn) {
                delBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    li.remove();
                    localStorage.setItem("savedList", itemList.innerHTML);
                });
            }

            // Re-attach Edit logic
            const editBtn = li.querySelector('.edit-btn');
            
            if (editBtn) {
                editBtn.addEventListener('click', (event) => {
                    event.stopPropagation();
                    const textSpan = li.querySelector("span");

                    if (!li.classList.contains('checked')) {
                        const updatedText = prompt("Edit your task:", 
                        textSpan.textContent);

                        if (updatedText !== null && updatedText.trim() !== "") {
                            textSpan.textContent = updatedText.trim();
                            localStorage.setItem("savedList", 
                            itemList.innerHTML);
                            
                        }
                    };
                });
            }   
        });
    }
});
