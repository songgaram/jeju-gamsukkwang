import styled from "styled-components";

const HeaderContainer = styled.div`
  width: 100%;
  height: 70px;
  background: ${({ theme }) => theme.colors.white};

  svg {
    cursor: pointer;
  }
`;

const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  padding: 0 30px;
  margin: 0 auto;
  box-shadow: 0px 4px 5px rgba(0, 0, 0, 6%);
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;

  ul {
    display: flex;

    li {
      margin-right: 30px;
      text-align: center;

      a {
        font-size: 14px;
        font-weight: 400;
        color: ${({ theme }) => theme.colors.black};
        white-space: nowrap;
      }
    }
  }
`;

export { HeaderContainer, HeaderWrapper, Nav };
