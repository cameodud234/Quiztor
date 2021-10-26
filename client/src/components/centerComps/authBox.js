// import React from "react";
// import Container from "@material-ui/core/Container";
// import AlertMassage from "./AlertMassage";

// const AuthPage = ({ history, prop }) => {
//   const [status, setStatusBase] = React.useState("");

//   const submitLoginForm = async () => {
//     setStatusBase({ msg: "Success", key: Math.random() });
//   };

//   return (
//     <Container component="main" maxWidth="xs">
//       <h1>Hello SnackBar</h1>
//       <button onClick={prop.showMsg}>Submit</button>
//       {status ? <AlertMassage key={status.key} message={status.msg} /> : null}
//     </Container>
//   );
// };

// export default AuthPage;