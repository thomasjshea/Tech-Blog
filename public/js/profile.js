const newPostHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#post-title').value.trim();
    const content = document.querySelector('#post-content').value.trim();

    if (title && content) {
        const response = await fetch('/api/posts', {
            method: 'POST',
            body: JSON.stringify({ title, content }),
            headers: { 'Content-Type': 'application/json'},
        });

        if (response.ok) {
            document.location.replace('/profile');
        } else {
            alert('Failed to create Post');
        }
    }
};

const editButtonHandler = async (event) => {
    document.location.replace('/editpost');
};

const deleteButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id');

        const response = await fetch(`/api/posts/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            document.location.replace('/profile');
        } else {
            alert('Failed to delete Post');
        }
    }
};

document.querySelector('.new-post-form').addEventListener('submit', newPostHandler)
document.querySelector('.edit-btn').addEventListener('click', editButtonHandler);
document.querySelector('.delete-btn').addEventListener('click', deleteButtonHandler);