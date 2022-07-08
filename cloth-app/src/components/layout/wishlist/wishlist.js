const Wishlist = (props) => {
  const style = {
    backgroundColor: "white",
    border: "none",
    fontSize: "larger",
    fontWeight: "bold",
  };
  return (
    <div>
      <button style={style} onClick={props.onShow}>
        <span style={{ color: "#881C59" }}>&#10084;</span>
      </button>
    </div>
  );
};

export default Wishlist;
