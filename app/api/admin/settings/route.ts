import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const settings = await prisma.settings.findFirst()
    return NextResponse.json({ success: true, data: settings })
  } catch (error) {
    console.error("Error fetching settings:", error)
    return NextResponse.json(
      { success: false, error: "Erreur lors de la récupération des paramètres" },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json()
    
    // Convertir l'objet paymentMethods en string JSON
    const updatedData = {
      ...data,
      paymentMethods: JSON.stringify(data.paymentMethods)
    }

    const settings = await prisma.settings.upsert({
      where: { id: "1" },
      update: updatedData,
      create: {
        id: "1",
        ...updatedData
      }
    })
    return NextResponse.json({ success: true, data: settings })
  } catch (error) {
    console.error("Error saving settings:", error)
    return NextResponse.json(
      { success: false, error: "Erreur lors de la sauvegarde des paramètres" },
      { status: 500 }
    )
  }
}