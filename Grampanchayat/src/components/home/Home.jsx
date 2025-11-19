import Hero from '../Hero';
import About from '../About';
import Leadership from '../Leadership';
import Awards from '../Awards';
import News from '../News';
import Achievements from '../Achievements';
import NoticeBoard from '../NoticeBoard';
import { VillageStatisticsComponents } from '../VillageComponents';

const Home = () => {
  return (
    <>
      <Hero />
      <About />
      <Leadership />
      <Awards />
      <News />
      <Achievements />
      <NoticeBoard />
      <VillageStatisticsComponents language="mr" />
    </>
  );
};

export default Home;

