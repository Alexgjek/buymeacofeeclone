'use server';
import ProfileInfoForm from "@/components/ProfileInfoForm";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import mongoose from 'mongoose';
import { ProfileInfoModel } from "@/models/ProfileInfo";
import { DonationModel } from "@/models/Donation";
import { Donation } from "@/models/Donation";
import Link from "next/link";
export default async function ProfilePage() {

  const session = await getServerSession(authOptions);

  if (!session  || !session.user?.email){
    return 'Not logged in';
  }

  const email = session.user?.email;
  await mongoose.connect(process.env.MONGODB_URI as string);
  const profileInfoDocument = JSON.parse(JSON.stringify(await ProfileInfoModel.findOne({email})))

  const donations:Donation[] = await DonationModel.find({paid:true});
  const total = donations.reduce((current, d) => current + d.amount * 5, 0)
  return (
    <div className="max-w-2xl mx-auto px-4 mt-4">
      <ProfileInfoForm profileInfo={profileInfoDocument}/>
      <div className="border-2 bg-yellow-300/20 border-yellow-300 p-4 rounded-xl flex items-center gap-2 my-4 justify-between">
        <div className="flex items-center gap-2">
          Total Money Recieved: <span className="text-2xl">${total}</span>
        </div>
        <a 
          className="bg-yellow-300 py-2 rounded-lg px-4"
          href={"mailto:payouts@bmac.io"}>
          Request payout
        </a>
      </div>
    </div>
  )
  
}