import styled, { useTheme } from "styled-components";
import { darken } from "polished";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { NAV_LIST } from "../constants";

const Navs = () => {
  const [isSelected, setIsSelected] = useState([true, false]);
  const theme = useTheme();
  const handleChangeBtnColor = (id) => {
    const newArr = [false, false];
    newArr[id] = true;
    setIsSelected(newArr);
  };

  return (
    <NavContainer>
      <Nav>
        <ul>
          {NAV_LIST.map((data) => (
            <li
              key={`nav-link-${data.id}`}
              onClick={() => handleChangeBtnColor(data.id)}
              style={
                isSelected[data.id]
                  ? { backgroundColor: theme.colors.primary }
                  : { backgroundColor: theme.colors.gray02 }
              }
            >
              <NavLink to={`${data.path}`} style={{ textDecoration: "none" }}>
                {data.text}
              </NavLink>
            </li>
          ))}
        </ul>
      </Nav>
    </NavContainer>
  );
};

const Nav = styled.nav`
  display: flex;

  ul {
    display: flex;
    align-items: flex-end;
    width: 100%;

    li {
      margin-right: 30px;
      text-align: center;
      width: 9%;
      border-radius: 25px 25px 0 0;
      padding-top: 20px;
      height: 45px;
      transition: all 0.2s ease-in-out;

      &:hover {
        background-color: ${({ theme }) => darken(0.1, theme.colors.primary)};
      }
    }

    a {
      font-size: ${({ theme }) => theme.fontSizes.lg};
      font-weight: 600;
      color: ${({ theme }) => theme.colors.white};
    }
  }

  @media screen and ${({ theme }) => theme.breakPoint} {
    ul {
      li {
        width: 6rem;
      }
      a {
        font-size: ${({ theme }) => theme.fontSizes.small};
        font-weight: 600;
      }
    }
  }
`;

const NavContainer = styled.div`
  width: 100%;
  padding-left: 70px;
`;

export default Navs;
