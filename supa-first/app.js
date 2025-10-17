import supabase from "./config.js";

let userName = document.getElementById("username")
let userContact = document.getElementById("usercontact")
let supaemail = document.getElementById("exampleInputEmail1")
let supapass = document.getElementById("exampleInputPassword1")
let regform = document.getElementById("regform")




// async function signup(e) {
//     e.preventDefault();

//     try {
//         if (!supaemail.value) {
//             return alert("Please enter email");
//         }
//         if (!supapass.value) {
//             return alert("Please enter password");
//         }

//         const { data, error } = await supabase.auth.signUp({
//             email: supaemail.value,
//             password: supapass.value,
//             options: {
//                 data: {
//                     name: userName.value,
//                     contact: userContact.value,
//                 },
//             },
//         });

//         if (data) {
//             console.log(data);
//             regform.reset(); // ✅ form clear
//             // location.href = 'home.html';
//         }

//         if (error) {
//             console.log(error);
//             alert(error.message);
//         }
//     } catch (err) {
//         console.log(err.message);
//     }
// }

// regform.addEventListener("submit", signup);


regform.addEventListener("submit", async (e) =>{
    e.preventDefault()
    try {

        if (!supaemail.value) {
            return alert("plz enter email")
        }
        if (!supapass.value) {
            return alert("plz enter pass")
        }

        const { data, error } = await supabase.auth.signUp({
            email: supaemail.value,
            password: supapass.value,
            options: {
                data: {
                    name: userName.value,
                    contact: userContact.value,
                }
            }
        })
        if (data) {
            console.log(data);
            regform.reset()
            //  location.href = 'home.html'
        }
        if (error) {
            console.log(error);

        }

    } catch (err) {
        console.log(err.message);

    }
})