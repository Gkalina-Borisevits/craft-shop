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
import YouTube from "react-youtube"
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

  const youTubeVideoId = (url: string) => {
    const videoIdMatch = url.match(
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
    )
    return videoIdMatch ? videoIdMatch[1] : undefined
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
        {questions
          ?.slice()
          .reverse()
          .map(card => (
            <li
              key={card.id}
              className="flex flex-col sm:flex-row items-center justify-around border border-white w-full p-4 m-2 rounded-lg"
            >
              {card.photo && (
                <img
                  src={
                    typeof card.photo === "string"
                      ? card.photo
                      : URL.createObjectURL(card.photo)
                  }
                  alt={card.description}
                  className="w-64 h-auto sm:mr-4 mb-4 sm:mb-0"
                />
              )}
              <div className="text-center sm:text-left">
                <p>{card?.description}</p>
                {card?.videoLink && (
                  <YouTube
                    videoId={youTubeVideoId(card?.videoLink)}
                    className="w-full h-auto mt-4"
                  />
                )}
                {/* {card?.videoLink && (
                  <a
                    href={card?.videoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 text-blue-500 hover:text-blue-700"
                  >
                    {card.description}
                  </a>
                )} */}
                {questionForm && (
                  <button
                    id="delete-card"
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
