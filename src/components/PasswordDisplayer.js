import { useState } from "react";
import { AiFillEye } from "react-icons/ai";
import { AiFillEyeInvisible } from "react-icons/ai";

const PasswordDisplayer = (props) => {
  const [showingPassword, setShowingPassword] = useState(false);

  return (
    <div className={`row ${props.isValid ? "valid" : "invalid"}`}>
      <label htmlFor={props.name}>Password</label>
      <input
        type={showingPassword ? "text" : "password"}
        id={props.name}
        value={props.value}
        onChange={props.valueHandler}
      />
      <span className="passwordIcon" onClick={() => setShowingPassword(!showingPassword)}>
        {showingPassword && <AiFillEye />}
        {!showingPassword && <AiFillEyeInvisible />}
      </span>
    </div>
  );
};


export default PasswordDisplayer;