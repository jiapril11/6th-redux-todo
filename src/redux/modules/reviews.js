import shortid from "shortid";

const initialState = [
  {
    id: shortid.generate(),
    todoId: "todoIdTest",
    reviewer: "작성자",
    content: "화이팅",
  },
  {
    id: shortid.generate(),
    todoId: "todoIdTest2",
    reviewer: "작성자2",
    content: "화이팅2",
  },
];

const reviews = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_REVIEW":
      return [...state, action.payload];

    case "DELETE_REVIEW":
      return state.filter((review) => review.id !== action.payload);

    default:
      return state;
  }
};

export default reviews;
