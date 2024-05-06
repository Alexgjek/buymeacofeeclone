'use client';
import {saveProfile} from "@/actions/ProfileInfoActions"
import UploadButton from "./UploadButton";
import { useState } from "react";
import { ProfileInfo } from "@/models/ProfileInfo";
import Image from 'next/image'
import {toast} from 'react-hot-toast'
import { signOut } from "next-auth/react";

type Props = {profileInfo:ProfileInfo | null};


export default function ProfileInfoForm({profileInfo}: Props){

  const [coverUrl, setCoverUrl] = useState(profileInfo?.coverUrl);
  const [avatarUrl, setAvatarUrl] = useState(profileInfo?.avatarUrl)

  async function handleFormAction(formData: FormData) {

    try {
      await saveProfile(formData);
      toast.success('Profile saved!');
    } catch (error) {
      toast.error('Username already exists');
    }
  }

  console.log({profileInfo})

  return (
    <form action={handleFormAction}>
      <div className="relative border bg-gray-100 rounded-lg h-48 mb-4">
        <Image 
          src={coverUrl || ''} 
          alt="cover image" 
          width={1024} height={1024} 
          className="w-full h-48 object-cover object-center rounded-lg" />
        <div className="absolute left-4 -bottom-4 z-10 border bg-gray-100 size-24 rounded-lg">
          <div className="rounded-lg size-24 overflow-hidden">
            <Image 
              src={avatarUrl|| ''} 
              alt="avatar" 
              width={120} height={120}/>
          </div>
          <div className="absolute -bottom-2 -right-2">
            <UploadButton onUploadComplete={setAvatarUrl}  />
          </div>
          <input 
            type="hidden" 
            name="avatarUrl" 
            value={avatarUrl}/>
        </div>
        <div className="absolute right-2 bottom-2">
          <UploadButton onUploadComplete={setCoverUrl} />
          <input 
            type="hidden" 
            name="coverUrl" 
            value={coverUrl} />
        </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div>
          <label className="input-label" htmlFor="usernameIn">Username</label>
          <input 
            defaultValue={profileInfo?.username} 
            name="username" 
            id="usernameIn" type="text" placeholder="username" />
        </div>
        <div>
          <label className="input-label" htmlFor="displayNameIn">Display Name</label>
          <input 
            defaultValue={profileInfo?.displayName} 
            name="displayName" 
            id='displayNameIn' 
            type="text" placeholder="Display Name" />
      </div>
        </div>
      <div>
        <label className="input-label" htmlFor="bioIn">Bio</label>
        <textarea 
          defaultValue={profileInfo?.bio} 
          name="bio" 
          id="bioIn" placeholder="Bio"></textarea>
      </div>
      <div className="flex justify-between">
        <button 
          className="bg-yellow-300 px-4 py-2 rounded-lg mt-4" >
          Save profile
        </button>
        <button
          onClick={() => {
            signOut();
          }}          
          className="bg-gray-200 border border-gray-300 px-4 py-2 rounded-lg mt-4">
          Logout
        </button>
      </div>
    </form>
  )
}