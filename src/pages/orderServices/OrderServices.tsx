import type { FC } from 'react';
import styles from "./OrderServices.module.css"
import { useTranslation } from 'react-i18next';

const OrderServices: FC = () => {
  const { t } = useTranslation("translation")


  return (
    <div className={`${styles.orderServicesContainer}  gap-5 p-3`}>
    <div className='text-white border border-white p-4 bg-gray-900 mb-9 h-full mr-6 ml-6'>
      {t("services.delivery1")}
      <div className='h-9'></div>
      {t("services.delivery2")}
      <div className='h-9'></div>
      {t("services.delivery3")}
      <div className='h-9'></div>
      {t("services.delivery4")}
    </div>

    <div className='text-white border border-white p-4 bg-gray-900 h-full mr-6 ml-6'>
      {t("services.package1")}
      <div className='h-9'></div>
      {t("services.package2")}
    </div>
    </div>
  )
}

export default OrderServices