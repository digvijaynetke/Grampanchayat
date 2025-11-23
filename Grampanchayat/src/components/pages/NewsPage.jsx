import PageHero from '../PageHero';
import News from '../News';
import mandirImage from '../../images/mandir.jpg';

const NewsPage = () => {
  return (
    <div>
      <PageHero 
        title="ग्रामपंचायत कार्यालय" 
        subtitle="माहिती"
        image={mandirImage}
      />
      <News />
    </div>
  );
};

export default NewsPage;

