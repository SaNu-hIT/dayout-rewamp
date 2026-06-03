import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Destinations from '@/components/Destinations';
import Experiences from '@/components/Experiences';
import Gallery from '@/components/Gallery';
import Testimonials from '@/components/Testimonials';
import Trust from '@/components/Trust';
import FAQ from '@/components/FAQ';
import Newsletter from '@/components/Newsletter';
import Footer from '@/components/Footer';
import BackToTop from '@/components/BackToTop';

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Features />
      <Destinations />
      <Experiences />
      <Gallery />
      <Testimonials />
      <Trust />
      <FAQ />
      <Newsletter />
      <Footer />
      <BackToTop />
    </main>
  );
}
