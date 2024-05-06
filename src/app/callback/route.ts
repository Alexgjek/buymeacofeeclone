import { NextRequest } from "next/server"
import mongoose from "mongoose";
import { DonationModel } from "@/models/Donation";

async function handler(req:NextRequest) {
  const data = await req.json();
  await mongoose.connect(process.env.MONGODB_URI as string)
  const {status, order_id} = data;
  if (status === 'paid'){
    await DonationModel.findByIdAndUpdate(data.order_id, {paid:true});
  }
  console.log({data});

  return Response.json(true);
}

export {handler as GET, handler as POST}