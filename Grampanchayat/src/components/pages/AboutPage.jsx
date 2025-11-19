import PageHero from '../PageHero';
import About from '../About';
import Leadership from '../Leadership';
import gavImage from '../../images/gav.jpg';

const AboutPage = () => {
  return (
    <div>
      <PageHero 
        title="आमच्याबद्दल" 
        subtitle="माहिती"
        image={gavImage}
      />
      <About />
      <Leadership />
    </div>
  );
};

export default AboutPage;

