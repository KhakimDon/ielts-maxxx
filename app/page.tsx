import Hero from './components/Hero'
import AboutSection from './components/AboutSection';
import GiveawaySection from './components/GiveawaySection';
import AuthorSection from './components/AuthorSection';
import BuyBookSection from './components/BuyBookSection';
import SliderReviewsSection from './components/SliderReviewsSection';


export default function Home() {

  return (
    <>
      <Hero />
      <AboutSection />
      <GiveawaySection />
      <AuthorSection />
      <BuyBookSection />
      <SliderReviewsSection />
    </>
  );
}
