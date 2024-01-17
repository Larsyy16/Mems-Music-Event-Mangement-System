'use client'

import { Dispatch, SetStateAction, useState } from "react"

type FileUploadProps = {
    imageUrl: string
    onFieldChange: (value: string) => void
    setFiles: Dispatch<SetStateAction<File[]>>
}


export default function FileUploader() {
    const [file, setFile] = useState<File | null>(null)
    const [uploading, setUploading] = useState(false)

  }