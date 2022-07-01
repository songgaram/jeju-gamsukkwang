import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { NAV_LIST } from "./constants";

const Navs = () => {
  return (
    <NavContainer>
      <Nav>
        <ul>
          {NAV_LIST.map((data) => (
            <li key={`nav-link-${data.id}`}>
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

    li {
      margin-right: 30px;
      text-align: center;
      width: 7rem;
      background-color: ${({ theme }) => theme.colors.orange};
      border-radius: 25px 25px 0 0;
      height: 50px;
      padding-top: 20px;

      a {
        font-size: ${({ theme }) => theme.fontSizes.lg};
        font-weight: 600;
        color: ${({ theme }) => theme.colors.white};
      }
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
