async function editMemo(event) {
  const id = event.target.dataset.id;
  const editInput = prompt("수정할 값을 입력하세요");
  const res = await fetch(`/memos/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: id,
      content: editInput,
    }),
  });
  readMemo();
}

async function deleteMemo(event) {
  const id = event.target.dataset.id;
  const res = await fetch(`/memos/${id}`, {
    method: "DELETE",
  });
  readMemo();
}

function displayMemons(memo) {
  const ul = document.querySelector("#memo-ul");
  const li = document.createElement("li");
  const editBtn = document.createElement("button");
  li.innerText = `${memo.content}`;

  editBtn.innerText = "수정하기";
  editBtn.addEventListener("click", editMemo);
  editBtn.dataset.id = memo.id;
  const delBtn = document.createElement("button");
  delBtn.innerText = "삭제";
  delBtn.addEventListener("click", deleteMemo);
  delBtn.dataset.id = memo.id;
  ul.appendChild(li);
  ul.appendChild(delBtn);
  ul.appendChild(editBtn);
}

async function readMemo() {
  const res = await fetch("/memos");
  const jnsonRes = await res.json();
  //jsonRes=[{id:123,content:'블라블라}]
  const ul = document.querySelector("#memo-ul");
  ul.innerHTML = "";
  jnsonRes.forEach(displayMemons);
}
readMemo();

async function createMemo(value) {
  const res = await fetch("/memos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: new Date().getTime().toString(),
      content: value,
    }),
  });
  readMemo();
}

function handleSubmit(event) {
  event.preventDefault();
  const input = document.querySelector("#memo-input");
  createMemo(input.value);
  input.value = "";
}

const form = document.querySelector("#memo-form");
form.addEventListener("submit", handleSubmit);

readMemo();
