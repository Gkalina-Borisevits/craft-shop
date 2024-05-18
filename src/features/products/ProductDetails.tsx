import type React from 'react'
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getStoreProductById, selectProductById } from './storeProductSlice';

const ProductDetails: React.FC = () => {
    const { id } = useParams();
    const productById = useAppSelector(selectProductById)
    const dispatch = useAppDispatch()


    useEffect(() => {
        if(id !== undefined) {
        dispatch(getStoreProductById(id))
    }}, [dispatch, id])

  return (
    <div>
      
    </div>
  )
}

export default ProductDetails
