import HeaderInner from "@/components/shared/headerInner";
import {getSSUserData} from "@/utils/getSSUserData";

export const Header = async () => {
    const {token, user} = await getSSUserData();

  return (
    <header>
        <HeaderInner hasToken={token} userInfo={user} />
    </header>
  );
};
