document.getElementById("dataInput").addEventListener("click", function(event) {
  event.preventDefault();
  var node= document.getElementById("party");
while (node.firstChild) {
    node.removeChild(node.firstChild);
}
var mynode= document.getElementById("Expenditures");
while (mynode.firstChild) {
    mynode.removeChild(mynode.firstChild);
}
var othernode= document.getElementById("contributions");
while (othernode.firstChild) {
    othernode.removeChild(othernode.firstChild);
}
  const value = document.getElementById("data").value;
  const url = "https://api.open.fec.gov/v1/names/candidates/?api_key=Ba6Fy5ahHoAysAwGpfWdZt0eTTnybeJVBeT9ROyt&q=" + value;
  fetch (url)
  .then(function(response){
    return response.json();
  }).then(function(json) {
    console.log(json);
    let result =""
    for (let i =0; i<json.results.length; i++){
      
    result += json.results[i].name + " sought for the office of ";
    if(json.results[i].office_sought === 'P'){
      result += "President";
    } else if(json.results[i].office_sought === 'S'){
      result += "Senator";
    }else if(json.results[i].office_sought === 'H'){
      result += "the House of Representatives";
    } else{
      result+= "These reults should not be trusted"
    }
    result += " and their ID number is " + json.results[i].id + " ";
    result +="<br>";
    result +="<br>";
    partyFunction(json.results[i].id);
    ExpendituresFunction(json.results[i].id);
    ContributionsFunction(json.results[i].id);
    }
    document.getElementById("searchedFor").innerHTML = result;
  });
const partyFunction = function(id){
   let url2 = "https://api.open.fec.gov/v1/candidate/" + id + "/history/?election_full=true&api_key=Ba6Fy5ahHoAysAwGpfWdZt0eTTnybeJVBeT9ROyt&per_page=20&sort_hide_null=false&sort_nulls_last=false&sort_null_only=false&page=1&sort=-two_year_period"
    fetch(url2)
    .then(function(response){
      return response.json();
    }).then(function(json){
      console.log("parties", json);
      let result = "";
      let temp = "";
      for (let i=0; i<json.results[0].rounded_election_years.length; i++){
        temp += json.results[0].rounded_election_years[i];
        if(i!= json.results[0].rounded_election_years.length-1){
          temp+= ",";
        }
      }
      result += json.results[0].name + " ran ";
      result += "for the " + json.results[0].party_full + " party in " + temp;
      append = document.createTextNode(result);
      document.getElementById("party").appendChild(append);
      document.getElementById("party").appendChild(document.createElement("br"));
      document.getElementById("party").appendChild(document.createElement("br"));
    })
}

});

const ExpendituresFunction = function(id){
  console.log(id);
  let url3 = "https://api.open.fec.gov/v1/schedules/schedule_e/by_candidate/?api_key=Ba6Fy5ahHoAysAwGpfWdZt0eTTnybeJVBeT9ROyt&candidate_id="+id+"&per_page=20&sort_hide_null=false&sort_null_only=false&page=1&election_full=true&sort_nulls_last=false";
  fetch(url3)
  .then(function(response) {
    return response.json();
  }).then(function(json) {
    let result = "";
    console.log("we are in url2",json);
    result+= json.results[0].candidate_name + " ";
    total =0;
    for (let i=0; i < json.results.length; i++){
    total += json.results[i].total;
    }
    result += total + " in " + json.results[0].cycle;
    append = document.createTextNode(result);
    document.getElementById("Expenditures").appendChild(append);
    document.getElementById("Expenditures").appendChild(document.createElement("br"));
    document.getElementById("Expenditures").appendChild(document.createElement("br"));
  })
  
}

const ContributionsFunction = function(id){
  console.log(id);
  let url4 = "https://api.open.fec.gov/v1/schedules/schedule_a/by_state/by_candidate/totals/?api_key=Ba6Fy5ahHoAysAwGpfWdZt0eTTnybeJVBeT9ROyt&per_page=20&sort_hide_null=false&candidate_id=" + id+ "&sort_null_only=false&page=1&cycle=2020&election_full=true&sort_nulls_last=false";
  fetch(url4)
  .then(function(response) {
    return response.json();
  }).then(function(json) {
    console.log("we are here",json);
    let result = "";
    total =0;
    for (let i=0; i < json.results.length; i++){
    total += json.results[i].total;
    }
    result += "Id number:  " + json.results[0].candidate_id + " received " + total + " in " + json.results[0].cycle;
    append = document.createTextNode(result);
    document.getElementById("contributions").appendChild(append);
    document.getElementById("contributions").appendChild(document.createElement("br"));
    document.getElementById("contributions").appendChild(document.createElement("br"));
  })
  
}

