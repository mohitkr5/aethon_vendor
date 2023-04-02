const PasswordReset = () => {
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          src="https://firebasestorage.googleapis.com/v0/b/aethon-9e3d3.appspot.com/o/Aethon%20Logo%2002%20Black%20-%20short.png?alt=media&token=b9a7a773-bf9d-4247-ab3f-8faa4fc90f2b"
          width="250"
        />
        <h2
          style={{
            paddingLeft: "40px",
            paddingRight: "40px",
            borderLeft: "1px solid black",
          }}
        >
          Password Reset
        </h2>
      </div>
      <h3 style={{ textAlign: "center", marginTop: "20px" }}>
        A password reset email has been sent.
      </h3>
    </>
  );
};

export default PasswordReset;
