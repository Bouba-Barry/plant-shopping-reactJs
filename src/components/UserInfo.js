import { useState } from "react";
import "../styles/userInfo.css";
import useInsertUser from "../hooks/user/useInsertUser";
import { useGetUser } from "../hooks/user/useGetUserAuth";
import { toast } from "react-toastify";

const UserInfo = ({ handleUserIsLogged, setToken }) => {
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [adress, setAdress] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const [isSubscribe, setIsSubscribe] = useState(false);

  const { insertUserMutation } = useInsertUser();
  const { authUserMutation } = useGetUser();
  const handleRegister = () => setIsSubscribe(!isSubscribe);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubscribe) {
      const user = {
        email: email,
        password: password,
        name: userName,
        phone: phone,
        adress: adress,
      };

      if (
        user.email.length < 3 ||
        user.password < 4 ||
        user.name < 4 ||
        user.adress < 4
      ) {
        toast.info("All fields are required ! ");
      }
      insertUserMutation.mutateAsync(user);
      setEmail("");
      setPassword("");
      toast.success("Successfuly saved");
      handleRegister();
    } else {
      // const generateToken = email + Math.random() * 100;*

      await authUserMutation.mutateAsync(
        { email: email, password: password },
        {
          onSuccess: (data) => {
            console.log(data);
            setToken(data.user._id);
            console.log("tokenUserLogged : ", data.user._id);
            toast.success("Your session has started");
            handleUserIsLogged();
            toast.info("Now save your order !");
          },
          onError: () => {
            toast.error("Check your credentials");
          },
        }
      );
    }
  };

  return (
    <>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-25">
              <label>email</label>
            </div>
            <div className="col-75">
              <input
                type="email"
                id="fname"
                name="email"
                placeholder="Your mail.."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-25">
              <label>password</label>
            </div>
            <div className="col-75">
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {isSubscribe && (
            <>
              <div className="row">
                <div className="col-25">
                  <label>Name</label>
                </div>
                <div className="col-75">
                  <input
                    type="text"
                    id="lname"
                    name="name"
                    placeholder="Your last name.."
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-25">
                  <label>Deliver Adresse</label>
                </div>
                <div className="col-75">
                  <input
                    type="text"
                    id="adresse"
                    name="adresse"
                    value={adress}
                    onChange={(e) => setAdress(e.target.value)}
                    placeholder="Your deliver Adresse.."
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-25">
                  <label>Phone</label>
                </div>
                <div className="col-75">
                  <input
                    type="phone"
                    id="phone"
                    name="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+21264444444"
                  />
                </div>
              </div>
            </>
          )}
          <div className="row" style={{ margin: "10px" }}>
            {isSubscribe
              ? "Already have Account ? Login"
              : "Don't have account ? register"}
            <button type="button" onClick={handleRegister}>
              here
            </button>
          </div>
          <div className="row">
            <input type="submit" value="Save" />
          </div>
        </form>
      </div>
    </>
  );
};
export default UserInfo;
