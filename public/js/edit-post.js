async function editFormHandler(event) {
    event.preventDefault();

    const product_name = document.querySelector('input[name="product_name"]').value;
    const description = document.querySelector('input[name="description"]').value;
    const id = window.location.toString().split('/')[
        window.location.toString.split('/').length - 1
    ];

    const response = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            product_name,
            description
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }
};

document.querySelector('.edit-post-form').addEventListener('submit', editFormHandler);