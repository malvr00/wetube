import axios from "axios";
const addCommentForm = document.getElementById("jsAddComment");
const commentList = document.getElementById("jsCommentList");
const commentNumber = document.getElementById("jsCommentNumber");

//실시간 댓글수 변경
const increaseNumber = () => {
  commentNumber.innerHTML = parseInt(commentNumber.innerHTML, 10) + 1;
}
//실시간인것 처럼 페이크
const addComment = (comment) => {
  const li = document.createElement("li");
  const span = document.createElement("span");
  span.innerHTML = comment;
  li.appendChild(span);
  commentList.prepend(li) // prepend 객체를 앞에 추가., append 뒤에 추가. (댓글)
  increaseNumber();
}
const sendComment = async (comment) => {
    const videoId = window.location.href.split("/videos/")[1];
    const response = await axios({
        url:`/api/${videoId}/comment`,
        method:"POST",
        data:{
            comment
        }
    });
    if(response.status === 200){
      addComment(comment);
    }
};

const handleSubmit = (event) => {
  event.preventDefault(); // event 막기.
  const commentInput = addCommentForm.querySelector("input");
  const comment = commentInput.value;
  sendComment(comment);
  commentInput.value = "";
};

function init() {
  addCommentForm.addEventListener("submit", handleSubmit);
}

if (addCommentForm) {
  init();
}
