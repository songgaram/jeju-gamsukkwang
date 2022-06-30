import { useNavigate, NavLink } from "react-router-dom";
import { useRecoilState } from "recoil";

import Button from "components/Button";
import { NAV_LIST } from "./constants";
import { loginState } from "../../states";

import { Logo } from "assets/svgs/index";
import { HeaderContainer, HeaderWrapper, Nav } from "./header.style";

const Header = () => {
  const navigate = useNavigate();
  const [isLogin, setInLogin] = useRecoilState(loginState);

  const handleLogoutClick = () => {
    localStorage.removeItem("accessToken");
    navigate("/");
    setInLogin(false);
  };

  return (
    <HeaderContainer>
      <HeaderWrapper>
        <Logo type="button" onClick={() => navigate("/")} />
        <Nav>
          <ul>
            {NAV_LIST.map((data) => (
              <li key={`nav-link-${data.id}`}>
                <NavLink
                  to={`${data.path}`}
                  style={({ isActive }) => ({
                    textDecoration: isActive ? "underline" : "none",
                    textDecorationColor: isActive ? "#333" : "none",
                    textUnderlinePosition: isActive ? "under" : "none",
                  })}
                >
                  {data.text}
                </NavLink>
              </li>
            ))}
          </ul>
          {!isLogin && (
            <Button type="button" onClick={() => navigate("/login")}>
              로그인
            </Button>
          )}
          {isLogin && (
            <Button type="button" onClick={handleLogoutClick}>
              로그아웃
            </Button>
          )}
        </Nav>
      </HeaderWrapper>
    </HeaderContainer>
  );
};

export default Header;
