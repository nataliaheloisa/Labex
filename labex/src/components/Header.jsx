import { useNavigate } from "react-router-dom";
const Header = () => {
  const navigate = useNavigate();

  const changePage = (value) => {
    navigate(value);
  };

  const redirectPage = (value) => {};

  return (
      <div onClick={() => redirectPage("natalia-amaral")}>
      <h1 onClick={() => changePage("/profile")}> Home</h1>
    </div>
  );
};

export default Header