async function newFormHandler(event) {
    // had to remove this prevent in order for uploads to work
    // event.preventDefault(); 

    const product_name = document.querySelector('input[name="product_name"]').value;
    const price = document.querySelector('input[name="price"]').value;
    const description = document.querySelector('input[name="description"]').value;
    const img_path = document.querySelector('input[name="photoUpload"]').value;
    // let img_file
    const img_file = img_path.split(`\\`)[2]

    // MAY need to add this for deployment to heroku

    // if(PORT = 3001){
    // img_file = img_path.split(`\\`)[2];
    // }
    // // may need to change for heroku
    // else{
    // img_file = img_path.split(`\\`)[2];
    // 

    const response = await fetch(`/api/posts`, {
        method: 'POST',
        body: JSON.stringify({
            product_name,
            description,
            img_file,
            price
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
}


document.querySelector('.new-post-form').addEventListener('submit', newFormHandler);