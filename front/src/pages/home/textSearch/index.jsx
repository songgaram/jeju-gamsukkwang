import Input from "components/input";
import { InputBox } from "./textSearch.style";

const TextSearch = () => {
  return (
    <InputBox>
      <Input type="text" name="search" placeholder="검색어를 입력해주세요." />
      <span type="button">🔍</span>
    </InputBox>
  );
};

export default TextSearch;
