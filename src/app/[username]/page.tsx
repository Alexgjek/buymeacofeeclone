'use server';
import { ProfileInfo,ProfileInfoModel } from "@/models/ProfileInfo";
import mongoose from "mongoose";
import Image from 'next/image';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import DonationForm from "@/components/DonationForm";
import { DonationModel } from "@/models/Donation";
import { Donation } from "@/models/Donation";
import DonationStatus from "@/components/DonationStatus";

type Props = {
  params: {
    username: string;
  }
}

export default async function SingleProfilePage({params}: Props) {
  const username = params.username;
  await mongoose.connect(process.env.MONGODB_URI as string);
  const profileInfoDoc:ProfileInfo|null = await ProfileInfoModel.findOne({username});

  if (!profileInfoDoc){
    return (
      <div>404 - profile not found</div>
    )
  }

  const donations:Donation[] = await DonationModel.find({paid:true, email:profileInfoDoc.email});

  return (
    <div>
      <DonationStatus />
      <div className="w-full h-48 ">
        <Image 
          src={profileInfoDoc.coverUrl} 
          alt='cover image' 
          width={2048} height={2048}
          className="object-cover object-center h-48" />
      </div>
      <div className="max-w-2xl px-2 mx-auto relative -mt-16">
        <div className="flex items-end gap-3">
          <div className="size-36 overflow-hidden rounded-xl border-2 border-white">
            <Image 
              src={profileInfoDoc.avatarUrl} 
              alt="avatar image" 
              width={256} height={256} 
              className="size-36 object-cover object-center"/>
          </div>
          <div className="mb-1">
            <h1 className="text-4xl font-semibold">
              {profileInfoDoc.displayName}
            </h1>
            <h2 className=" flex items-center gap-1 rounded-md">
              <FontAwesomeIcon icon={faCoffee}/>
              <span>/</span>
              <span>{profileInfoDoc.username}</span>
            </h2>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <h3 className="font-semibold">About {profileInfoDoc.username}</h3>
            {profileInfoDoc.bio}
            <hr className="my-4"/>
            <h3 className="font-semibold mt-6">Recent Supporters:</h3>
            {!donations.length && (
              <>
                <p>No recent donations</p>
              </>
            )}
            {donations.length && (
              <div className="mt-2">
                {donations.map(donation => (
                  <div className="py-2">
                    <h3>
                      <span className="font-semibold">
                        {donation.name}
                      </span>
                      {' '}
                      <span className="text-gray-400">
                        {donation.amount === 1 && `bought you a coffee`}
                        {donation.amount > 1 && `bought you ${donation.amount} coffees`}
                      </span>
                    </h3>
                    <p className="bg-gray-100 p-2 rounded-md">
                      {donation.message}
                    </p>
                  </div>
                ))}
              </div>
              )}
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <DonationForm email={profileInfoDoc.email}/>
          </div>
        </div>
      </div>
    </div>
  )
}