let data;
function allowDropPhase(ev) {
    ev.preventDefault();
}

function dragTask(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
    ev.dataTransfer.setData("url_base", ev.target.attributes.data_url_base.value);
}
async function dropPhase(ev, id) {
    ev.preventDefault();
    data = ev.dataTransfer.getData("text");
    url_base = ev.dataTransfer.getData("url_base");
    let response = await fetch(`${url_base}/Task/updatePhaseTask`, {
      method: "PUT",
      mode: "cors",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      body: JSON.stringify({
        taskId: data,
        dataTask: {
          phase_id: id
        },
        tokenUser: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2N2MyMDRlY2QxMzdlZDZjZWZlNzUxOCIsImVtYWlsIjoibHVjYXNiZXJyaWVsQGVtYWlsLmNvbSIsImlhdCI6MTcxOTU3NjM0NSwiZXhwIjoxNzE5NjYyNzQ1fQ.-ZgEnnYGe20vIpxT6J6m5W6AqxvnIOCxgi0lNjTnpdw"
      }),
    });
    if (response.ok) {
      document.getElementById(id).querySelector("section").appendChild(document.getElementById(data));
      document.querySelectorAll(".model").forEach(element => {
        element.style.display = 'none';
      });
    }
}

let enterId = null;
let leaveId = null;
function enter(ev, id){
  enterId = id;
  document.getElementById(id).querySelector(".model").style.display = 'flex';
  if (id!==leaveId&&leaveId!==null) {
    document.getElementById(leaveId).querySelector(".model").style.display = 'none';
  }
}
function leave(ev, id){
  leaveId = id;
  if (ev.target.id===id&&enterId!==id) {
    document.getElementById(id).querySelector(".model").style.display = 'none';
  }
}