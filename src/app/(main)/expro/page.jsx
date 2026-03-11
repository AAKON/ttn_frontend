import { Container } from "@/shared";
import ExproHeroSearch from "./components/expro-hero-search";

const ExproPage = () => {
  return (
    <section className="bg-[#FCFCFD] py-12 md:py-20 lg:py-24">
      <Container>
        <ExproHeroSearch />
      </Container>
    </section>
  );
};

export default ExproPage;
