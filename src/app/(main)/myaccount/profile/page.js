
import { Container } from "@/shared";
import codeBlue from "@/assets/CodeBlue.svg";

import TabComponents from "./components/tab-component";
import Button from "@/components/shared/button";
import { EditIcon, UserUpArrowIcon } from "@/icons";
import Image from "next/image";

const BusinessProfile = () => {
  return (
    <section className="bg-gray-50 py-20">
      <Container>
        {/* tabs part start */}
        <div className="mt-8">
          <TabComponents />
        </div>
        {/* tabs part end */}
      </Container>
    </section>
  );
};

export default BusinessProfile;
