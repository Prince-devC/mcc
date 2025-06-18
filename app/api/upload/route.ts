import { NextResponse } from 'next/server'
import { writeFile, unlink, mkdir } from 'fs/promises'
import { join } from 'path'
import { v4 as uuidv4 } from 'uuid'
import { existsSync } from 'fs'
import fs from 'fs'

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const oldImageUrl = formData.get('oldImageUrl') as string

    if (!file) {
      return NextResponse.json(
        { error: 'Aucun fichier n\'a été fourni' },
        { status: 400 }
      )
    }

    console.log('Type de fichier:', file.type)
    console.log('Taille du fichier:', file.size)

    // Vérifier le type de fichier
    const fileType = file.type
    const isImage = fileType.startsWith('image/')
    const isVideo = fileType.startsWith('video/')

    if (!isImage && !isVideo) {
      return NextResponse.json(
        { error: 'Le fichier doit être une image ou une vidéo' },
        { status: 400 }
      )
    }

    // Supprimer l'ancienne image si elle existe
    if (oldImageUrl) {
      try {
        const oldImagePath = join(process.cwd(), 'public', oldImageUrl)
        if (fs.existsSync(oldImagePath)) {
          await unlink(oldImagePath)
        }
      } catch (error) {
        console.error('Erreur lors de la suppression de l\'ancienne image:', error)
        // On continue l'exécution même si la suppression échoue
      }
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Créer un nom de fichier unique
    const timestamp = Date.now()
    const originalName = file.name.replace(/[^a-zA-Z0-9.]/g, "")
    const fileName = `${timestamp}-${originalName}`

    // Déterminer le dossier de destination en fonction du type de fichier
    const uploadDir = isImage ? 'public/images' : 'public/videos'
    const fullUploadDir = join(process.cwd(), uploadDir)
    const path = join(fullUploadDir, fileName)

    // Créer le dossier s'il n'existe pas
    if (!existsSync(fullUploadDir)) {
      console.log('Création du dossier:', fullUploadDir)
      await mkdir(fullUploadDir, { recursive: true })
    }

    console.log('Écriture du fichier dans:', path)
    // Écrire le fichier
    await writeFile(path, buffer)
    console.log('Fichier écrit avec succès')

    // Retourner le chemin relatif du fichier
    const relativePath = isImage ? `/images/${fileName}` : `/videos/${fileName}`
    return NextResponse.json({ success: true, path: relativePath })
  } catch (error) {
    console.error('Erreur détaillée lors du téléchargement:', error)
    return NextResponse.json(
      { error: 'Erreur lors du téléchargement du fichier' },
      { status: 500 }
    )
  }
} 