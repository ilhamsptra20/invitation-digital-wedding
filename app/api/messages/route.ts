import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
try {
    const { name, message } = await req.json();
    if (!name || !message)
    return NextResponse.json({ success: false, message: "Nama & Pesan wajib diisi" });

    const { error } = await supabase
    .from("messages")
    .insert([{ name, message }]);

    if (error) throw error;

    return NextResponse.json({ success: true, message: "Ucapan tersimpan!" });
} catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, message: "Terjadi kesalahan server." });
}
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const offset = parseInt(searchParams.get("offset") || "0");

  const { data, error } = await supabase
    .from("messages")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(10);

  if (error) {
    console.error("Error fetching messages:", error);
    return NextResponse.json([]);
  }

  return NextResponse.json(data);
}



