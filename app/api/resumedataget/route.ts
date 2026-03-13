import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_RESUMEAPI_OPERATIONS}/get`
    );

    const resdata = await res.json();

    if (resdata.status === 200) {
      return NextResponse.json({
        status: 200,
        msg: "resume data:",
        data: resdata?.resumedata,
      });
    }

    if (resdata.status === 404) {
      return NextResponse.json({
        status: 404,
        msg: "resume data is not found",
      });
    }

    // ✅ fallback return
    return NextResponse.json({
      status: 500,
      msg: "unexpected response from API",
    });

  } catch (error) {
    return NextResponse.json({
      status: 500,
      msg: "server error",
    });
  }
}
