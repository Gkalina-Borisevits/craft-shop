import { useEffect, useState, type FC } from "react"
import styles from "./styles/ProfileCard.module.css"
import { useTranslation } from "react-i18next"
import logo from "../../assets/logo.png"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { selectRole } from "../../features/auth/userSlice"
import type { Profile, ProfileState } from "./types/Profile"
import { selectProfile, updateProfile } from "./profileSlice"

type Props = {
  onClose?: () => void
}

const ProfileCard: React.FC<Props> = ({ onClose }) => {
  const { t } = useTranslation("translation")
  const role = useAppSelector(selectRole)
  const profilePage = useAppSelector(selectProfile)
  const [profileState, setProfileState] = useState<ProfileState>({
    profiles: [
      { name: "card-1", id: "1", description: "", file: undefined, url: "" },
      { name: "card-2", id: "2", description: "", file: undefined, url: "" },
      { name: "card-3", id: "3", description: "", file: undefined, url: "" },
    ],
    profile: null,
    loading: false,
    error: null,
  })
  const [files, setFiles] = useState<File[]>([])

  const dispatch = useAppDispatch()
  const viewProfileForm = role === "ADMINISTRATOR" || role === "MODERATOR"

  useEffect(() => {
    if (profilePage) {
      const updatedProfiles = profilePage.map((profile, index) => ({
        ...profile,
        file: profileState?.profiles[index]?.file || undefined,
        url: profile?.url || profileState?.profiles[index]?.url || "",
        description: profile?.description || profileState?.profiles[index]?.description || "",
      }));
      setProfileState(prevState => ({ ...prevState, profiles: updatedProfiles }));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profilePage]);

  const handleFileChange =
    (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0]
      if (file) {
        const updatedProfiles = [...profileState.profiles]
        updatedProfiles[index] = { ...updatedProfiles[index], file }
        setProfileState({ ...profileState, profiles: updatedProfiles })

        const updatedFiles = [...files]
        updatedFiles[index] = file
        setFiles(updatedFiles)
      }
    }

    const handleInputChange =
    (index: number, field: keyof Profile) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const updatedProfiles = [...profileState.profiles];
      updatedProfiles[index] = {
        ...updatedProfiles[index],
        [field]: event.target.value,
      };
      setProfileState({ ...profileState, profiles: updatedProfiles });
    };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    for (let i = 0; i < profileState.profiles.length; i++) {
      const profile = profileState.profiles[i]
      const formData = new FormData()

      // formData.append('id', profile.id || '');
      formData.append("description", profile.description || "")
      if (files[i]) {
        formData.append("file", files[i] as File)
      }

      try {
        console.log("home page: data", formData, "name: ", profile.name)
        await dispatch(updateProfile({ name: profile.name ?? "", formData }))
        if (onClose) {
          onClose()
        }
      } catch (error) {
        console.error("Error submitting data", error)
      }
    }
  }

  return (
    <div className={styles.homeContainer}>
       <button
          id="closeWindow"
          onClick={onClose}
          className="mt-4 bg-yellow-400 text-white p-2 rounded-md hover:bg-yellow-600 transition duration-200"
        >
          {t("storeProduct.closeForm")}
        </button>
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
              {profileState.profiles[0].file ? (
                <img
                  src={URL.createObjectURL(profileState.profiles[0].file)}
                  alt="Profile"
                  className="w-24 h-auto absolute sm:w-24 md:w-40 lg:w-32 xl:w-48"
                />
              ) : (
                profileState.profiles[0].url && (
                  <img
                    src={profileState.profiles[0].url}
                    alt="Profile"
                    className="w-24 h-auto absolute sm:w-24 md:w-40 lg:w-32 xl:w-48"
                  />
                )
              )}
            </div>
            <div className="mt-4 w-full lg:w-3/4 mx-auto bg-black">
              <textarea
                value={profileState?.profiles[0].description}
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
                value={profileState.profiles[1].description}
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
                {profileState.profiles[1].file ? (
                  <img
                    src={URL.createObjectURL(profileState.profiles[1].file)}
                    alt="Profile"
                    className="w-24 h-auto absolute right-0 top-0 z-100 sm:w-24 md:w-40 lg:w-32 xl:w-48"
                  />
                ) : (
                  profileState.profiles[1].url && (
                    <img
                      src={profileState.profiles[1].url}
                      alt="Profile"
                      className="w-24 h-auto absolute right-0 top-0 z-100 sm:w-24 md:w-40 lg:w-32 xl:w-48"
                    />
                  )
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
              {profileState.profiles[2].file ? (
                <img
                  src={URL.createObjectURL(profileState.profiles[2].file)}
                  alt="Profiles"
                  className="w-36 h-auto absolute sm:w-36 md:w-40 lg:w-32 xl:w-48"
                />
              ) : (
                profileState.profiles[2].url && (
                  <img
                    src={profileState.profiles[2].url}
                    alt="Profiles"
                    className="w-36 h-auto absolute sm:w-36 md:w-40 lg:w-32 xl:w-48"
                  />
                )
              )}
              <div className="mt-4 w-full lg:w-3/4 mx-auto">
                <textarea
                  value={profileState.profiles[2].description}
                  onChange={handleInputChange(2, "description")}
                  placeholder="Product Description"
                  className="w-full h-56 p-4 border border-gray-300 rounded text-black bg-white mt-12 text-right"
                />
              </div>
            </div>
          </div>
          {viewProfileForm && (
            <button
              type="submit"
              className="w-full bg-blue-400 hover:bg-yellow-400 text-white font-bold py-2 px-4 mt-9 rounded"
            >
              Submit
            </button>
          )}
        </form>
       
      </div>
    </div>
  )
}
export default ProfileCard
