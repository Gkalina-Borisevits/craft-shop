import type { FC } from "react"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import { selectRole } from "../../../features/auth/userSlice"
import {
  deleteQuestion,
  getQuestions,
  selectQuestions,
} from "../../../components/contactForm/slice/questionSlice"
import { toast } from "react-toastify"

import styles from "./Questions.module.css"
import QuestionsForm from "../../../components/contactForm/QuestionsForm"

const Questions: FC = () => {
  const [isAddingQuestion, setIsAddingQuestion] = useState(false)
  const { t } = useTranslation("translation")
  const role = useAppSelector(selectRole)
  const questions = useAppSelector(selectQuestions)
  const dispatch = useAppDispatch()
  const questionForm = role === "ADMINISTRATOR" || role === "MODERATOR"

  useEffect(() => {
    dispatch(getQuestions())
  }, [dispatch])

  const handleAddProductClick = () => {
    setIsAddingQuestion(true)
  }

  const handleCloseProductCreator = () => {
    setIsAddingQuestion(false)
  }

  const handleDeleteCard = async (id: number) => {
    try {
      await dispatch(deleteQuestion(id))
      toast.success(t("toasty.deletedCard"))
    } catch (err) {
      toast.error(t("toasty.notUpdatedCard"))
    }
  }
  return (
    <div className={styles.buttonAddNewInfoCard}>
      {questionForm && (
        <>
          <button
            id="addCard"
            onClick={handleAddProductClick}
            className="mt-4 bg-blue-500 text-white p-2 hover:bg-yellow-500 rounded"
          >
            {t("storeProduct.buttonAddCard")}
          </button>
          {isAddingQuestion && (
            <QuestionsForm onClose={handleCloseProductCreator} />
          )}
        </>
      )}

<ul className="mt-4 text-white p-2 rounded flex flex-col items-center">
    {questions?.map(card => (
        <li
            key={card.id}
            className="flex flex-col sm:flex-row items-center justify-around border border-white w-full p-4 m-2 rounded-lg"
        >
            <img
                src={card?.photo}
                alt={card.description}
                className="w-64 h-auto sm:mr-4 mb-4 sm:mb-0"
            />
            <div className="text-center sm:text-left">
                <p>{card?.description}</p>
                {card?.videoLink && (
                    <iframe
                        title={`Video for ${card.description}`} 
                        src={card?.videoLink}
                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-64 mt-4" 
                        style={{ border: 'none' }} 
                    ></iframe>
                )}
                 {card?.videoLink && (
                    <a href={card?.videoLink} target="_blank" rel="noopener noreferrer" className="mt-2 text-blue-500 hover:text-blue-700">
                       {card.description}
                    </a>
                )}
                {questionForm && (
                    <button
                        onClick={() => handleDeleteCard(card.id!)}
                        className="mt-9 bg-red-400 text-white p-2 rounded hover:bg-red-600"
                    >
                      {t("careers.deleteCard")}
                    </button>
                )}
            </div>
        </li>
    ))}
</ul>
    </div>
  )
}

export default Questions
