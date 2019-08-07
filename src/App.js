import React, { useState } from "react";
import { connect } from "react-redux";
import UserInfo from "./UserInfo";
import { thunk_action_creator } from "./actions/fetchAction";

const App = props => {
  const [getUsername, setUser] = useState("");
  const handleSubmit = e => {
    e.preventDefault();
    const username = getUsername.value;
    props.dispatch(thunk_action_creator(username));
    getUsername.value = "";
  };
  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="form">
        <h2 className="title">Enter the Github Username</h2>
        <input
          type="text"
          placeholder="Enter Github Username"
          required
          ref={input => setUser(input)}
        />
        <button className="button">Submit</button>
      </form>
      {props.data.isFetching ? <h3>Loading...</h3> : null}
      {props.data.isError ? (
        <h3 className="error">No such User exists.</h3>
      ) : null}
      {Object.keys(props.data.userData).length > 0 ? (
        <UserInfo user={props.data.userData} />
      ) : null}
    </div>
  );
};
const mapStateToProps = state => {
  return {
    data: state
  };
};
export default connect(mapStateToProps)(App);
