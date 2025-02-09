import { useState } from "react"
import type { CareersFormData } from "./types/CareersFormData"
import { useTranslation } from "react-i18next"
import { useAppDispatch } from "../../app/hooks"
import { addCareers } from "./slice/careersSlise"
import { toast } from "react-toastify"

type Props = {
  onClose: () => void
}

const CareersForm: React.FC<Props> = ({ onClose }) => {
  const { t } = useTranslation("translation")
  const dispatch = useAppDispatch()
  const [card, setCard] = useState<CareersFormData>({
    photo: null,
    description: "",
  })

  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files && files[0]) {
      setCard(prevState => ({
        ...prevState,
        photo: files[0],
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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log("Form Data:", card)

    const formData = new FormData()
    if (card.photo) {
      formData.append("photo", card.photo)
    }
    formData.append("description", card.description)
    try {
      await dispatch(addCareers(formData)).unwrap()
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
        className="space-y-9 border-2 border-white-200 p-6"
      >
        <div className="flex flex-col md:flex-row items-center gap-2">
          <div className="md:flex-none md:w-1/3 w-full">
          <label
            htmlFor="file-upload"
            className="block text-sm font-medium text-gray-700"
          ></label>
          <input
            type="file"
            accept="image/*"
            id="file-upload"
            onChange={handlePhotoChange}
            className="hidden"
          />
          <label
            htmlFor="file-upload"
            className="mt-1 block w-full bg-blue-500 text-white text-center py-2 px-4 rounded cursor-pointer"
          >
             {t("whoWeAre.uploadPhoto")}
          </label>
          <div className="mt-3">
            {card.photo && (
              <img
                src={URL.createObjectURL(card.photo)}
                alt="Selected"
                className="w-56 h-56 object-cover rounded border border-white"
              />
            )}
          </div>
        </div>
          <div className="md:flex-none md:w-2/3 w-full  p-2 rounded ">
            <label className="block text-sm font-medium text-gray-300">
              {t("whoWeAre.addDescription")}
            </label>
            <textarea
              value={card.description}
              onChange={handleDescriptionChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              rows={6}
            />
          </div>
        </div>
        <button
          id="add-card"
          type="submit"
          className="bg-blue-400 text-white p-3 pl-5 pr-5 rounded-md hover:bg-yellow-400 transition duration-300 mr-5"
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
      </form>
    </div>
  )
}

export default CareersForm
