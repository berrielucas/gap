let data;
function allowDropPhase(ev) {
    ev.preventDefault();
    ev.target.style.cursor = 'grabbing !important';
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
        tokenUser: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2N2MyMDRlY2QxMzdlZDZjZWZlNzUxOCIsImVtYWlsIjoibHVjYXNiZXJyaWVsQGVtYWlsLmNvbSIsImlhdCI6MTcxOTQxMDc2NiwiZXhwIjoxNzE5NDk3MTY2fQ.k67uBy-3fjeU30q81Mc-xwMqtLWCBv12MunOjiKYNBk"
      }),
    });
    if (response.ok) {
      document.getElementById(id).appendChild(document.getElementById(data));
    }
}