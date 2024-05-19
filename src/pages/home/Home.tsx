import { useState, type FC } from "react"
import styles from "./Home.module.css"
import { useTranslation } from "react-i18next"
import logo from "../../assets/logo.png"
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectRole } from "../../features/auth/userSlice";

interface Profile {
  id: string;
  image: string;
  description: string;
}

const Home: FC = () => {
  const { t } = useTranslation("translation")
  const role = useAppSelector(selectRole)
  const [profiles, setProfiles] = useState<Profile[]>([
    { id: "1", image: "", description: "" },
    { id: "2", image: "", description: "" },
    { id: "3", image: "", description: "" },
  ])
  const [files, setFiles] = useState<File[]>([])
  const [isAdmin, setIsAdmin] = useState<boolean>(true)
  const dispatsh = useAppDispatch()
  const viewProfileForm = role === "ADMINISTRATOR" || role === "MODERATOR"

  const handleFileChange = (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      const updatedProfiles = [...profiles];
      updatedProfiles[index].image = url;
      setProfiles(updatedProfiles);

      const updatedFiles = [...files];
      updatedFiles[index] = file;
      setFiles(updatedFiles);
    }
    }

    const handleInputChange = (index: number, field: keyof Profile) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const updatedProfiles = [...profiles];
      updatedProfiles[index][field] = event.target.value;
      setProfiles(updatedProfiles);
    };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData()

    profiles.forEach((profile, index) => {
      formData.append(`profiles[${index}][id]`, profile.id);
      formData.append(`profiles[${index}][description]`, profile.description);
      if (files[index]) {
        formData.append(`profiles[${index}][file]`, files[index]);
      }
    });
    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })
      if (response.ok) {
        console.log("Data submitted successfully")
      } else {
        console.error("Error submitting data")
      }
    } catch (error) {
      console.error("Error submitting data", error)
    }
  }

  return (
    <div className={styles.homeContainer}>
      <div className={styles.logoHome}>
        <img src={logo} alt="Logo" className="max-w-full" />
      </div>

      <div className="bg-black mt-8">
        <form
          onSubmit={handleSubmit}
          className="w-full p-4 shadow-md rounded-lg bg-black"
        >
          <div className="flex flex-col items-center w-full text-white bg-black">
            <div className="relative w-full lg:w-3/4 mx-auto">
              <input
                type="file"
                id="file-upload-0"
                className="hidden"
                accept="image/*"
                onChange={handleFileChange(0)}
              />
              <label
                htmlFor="file-upload-0"
                className="absolute bottom-2 left-2 bg-blue-500 text-white py-2 px-4 rounded cursor-pointer"
              >
                {t("storeProduct.file")}
              </label>
              {profiles[0].image && (
                <img
                  src={profiles[0].image}
                  alt="Profile"
                  className="w-24 h-auto absolute sm:w-24 md:w-40 lg:w-32 xl:w-48"
                />
              )}
            </div>
            <div className="mt-4 w-full lg:w-3/4 mx-auto bg-black">
              <textarea
                value={profiles[0].description}
                onChange={handleInputChange(0, "description")}
                placeholder="Product Description"
                className="w-full h-48 p-4 border border-gray-300 rounded text-white bg-black mt-12 text-right"
              />
            </div>
          </div>

          {/* 2 Product */}
          <div className="flex flex-col items-center w-full ">
            <div className="relative w-full lg:w-3/4 mx-auto flex lg:flex-row">
              <div className=" lg:w-1/4 bg-black"></div>
              <div className="flex-1 mt-4 lg:w-3/4">
                <textarea
                  value={profiles[1].description}
                  onChange={handleInputChange(1, "description")}
                  placeholder="Profile Description"
                  className="w-full p-4 h-56 border border-gray-300 rounded"
                />
              </div>
              <div className="flex-1 relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange(1)}
                  id="file-upload-1"
                  className="hidden"
                />
                <label
                  htmlFor="file-upload-1"
                  className="bg-blue-500 text-white py-2 px-4 rounded cursor-pointer"
                >
                  {t("storeProduct.file")}
                </label>
                {profiles[1].image && (
                  <img
                    src={profiles[1].image}
                    alt="Profile"
                    className="w-24 h-auto absolute right-0 top-0 z-100 sm:w-24 md:w-40 lg:w-32 xl:w-48"
                  />
                )}
              </div>
            </div>
          </div>
          <div
            className="w-full bg-black h-auto mx-auto my-4"
            style={{ height: "80px" }}
          ></div>

          {/* 3 Product */}
          <div className="flex flex-col items-center w-full text- black bg-white">
            <div className="relative w-full lg:w-3/4 mx-auto">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange(2)}
                id="file-upload-2"
                className="hidden"
              />
              <label
                htmlFor="file-upload-2"
                className="absolute bottom-2 left-2 bg-blue-500 text-white py-2 px-4 rounded cursor-pointer"
              >
                {t("storeProduct.file")}
              </label>
              {profiles[2].image && (
                <img
                  src={profiles[2].image}
                  alt="Profiles"
                  className="w-36 h-auto absolute sm:w-36 md:w-40 lg:w-32 xl:w-48"
                />
              )}
              <div className="mt-4 w-full lg:w-3/4 mx-auto">
                <textarea
                  value={profiles[2].description}
                  onChange={handleInputChange(2, "description")}
                  placeholder="Product Description"
                  className="w-full h-56 p-4 border border-gray-300 rounded text-black bg-white mt-12 text-right"
                />
              </div>
            </div>
        
          </div>
          {isAdmin && <button type="submit"
          className="w-full h-56 p-4 border border-gray-300 rounded text-black bg-white mt-12 text-right">Submit</button>}
        </form>
      </div>
    </div>
  )
}
export default Home
