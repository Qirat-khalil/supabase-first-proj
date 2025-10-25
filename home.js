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

  if (edId) {
    console.log("Edit ID mil gaya:", edId);

    try {


      const { error } = await supabase
        .from('todos')
        .update({
          title: title.value,
          description: desc.value,
          priority: selectprio,
        })
        .eq('id', edId)
      if (error) {
        console.log(error);

      } else {
        console.log("etitttt");
        AllTodos()
        title.value = ""
        description.value = ""
        radio.forEach((r) => r.checked = false)
      }
    } catch (err) {
      console.log(err);

    }
  }
  else {
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
        title.value = "";
        desc.value = "";
        radio.forEach((r) => (r.checked = false));
        AllTodos();
      }
    } catch (error) {
      console.log("Catch Error:", error);
    }

  }



}

addbtn.addEventListener("click", addtodo);


// ------------------ Fetch Todos ------------------
let filtodo = []

async function AllTodos() {
  try {
    const { data, error } = await supabase
      .from("todos")
      .select("*");

    if (error) {
      console.log("Fetch Error:", error);
      return;
    }

    if (data) {
      filtodo = data
      showAllTodos(filtodo);

    }
  } catch (err) {
    console.log(err);
  }
}

AllTodos();


// ------------------ Display Todos ------------------
function showAllTodos(todos) {
  const main = document.getElementById("main");
  main.innerHTML = "";

  todos.forEach((todo) => {
    const card = document.createElement("div");

    let badgeColor = "";
    let borderGlow = "";
    if (todo.priority === "high") {
      badgeColor = "bg-red-100 text-red-700 border border-red-300";
      borderGlow = "hover:border-red-400 hover:shadow-red-200";
    } else if (todo.priority === "medium") {
      badgeColor = "bg-yellow-100 text-yellow-700 border border-yellow-300";
      borderGlow = "hover:border-yellow-400 hover:shadow-yellow-200";
    } else {
      badgeColor = "bg-green-100 text-green-700 border border-green-300";
      borderGlow = "hover:border-green-400 hover:shadow-green-200";
    }

    card.innerHTML = `

      <div class="bg-gradient-to-br from-white to-indigo-50 ${borderGlow} shadow-md hover:shadow-xl transition-all duration-300 rounded-2xl p-6 border transform hover:-translate-y-1 hover:scale-[1.02]">
        <div class="flex justify-between items-start mb-2">
          <h5 class="text-lg font-semibold text-gray-800">${todo.title}</h5>
          <span class="text-xs px-3 py-1 rounded-full font-medium ${badgeColor} capitalize">
            ${todo.priority}
          </span>
        </div>
        <p class="text-gray-600 text-sm leading-relaxed mb-4">${todo.description}</p>
        <div class="flex justify-end gap-3 mt-3">
          <button  class="editbtn  text-indigo-500 hover:text-indigo-700 transition-all">
            <i class="fa-solid fa-pen-to-square text-lg"></i>
          </button>
          <button class="delbtn text-red-500 hover:text-red-700  transition-all">
            <i class="fa-solid fa-trash text-lg"></i>
          </button>
        </div>
      </div>
    `;

    const delbtn = card.querySelector(".delbtn");
    delbtn.addEventListener("click", () => delfunc(todo.id));

    main.appendChild(card);

    let editbtn = card.querySelector(".editbtn")
    editbtn.addEventListener("click", () => editfun(todo.id, todo.title, todo.description, todo.priority))

  });
}


// delete fun

async function delfunc(id) {
  try {
    const { data, error } = await supabase
      .from('todos')
      .delete()
      .eq("id", id)
    if (error) {
      console.log(error);

    } else {
      AllTodos()
    }

  } catch (err) {
    console.log(err);

  }
}


// search input


let searinp = document.getElementById("serinp")
let searchbtn = document.getElementById("searchbtn")

// console.log(searchbtn ,"searchbtn");


function searchfunc() {
  let keyword = searinp.value.trim().toLowerCase();

  if (!keyword) {

    showAllTodos(filtodo)
    return;
  }


  // filter todos where priority 
  let filter = filtodo.filter((task) =>
    task.priority.toLowerCase().includes(keyword) 
  // ||
  //   task.title.toLowerCase().includes(keyword)
  );

  // show filtered results on same page
  showAllTodos(filter);

  // (optional) agar next page par bhejna hai:
  // localStorage.setItem("fildata", JSON.stringify(filter));
  // location.href = "high.html";
}


searchbtn.addEventListener("click", searchfunc)


// edit function


let edId = null
// let editingCard = null
function editfun(id, tit, descrip, prio) {

  // console.log(tit);
  title.value = tit
  description.value = descrip
  console.log(prio);
  radio.forEach((onepri) => {
    onepri.checked = onepri.value === prio
  })
  edId = id
  addbtn.innerHTML = "Edit Task"
  // if(editingCard){
  //   editingCard.style.dis
  // }
}


