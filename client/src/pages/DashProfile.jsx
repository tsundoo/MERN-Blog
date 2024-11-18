import { useSelector } from "react-redux";
import { TextInput, Button } from "flowbite-react";
import { useRef, useState, useEffect } from "react";


export default function DashProfile() {
    const { currentUser } = useSelector((state) => state.user);
    const [imageFile, setImageFile] = useState(null);
    const [imageFileURL, setImageFileURL] = useState(null);
    const filePickerRef = useRef();

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setImageFileURL(URL.createObjectURL(file));
        }
    }
    
    useEffect(() => {
        if (imageFile) {
            uploadImage();
        }
    }, [imageFile]);

    const uploadImage = async () => {
        console.log('uploading image'); 
    }

  return (
    <div className="max-w-lg mx-auto p-3 w-full">
        <h1 className="text-2xl font-semibold mb-5 text-center my-7 dark:text-white">Profile</h1>
        <form className="flex flex-col gap-4">
            <input type="file" accept="image/*" onChange={handleImageChange} ref={filePickerRef} hidden/>
            <div className="w-32 h-32 self-center cursor-pointer hover:opacity-70 shadow-md rounded-full overflow-hidden" onClick={() => filePickerRef.current.click()}>
            <img src={imageFileURL || currentUser.avatar} alt="profile" className="rounded-full w-full h-full object-cover border-8 border-[lightgray]" />
            </div>
            <TextInput type="text" id="username" placeholder="username" value={currentUser.username}/>
            <TextInput type="email" id="email" placeholder="email" value={currentUser.email}/>
            <TextInput type="password" id="password" placeholder="password"/>
            <Button type="submit" className="w-full" gradientDuoTone="purpleToBlue"  outline>
                Update
            </Button>
        </form>
        <div className="text-red-500 flex justify-between mt-3">
            <span className="cursor-pointer hover:opacity-70">
                Delete Account
            </span>
            <span className="cursor-pointer hover:opacity-70">
                Sign Out
            </span>
        </div>
    </div>
  )
}
