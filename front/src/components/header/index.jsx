import { useNavigate, NavLink } from "react-router-dom";
import { useRecoilState } from "recoil";
import { useState } from "react";
import { useMediaQuery } from "react-responsive";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
} from "styled-dropdown-component";

import Button from "components/button/Button";
import { NAV_LIST, MODAL_MESSAGE } from "./constants";
import { loginState } from "../../states";

import { Logo } from "assets/svgs/index";
import { HeaderContainer, HeaderWrapper, Nav } from "./header.style";
import theme from "../../styles/Theme";
import Modal from "components/modal";
import ModalPortal from "components/modal/modalPortal";

const Header = () => {
  const navigate = useNavigate();

  const [isLogin, setInLogin] = useRecoilState(loginState);
  const [hidden, setHidden] = useState(true);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const mediaQuery = useMediaQuery({ query: theme.breakPoint });

  const handleLogoutClick = () => {
    localStorage.removeItem("accessToken");
    window.location.replace("/");
    // navigate("/");
    setInLogin(false);
  };

  return (
    <>
      {!mediaQuery ? (
        <>
          <HeaderContainer>
            <HeaderWrapper>
              <Logo type="button" onClick={() => navigate("/")} />
              <Nav>
                <ul>
                  {NAV_LIST.map((data) => (
                    <li
                      key={`nav-link-${data.id}`}
                      onClick={() => {
                        if (data.id === "4" && !isLogin) {
                          setIsOpenModal(true);
                          navigate("/login");
                        }
                      }}
                    >
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
          <ModalPortal>
            {isOpenModal && (
              <Modal
                setIsOpenModal={setIsOpenModal}
                modalMessage={MODAL_MESSAGE}
              />
            )}
          </ModalPortal>
        </>
      ) : (
        <>
          <HeaderContainer>
            <HeaderWrapper>
              <Dropdown>
                <Button dropdownToggle onClick={() => setHidden(!hidden)}>
                  {hidden ? "메뉴 ▼" : "닫기 ▲"}
                </Button>
                <DropdownMenu hidden={hidden} toggle={() => setHidden(!hidden)}>
                  {NAV_LIST.map((data) => (
                    <DropdownItem
                      onClick={() => {
                        if (data.id === "4" && !isLogin) {
                          setIsOpenModal(true);
                          navigate("/login");
                        }
                      }}
                      key={`nav-link-${data.id}`}
                      style={{ margin: "15px 0" }}
                    >
                      <NavLink
                        to={`${data.path}`}
                        style={({ isActive }) => ({
                          textDecoration: isActive ? "underline" : "none",
                          textDecorationColor: isActive ? "#333" : "none",
                          textUnderlinePosition: isActive ? "under" : "none",
                          color: "#333",
                        })}
                      >
                        {data.text}
                      </NavLink>
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
              <Logo type="button" onClick={() => navigate("/")} />
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
            </HeaderWrapper>
          </HeaderContainer>
          <ModalPortal>
            {isOpenModal && (
              <Modal
                setIsOpenModal={setIsOpenModal}
                modalMessage={MODAL_MESSAGE}
              />
            )}
          </ModalPortal>
        </>
      )}
    </>
  );
};

export default Header;
