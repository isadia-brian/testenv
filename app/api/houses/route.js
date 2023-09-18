import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/MongoConnect";
import House from "@/models/HouseModel";

export async function GET() {
  try {
    let houses;
    await connectMongoDB();

    houses = await House.find({});
    if (houses.length > 1) {
      console.log("houses found");
      return NextResponse.json({ houses }, { status: 200 });
    } else {
      console.error("No houses Found");
      return NextResponse.json({ message: "No houses found" }, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json({ message: "Error connecting" }, { status: 500 });
  }
}

export async function POST(request) {
  const body = await request.json();
  const { title, image } = body;
  console.log(body);

  try {
    await connectMongoDB();
    let houseExist;
    houseExist = await House.findOne({ title });
    if (houseExist) {
      return NextResponse.json(
        { message: "This house already exist" },
        { status: 409 }
      );
    }
    const house = new House({ title, image });
    await house.save();

    return NextResponse.json(
      { house },
      { message: "Success" },
      { headers: { "content-type": "application/json" } },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error connecting" },

      { status: 500 }
    );
  }
}
