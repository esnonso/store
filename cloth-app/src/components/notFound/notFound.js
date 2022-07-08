const PageNotFound = () => {
  const outerDiv = {
    height: "90vh",
    marginTop: "10rem",
    padding: "2rem",
  };

  return (
    <div style={outerDiv}>
      <h3>Error: Page not Found</h3>
      <p>The page You requested was not Found.</p>
    </div>
  );
};

export default PageNotFound;
