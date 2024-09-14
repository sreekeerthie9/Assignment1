async function fetchData(){
    const datacontainer = document.getElementById('data-container');

    try{
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        const data = await response.json();
        if(!response.ok){
            console.log("failed");
        }
        const ul = document.createElement('ul');
        data.forEach(post =>{
            const li = document.createElement('li');
            const h3 = document.createElement('h3');
            const p = document.createElement('p');

            console.log(post)
            h3.textContent = post.title;
            p.textContent = post.body;

            li.appendChild(h3);
            li.appendChild(p);
            ul.appendChild(li);
        });
        
        datacontainer.appendChild(ul);;

    } catch(error){
        datacontainer.innerHTML='<p>Failed to fetch data</p>';
    }
}

async function fetchsingledata(event){
    event.preventDefault();

    const datacontainer = document.getElementById('single-post');
    const uid = document.getElementById('uid').value;
    if(!datacontainer){
        datacontainer.classList.add('hidden');
    }
    try{
       
        if(uid==""){
            throw new Error("Please enter the ID");
        }
        const response = await fetch('https://jsonplaceholder.typicode.com/posts/'+uid);
        const data = await response.json();
        if(uid!="" && !response.ok){
            throw new Error("No data found for the given ID");
        }
        if (!data || !data.id) {
            throw new Error("No data found for the given ID");
        }

        const h3 = document.createElement('h3');
        const p = document.createElement('p');

        h3.textContent = "Title: "+data.title;
        p.textContent = data.body;

        datacontainer.innerHTML="";
        datacontainer.appendChild(h3);
        datacontainer.appendChild(p);


    } catch(error){
        datacontainer.innerHTML='<p>'+error+'</p>';
    }
    datacontainer.classList.remove('hidden');
}
document.addEventListener('DOMContentLoaded',() => {
    document.getElementById('user-form').addEventListener('submit',fetchsingledata);
});
