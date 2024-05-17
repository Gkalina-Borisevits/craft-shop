import type React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import styles from './ActivationPage.module.css'; 
import { useAppDispatch } from '../../app/hooks';
import { activateAccount } from './userSlice';

const ActivationPage: React.FC = () => {
  const { t } = useTranslation('translation');
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const validationCode = urlParams.get('validation-code');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (validationCode) {
      console.log(validationCode)
      dispatch(activateAccount({ validationCode} ))
        .then(() => {
          toast.success(t('registration.registeredSuccessfully'));
          setTimeout(() => {
            navigate('/login');
          }, 8000);
        })
        .catch((error) => {
          toast.error(`${t('activation.failed')}: ${error}`);
        });
    }
  }, [dispatch, validationCode, navigate, t]);

  useEffect(() => {
    console.log('code' + validationCode);
  }, [validationCode]);

  return (
    <div className={styles.activationPageContainer}>
      <p>{t('registration.welcomeTextActivationBody')}</p>
    </div>
  );
};

export default ActivationPage;