import { useTranslation } from "react-i18next"
import { useAppDispatch } from "../../app/hooks"
import { useState } from "react"
import type { Question } from "./types/Question"
import { toast } from "react-toastify"
import { addQuestion } from "./slice/questionSlice"

type Props = {
  onClose: () => void
}

const QuestionsForm: React.FC<Props> = ({ onClose }) => {
  const { t } = useTranslation("translation")
  const dispatch = useAppDispatch()
  const [card, setCard] = useState<Question>({
    photo: undefined,
    description: "",
    videoLink: "",
  })

  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setCard(prevState => ({
        ...prevState,
        photo: file,
      }))
    }
  }

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setCard(prevState => ({
      ...prevState,
      description: event.target.value,
    }))
  }

  const handleVideoLinkChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setCard(prevState => ({
      ...prevState,
      videoLink: event.target.value,
    }))
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData()
    if (card.photo) {
      formData.append("photo", card.photo)
    }
    formData.append("description", card.description)
    formData.append("videoLink", card.videoLink)

    try {
      await dispatch(addQuestion(formData)).unwrap()
      toast.success(t("toasty.cardSuccessfully"))
      if (onClose) {
        onClose()
      }
    } catch (error) {
      toast.error(t("toasty.notAddCard"))
    }
  }

  return (
    <div className="container mx-auto p-4">
      <form
        onSubmit={handleSubmit}
        className="space-y-6 border p-6 rounded-md shadow-md"
      >
        <div className="flex flex-col space-y-4">
          {card.photo && (
            <div className="mt-3 flex flex-col items-center">
              <img
                src={URL.createObjectURL(card?.photo)}
                alt="Uploaded"
                className="w-auto h-48 object-cover rounded-md"
              />
            </div>
          )}
          <label
            htmlFor="photo-upload"
            className="block w-full bg-blue-500 text-white text-center py-2 px-4 rounded cursor-pointer"
          >
            <p className="mt-1 bg-blue-500 text-white text-center rounded cursor-pointer">
              {t("whoWeAre.uploadPhoto")}
            </p>
          </label>
          <input
            type="file"
            accept="image/*"
            id="photo-upload"
            onChange={handlePhotoChange}
            className="hidden"
          />
        </div>
        <div className="flex flex-col space-y-4">
          <label className="block text-sm font-medium text-gray-700">
            {t("form.description")}
          </label>
          <textarea
            value={card.description}
            onChange={handleDescriptionChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            rows={6}
          />
        </div>
        <div className="flex flex-col space-y-4">
          <label className="block text-sm font-medium text-gray-700">
            {t("form.videoLink")}
          </label>
          <input
            type="text"
            value={card.videoLink}
            onChange={handleVideoLinkChange}
            className="mt-1 h-9 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          />
        </div>
        <div>
          <button
            id="add-card"
            type="submit"
            className="bg-blue-400 text-white p-3 pl-5 pr-5 rounded-md hover:bg-yellow-400 transition duration-300 mr-7"
          >
            {t("storeProduct.buttonAddCard")}
          </button>
          <button
            id="close-window"
            onClick={onClose}
            className="mt-4 bg-yellow-400 text-white p-3 pl-5 pr-5 rounded-md hover:bg-blue-400 transition duration-200"
          >
            {t("storeProduct.closeForm")}
          </button>
        </div>
      </form>
    </div>
  )
}

export default QuestionsForm
