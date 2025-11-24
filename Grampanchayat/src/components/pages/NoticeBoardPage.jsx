import PageHero from '../PageHero';
import NoticeBoard from '../NoticeBoard';
import infoImage from '../../images/gav.jpg';

const NoticeBoardPage = () => {
  return (
    <div>
      <PageHero 
        title="विकास कामे" 
        subtitle="माहिती"
        image={infoImage}
      />
      <NoticeBoard />
    </div>
  );
};

export default NoticeBoardPage;

