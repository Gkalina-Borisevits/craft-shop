import type React from "react"
import { useState } from "react"
import type { WhoWeAreFormData } from "./api/types"
import { useTranslation } from "react-i18next"

type Props = {
  onClose: () => void
}

const WhoWeAreForm: React.FC<Props> = ({ onClose }) => {
  const { t } = useTranslation("translation")
  const [formData, setFormData] = useState<WhoWeAreFormData>({
    photos: [],
    description: "",
    videoLink: "",
  })

  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const fileArray = Array.from(event.target.files)
      const newPhotos = fileArray.map(file => URL.createObjectURL(file))
      setFormData(prevState => ({
        ...prevState,
        photos: [...prevState.photos, ...newPhotos],
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

  const handleVideoLinkChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setFormData(prevState => ({
      ...prevState,
      videoLink: event.target.value,
    }))
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log("Form Data:", formData)

    const formDataToSend = new FormData()
    formData.photos.forEach((photo, index) => {
      formDataToSend.append(`photos[${index}]`, photo)
    })
    formDataToSend.append("description", formData.description)
    formDataToSend.append("videoLink", formData.videoLink)
    onClose()
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-white mb-8">Who We Are</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="file-upload"
            className="block text-sm font-medium text-gray-700"
          ></label>
          <input
            type="file"
            multiple
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
          <div className="mt-3 flex flex-wrap gap-4">
            {formData.photos.map((photo, index) => (
              // eslint-disable-next-line jsx-a11y/img-redundant-alt
              <img
                key={index}
                src={photo}
                alt={`Photo ${index + 1}`}
                className="w-56 h-56 object-cover rounded"
              />
            ))}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-4">
            {t("whoWeAre.addDescription")}
          </label>
          <textarea
            value={formData.description}
            onChange={handleDescriptionChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            rows={4}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-4">
            {t("whoWeAre.linkToVideo")}
          </label>
          <input
            type="url"
            value={formData.videoLink}
            onChange={handleVideoLinkChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-3"
            placeholder="https://www.example.com"
          />
        </div>
        <button
          id="addCard"
          type="submit"
          className="bg-blue-400 text-white p-3 pl-5 pr-5 rounded-md hover:bg-blue-600 transition duration-300 mr-5"
        >
          {t("storeProduct.buttonAddCard")}
        </button>
        <button
          id="closeWindow"
          onClick={onClose}
          className="mt-4 bg-yellow-400 text-white p-3 pl-5 pr-5 rounded-md hover:bg-yellow-600 transition duration-200"
        >
          {t("storeProduct.closeForm")}
        </button>
      </form>
    </div>
  )
}

export default WhoWeAreForm
