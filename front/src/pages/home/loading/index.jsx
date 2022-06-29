import ModalPortal from "components/modal/modalPortal";
import { LogoIcon } from "assets/svgs";

import { ModalBackground, ModalBox, LogoBox } from "./loading.style";

const Loading = () => {
  return (
    <ModalPortal>
      <ModalBackground>
        <ModalBox>
          <LogoBox>
            <LogoIcon width={80} />
          </LogoBox>
          <span>감귤이가 장소를 찾고 있어요 :)</span>
        </ModalBox>
      </ModalBackground>
    </ModalPortal>
  );
};

export default Loading;
