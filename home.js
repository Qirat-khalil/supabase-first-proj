import supabase from "./config.js";


// fetch data
let username = document.getElementById("username")

async function fetchdata() {
    try {
        const { data, error } = await supabase.auth.getUser()
        console.log(data);

        if (data) {
            username.innerHTML = data.user.user_metadata.name

        }
        if (error) {
            console.log(error);

        }
    } catch (error) {
        console.log(error);

    }

}
fetchdata()


// inser data


let title = document.getElementById("title")
let desc = document.getElementById("description")
let radio = document.getElementsByName("prio")
let addbtn = document.getElementById("addbtn")





async function addtodo() {
    let selectprio;
    console.log(title.value);
    console.log(desc.value);
    for (let p of radio) {
        if (p.checked) {
            selectprio = p.value
            console.log(selectprio);
        }

    }

    try{
              const { error } = await supabase
      .from('todos')
      .insert(
        { title:title, description:desc, }

      )

        if(error){
            console.log(error);

        }
    }catch(error){
        console.log(error);
        
    }



}

addbtn.addEventListener("click", addtodo

  
)