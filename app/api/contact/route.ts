import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { checkRateLimit } from "@/lib/rate-limit";

export async function POST(req: Request) {
  try {
    console.log("Request received for contact form.");

    const ownerEmail = "2k23.cs2312635@gmail.com";

    // 0. Rate Limiting
    const ip = req.headers.get("x-forwarded-for") || "anonymous";
    const rateLimit = await checkRateLimit(ip);

    if (!rateLimit.allowed) {
      return NextResponse.json(
        { error: rateLimit.error },
        { status: 429 }
      );
    }

    const body = await req.json();
    const { name, email, message, honeypot } = body;

    // 1. Basic SPAM Protection (Honeypot)
    if (honeypot) {
      console.log("Honeypot triggered. Ignoring submission.");
      return NextResponse.json(
        { success: true, message: "Message sent successfully" },
        { status: 200 }
      );
    }

    // 2. Validate Required Fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: "Name, email, and message are required fields." },
        { status: 400 }
      );
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: "Invalid email address format." },
        { status: 400 }
      );
    }

    // 3. Environment Variables Check
    console.log("EMAIL_USER exists:", !!process.env.EMAIL_USER);
    console.log("EMAIL_PASS exists:", !!process.env.EMAIL_PASS);

    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      return NextResponse.json(
        {
          success: false,
          error: "Server configuration error: Missing email credentials"
        },
        { status: 500 }
      );
    }

    const emailUser = process.env.EMAIL_USER;
    const emailPass = process.env.EMAIL_PASS;

    // 4. Configure Nodemailer Transporter
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: emailUser,
        pass: emailPass,
      },
    });

    // 5. Email TO YOU (The Portfolio Owner)
    const mailToOwner = {
      from: `"Portfolio Contact Form" <${emailUser}>`,
      to: ownerEmail,
      replyTo: email,
      subject: `Portfolio Contact - ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; padding: 20px; border: 1px solid #eaeaea; border-radius: 8px;">
          <h2 style="color: #333; margin-top: 0;">New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #eaeaea;">
            <p style="color: #555; margin-bottom: 5px;"><strong>Message:</strong></p>
            <p style="white-space: pre-wrap; color: #333; background: #fafafa; padding: 15px; border-radius: 6px;">${message}</p>
          </div>
        </div>
      `,
    };

    // 6. Auto-Reply TO THE USER
    const autoReplyToUser = {
      from: `"Adarsh Sachan" <${emailUser}>`,
      to: email,
      subject: `Thanks for reaching out!`,
      text: `Hi ${name},\n\nThanks for contacting me! I've received your message and will get back to you as soon as possible.\n\nBest regards,\nAdarsh Sachan`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; padding: 20px; border: 1px solid #eaeaea; border-radius: 8px;">
          <h2 style="color: #333; margin-top: 0;">Message Received!</h2>
          <p>Hi ${name},</p>
          <p>Thanks for reaching out! I've received your message through my portfolio and will get back to you as soon as possible.</p>
          <hr style="border: none; border-top: 1px solid #eaeaea; margin: 20px 0;" />
          <p style="color: #888; font-size: 14px;">This is an automated response. You don't need to reply to this email.</p>
          <p>Best regards,<br/><strong>Adarsh Sachan</strong></p>
        </div>
      `,
    };

    // 7. Send Emails
    console.log("Before sending email...");
    try {
      await Promise.all([
        transporter.sendMail(mailToOwner),
        transporter.sendMail(autoReplyToUser),
      ]);
      console.log("Email successfully sent.");
      return NextResponse.json(
        { success: true, message: "Message sent successfully" },
        { status: 200 }
      );
    } catch (error) {
      console.error("MAIL ERROR:", error);
      return NextResponse.json(
        { success: false, error: "Email failed to send" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error processing contact form:", error);
    return NextResponse.json(
      { success: false, error: "Failed to send message. Please try again later." },
      { status: 500 }
    );
  }
}
