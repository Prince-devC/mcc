import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const settings = await prisma.securitySettings.findFirst()
    return NextResponse.json({ success: true, data: settings })
  } catch (error) {
    console.error("Error fetching security settings:", error)
    return NextResponse.json(
      { success: false, error: "Erreur lors de la récupération des paramètres de sécurité" },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const settings = await prisma.securitySettings.upsert({
      where: { id: "1" },
      update: data,
      create: {
        id: "1",
        ...data
      }
    })
    return NextResponse.json({ success: true, data: settings })
  } catch (error) {
    console.error("Error saving security settings:", error)
    return NextResponse.json(
      { success: false, error: "Erreur lors de la sauvegarde des paramètres de sécurité" },
      { status: 500 }
    )
  }
} 