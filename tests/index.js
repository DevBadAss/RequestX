// Importing RequestX
import RequestX from "../requestx.js";

//Instancing RequestX
const requestX = new RequestX({
    url: "http://localhost:4000/api/",
    response_type: "json"
});


const file = document.querySelector(".file");

// file.onchange = () => {
//     requestX.uploadFile({
//         file: file.files[0],
//         file_name: "TEST.jpg",
//         upload_directory: "../../"
//     }, (res) => {
//         console.log(res);
//     });
// }

// GET Request
// requestX.pull((res) => {
//     console.log(res)
// });

// POST Request
requestX.push({ action: "drop_table", dbName: "../../Test.db", table: "Testing" }, (res) => {
    console.log(res);
})

// Error Callback
// requestX.error((res) => {
//     console.log(res)
// });

// Error Callback
// requestX.error((res) => {
//     console.log(res)
// });