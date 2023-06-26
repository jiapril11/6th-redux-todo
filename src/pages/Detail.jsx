import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import shortid from "shortid";

const Detail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const todos = useSelector((state) => state.todos);
  const reviews = useSelector((state) => state.reviews);

  const todo = todos.filter((todo) => todo.id === id)[0];

  const [reviewer, setReviewer] = useState("");
  const [review, setReview] = useState("");

  const dispatch = useDispatch();

  const handleSubmitReview = (e) => {
    e.preventDefault();
    let today = new Date();

    dispatch({
      type: "ADD_REVIEW",
      payload: {
        id: shortid.generate(),
        todoId: id,
        reviewer: reviewer,
        content: review,
        submitDate: today.toLocaleString(),
      },
    });

    setReviewer("");
    setReview("");
  };

  const handleDeleteReview = (id) => {
    dispatch({
      type: "DELETE_REVIEW",
      payload: id,
    });
  };
  return (
    <div>
      <div>
        {todo.id}
        <br />
        {todo.title}
        <br />
        {todo.body}
        <br />
        {todo.isDone.toString()}
        <br />
        <button onClick={() => navigate("/")}>이전 화면으로</button>
      </div>
      <hr />
      <div>
        <p>댓글</p>
        <form onSubmit={handleSubmitReview}>
          <div style={{ display: "flex" }}>
            <div>
              <label htmlFor="reviewerInput">작성자</label>
              <input
                type="text"
                id="reviewerInput"
                value={reviewer}
                onChange={(e) => setReviewer(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="reviewInput">내용</label>
              <input
                type="text"
                id="reviewInput"
                value={review}
                onChange={(e) => setReview(e.target.value)}
              />
            </div>
            <button>댓글등록</button>
          </div>
        </form>
        {reviews
          .filter((review) => review.todoId === id)
          .map((review) => (
            <div
              key={review.id}
              style={{ border: "1px solid #777", padding: "10px", margin: 10 }}
            >
              <span>todoId: {review.todoId} | </span>
              <br />
              <span>id: {review.id} | </span>
              <br />
              <span>작성자: {review.reviewer} | </span>
              <br />
              <span>내용: {review.content}</span>
              <br />
              <span>작성날짜: {review.submitDate}</span>
              <br />
              <button onClick={() => handleDeleteReview(review.id)}>
                삭제
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Detail;
