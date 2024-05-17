import { useState } from "react"
import type { CareersFormData } from "./api/types"
import { useTranslation } from "react-i18next"

type Props = {
  onClose: () => void
}

const CareersForm: React.FC<Props> = ({ onClose }) => {
  const { t } = useTranslation("translation")

  const [formData, setFormData] = useState<CareersFormData>({
    photo: "",
    description: "",
  })

  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const photoURL = URL.createObjectURL(event.target.files[0])
      setFormData(prevState => ({
        ...prevState,
        photo: photoURL,
      }))
    }
  }

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setFormData(prevState => ({
      ...prevState,
      description: event.target.value,
    }))
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log("Form Data:", formData)
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Job Application</h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-9 border-2 border-white-200 p-6"
      >
        <div className="flex flex-col md:flex-row items-center gap-2">
          <div className="md:flex-none md:w-1/3 w-full">
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
            {formData.photo && (
              <img
                src={formData.photo}
                alt="Uploaded"
                className="mt-3 w-full h-auto object-cover rounded"
              />
            )}
          </div>
          <div className="md:flex-none md:w-2/3 w-full  p-2 rounded ">
            <label className="block text-sm font-medium text-gray-300">
              {t("whoWeAre.addDescription")}
            </label>
            <textarea
              value={formData.description}
              onChange={handleDescriptionChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              rows={6}
            />
          </div>
        </div>
        <button
          id="addInCard"
          type="submit"
          className="bg-blue-400 text-white p-3 pl-5 pr-5 rounded-md hover:bg-blue-600 transition duration-300 mr-5"
        >
          {t("storeProduct.buttonAddCard")}
        </button>
        <button
          id="closeWidow"
          onClick={onClose}
          className="mt-4 bg-yellow-400 text-white p-3 pl-5 pr-5 rounded-md hover:bg-yellow-600 transition duration-200"
        >
          {t("storeProduct.closeForm")}
        </button>
      </form>
    </div>
  )
}

export default CareersForm
