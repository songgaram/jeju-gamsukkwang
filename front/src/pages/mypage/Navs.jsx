import styled from "styled-components";

const Navs = () => {
  return (
    <NavContainer>
      <Nav type="button">My Map</Nav>
      <Nav type="button">My Stamp</Nav>
    </NavContainer>
  );
};

const Nav = styled.div`
  width: 7rem;
  background-color: ${({ theme }) => theme.colors.orange};
  border-radius: 30px 30px 0 0;
  height: 50px;
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: bold;
  text-align: center;
  margin-right: 1%;
  padding-top: 20px;
  cursor: pointer;
`;

const NavContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  padding-left: 70px;
`;

export default Navs;
