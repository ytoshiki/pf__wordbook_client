import NotFoundImg from '../assets/images/notfound.png';
import '../styles/pages/NotFound.scss';
import { useHistory } from 'react-router';
import { useEffect } from 'react';
export interface NotFoundPageProps {}

const NotFoundPage: React.FC<NotFoundPageProps> = () => {
  const history = useHistory();

  useEffect(() => {
    setTimeout(() => {
      history.push('/');
    }, 2000);
  }, [history]);
  return (
    <div className='notFound'>
      <div className='notFound__inner'>
        <div className='notFound__message'>
          <h1>Oops!</h1>
          <p>Page not found</p>
        </div>
        <div className='notFound__image-wrapper'>
          <img src={NotFoundImg} alt='' />
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
