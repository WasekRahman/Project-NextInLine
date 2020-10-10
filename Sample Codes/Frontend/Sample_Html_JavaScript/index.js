// api url 
const api_url = 
	"https://5f3c884e6c11f80016d6f152.mockapi.io/api/blogs/"; 

// Defining async function 
async function getapi(url) { 
	
	// Storing response 
	const response = await fetch(url); 
	
	// Storing data in form of JSON 
	var data = await response.json(); 
	console.log(data); 
	if (response) { 
		hideloader(); 
	} 
	show(data); 
} 
// Calling that async function 
getapi(api_url); 

// Function to hide the loader 
function hideloader() { 
	document.getElementById('loading').style.display = 'none'; 
} 
// Function to define innerHTML for HTML table 
function show(data) { 
	let tab = 
		`<tr> 
		<th>ID</th> 
		<th>Created at</th> 
		<th>Name</th> 
		</tr>`; 
	
	// Loop to access all rows 
		for(let item of data){
			tab += `<tr> 
	<td>${item.id} </td> 
	<td>${item.createdAt}</td> 
	<td>${item.name}</td>
</tr>`; 	
}
	// Setting innerHTML as tab variable 
	document.getElementById("employees").innerHTML = tab; 
} 
