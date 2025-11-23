import PageHero from '../PageHero';
import Awards from '../Awards';
import infoImage from '../../images/info.jpg';

const AwardsPage = () => {
  return (
    <div>
      <PageHero 
        title="विकास कामे" 
        subtitle="माहिती"
        image={infoImage}
      />
      <Awards />
    </div>
  );
};

export default AwardsPage;

