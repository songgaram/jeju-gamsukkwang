import styled from "styled-components";

const TourPage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  margin: 0 auto;
  padding: 60px 40px;
  overflow: hidden;
`;

const ContentBox = styled.div`
  margin-bottom: 40px;
  text-align: center;

  h1 {
    margin-bottom: 20px;
    font-size: 24px;
    font-weight: 600;
  }

  }
`;

const DropdownBox = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  margin-right: 10%;

  @media screen and ${({ theme }) => theme.breakPoint} {
    justify-content: center;
    margin-right: 0%;
  }
`;

const CardsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

export { TourPage, ContentBox, CardsContainer, DropdownBox };
