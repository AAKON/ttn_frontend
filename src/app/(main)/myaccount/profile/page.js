
import { Container } from "@/shared";
import TabComponents from "./components/tab-component";

import { getProfile } from "@/services/auth/auth";

const BusinessProfile = () => {

  return (
    <section className="bg-gray-50 py-20">
      <Container>
        
        <div className="mt-8">
          <TabComponents />
        </div>
        {/* tabs part end */}
      </Container>
    </section>
  );
};

export default BusinessProfile;
