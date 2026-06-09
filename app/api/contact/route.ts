import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // The Google Apps Script Web App URL
    const SCRIPT_URL = process.env.GOOGLE_SCRIPT_URL || "https://script.google.com/macros/s/AKfycbyrWLZxc99LoNnNC6V6byO3wMi20OfjZce_fsx0Qf-5tVILldNjCa-1ExvltUDA6w4tVA/exec";

    if (SCRIPT_URL !== "YOUR_GOOGLE_SCRIPT_WEB_APP_URL") {
      const response = await fetch(SCRIPT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to forward data to Google Sheets");
      }
    } else {
      console.warn("No Google Script URL provided. Data received:", data);
      // Simulating a successful submission for now
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }

    return NextResponse.json({ success: true, message: "Application submitted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error submitting form:", error);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}
