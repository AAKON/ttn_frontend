import { Container } from "@/shared";
import ExproHeroSearch from "./components/expro-hero-search";
import ExproCategoryStrip from "./components/expro-category-strip";

const ExproPage = () => {
  return (
    <section className="bg-500 py-8 md:py-20 lg:py-24">
      <Container>
        <ExproHeroSearch />
        <ExproCategoryStrip />
      </Container>
    </section>
  );
};

export default ExproPage;
