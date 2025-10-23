// import supabase from "./config.js";


// // fetch data
// let username = document.getElementById("username")

// async function fetchdata() {
//     try {
//         const { data, error } = await supabase.auth.getUser()
//         console.log(data);

//         if (data) {
//             username.innerHTML = data.user.user_metadata.name

//         }
//         if (error) {
//             console.log(error);

//         }
//     } catch (error) {
//         console.log(error);

//     }

// }
// fetchdata()


// // inser data


// let title = document.getElementById("title")
// let desc = document.getElementById("description")
// let radio = document.getElementsByName("prio")
// let addbtn = document.getElementById("addbtn")
// let main = document.getElementById("main")




// async function addtodo() {
//     let selectprio;
//     console.log(title.value);
//     console.log(desc.value);
//     for (let p of radio) {
//         if (p.checked) {
//             selectprio = p.value
//             console.log(selectprio);
//         }

//     }

//     try {
//         const { error } = await supabase
//             .from('todos')
//             .insert(
//                 { title: title.value, description: desc.value, priority:selectprio  }

//             )

//         if (error) {
//             console.log(error);

//         }else{
//             console.log("add sucessfully");
//             title.value=""
//             selectprio.value=""
//             radio.forEach((r)=>  r.checked == false)
//             AllTodos()
//         }
//     } catch (error) {
//         console.log(error);

//     }



// }

// addbtn.addEventListener("click", addtodo)


// async function AllTodos(){
//     try{
//         const { data, error } = await supabase
//   .from('todos')
//   .select("*")
//   if(error){
//     console.log(error);
    
//   }else{
//     // console.log(data);
//     showAllTodos(data)
//   }
  
  
//     }catch(err){
//         console.log(err);
        
//     }
// }
// AllTodos()


//  function showAllTodos(todo){
//     main.innerHTML =""
//      todo.forEach((task)=>{
//         main.innerHTML += `
//           <div class="card p-5">
//         <h1 class="">${task.title}</h1>
//         <p>${task.description}</p>
//         <p class="card-text"><strong>Priority:</strong> ${todo.priority}</p
//         <button></button>
//         <button></button>

//     </div>
//         `
//      })
//  }




import supabase from "./config.js";

// ------------------ Fetch user data ------------------
let username = document.getElementById("username");

async function fetchdata() {
  try {
    const { data, error } = await supabase.auth.getUser();
    console.log(data);

    if (data && data.user) {
      username.innerHTML = data.user.user_metadata.name;
    }

    if (error) {
      console.log(error);
    }
  } catch (error) {
    console.log(error);
  }
}

fetchdata();


// ------------------ Insert (Add Todo) ------------------
let title = document.getElementById("title");
let desc = document.getElementById("description");
let radio = document.getElementsByName("prio");
let addbtn = document.getElementById("addbtn");
let main = document.getElementById("main");

async function addtodo() {
  let selectprio = null;

  // get selected priority
  for (let p of radio) {
    if (p.checked) {
      selectprio = p.value;
      break;
    }
  }

  // check required fields
  if (!title.value.trim() && !desc.value.trim() && !selectprio) {
    alert("Please fill all fields before adding a todo!");
    return;
  }

  try {
    const { error } = await supabase
      .from("todos")
      .insert([
        {
          title: title.value,
          description: desc.value,
          priority: selectprio,
        },
      ]);

    if (error) {
      console.log("Insert Error:", error);
    } else {
      console.log("✅ Todo added successfully!");
      // clear inputs after adding
      title.value = "";
      desc.value = "";
      radio.forEach((r) => (r.checked = false));
      // reload todos
      AllTodos();
    }
  } catch (error) {
    console.log("Catch Error:", error);
  }
}

addbtn.addEventListener("click", addtodo);


// ------------------ Fetch Todos ------------------
async function AllTodos() {
  try {
    const { data, error } = await supabase.from("todos").select("*");

    if (error) {
      console.log("Fetch Error:", error);
      return;
    }

    if (data) {
      showAllTodos(data);
    }
  } catch (err) {
    console.log(err);
  }
}

AllTodos();


// ------------------ Display Todos ------------------
function showAllTodos(todos) {
  main.innerHTML = "";

  todos.forEach((todo) => {
    const card = document.createElement("div")
    card.classList.add("card","p-5")
    card.innerHTML += `
      <div class="card-body" style="width: 18rem;">
        <div class="card-body">
          <h5 class="card-title">${todo.title}</h5>
          <p class="card-text">${todo.description}</p>
          <p class="card-text"><strong>Priority:</strong> ${todo.priority}</p>
          <button ><i class="fa-solid fa-pen-to-square"></i></button>
          <button class="delbtn" ><i class="fa-solid fa-trash"></i></button>
        </div>
      </div>
    `;
    let delbtn = card.querySelector(".delbtn")
    delbtn.addEventListener("click" ,()=>delfunc(todo.id))
    main.appendChild(card)
  })
}

async function delfunc(id){
   try{
     const {data,error} = await supabase
  .from('todos')
  .delete()
  .eq("id", id)
  if (error) {
    console.log(error);
    
  }else{
    AllTodos()
  }

   }catch(err){
    console.log(err);
    
   }
}



// delbtn.addEventListener("click",delfunc)