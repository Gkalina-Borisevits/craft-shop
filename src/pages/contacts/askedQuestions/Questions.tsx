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
      await deleteQuestion(id)
      toast.success(t("toasty.cardSuccessfully"))
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

      <ul>
        {questions?.map(card => (
          <li key={card.id}>
            <img src={card?.photo} alt={card.description} />
            <p>{card?.description}</p>
            <button onClick={() => handleDeleteCard(card.id!)}>
              {t("careers.deleteCard")}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Questions
