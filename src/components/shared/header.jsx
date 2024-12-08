import HeaderInner from "@/components/shared/headerInner";
import {getServerToken} from "@/utils/getServerToken";

export const Header = async () => {
    const token = await getServerToken();

  return (
    <header>
        <HeaderInner hasToken={token} />
    </header>
  );
};
