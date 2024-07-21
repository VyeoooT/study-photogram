import { FileEntry } from '@/types'
import { FileUploaderRegular } from '@uploadcare/react-uploader'
import "@uploadcare/react-uploader/core.css"
import { OutputFileEntry } from '@uploadcare/react-uploader'
import { useState, useEffect, useCallback, useRef } from 'react'

interface IFileUploaderProps {
    fileEntry: FileEntry
    onChange: (fileEntry: FileEntry) => void
    preview: boolean
}

function FileUploader({fileEntry, onChange, preview}: IFileUploaderProps) {
    const [files, setFiles] = useState<OutputFileEntry<'success'>[]>([])
    // const ctxProviderRef = useRef<HTMLDivElement | null>(null)
    const ctxProviderRef = useRef<InstanceType<UploadCtxProvider>>(null)

    const handleChangeEvent = (items: { allEntries: any[] }) => {
        const newFiles = items.allEntries.filter((file: { status: string }) => file.status === 'success')
        setFiles(newFiles)
        onChange({ files: newFiles })
    }

    const handleRemoveClick = useCallback(
        (uuid: OutputFileEntry["uuid"]) => {
            const newFiles: any = fileEntry.files.filter((f) => f.uuid !== uuid)
            setFiles(newFiles)
            onChange({ files: newFiles })
        },
        [fileEntry.files, onChange]
    )

    useEffect(() => {
        const handleUploadEvent = (e: CustomEvent<OutputFileEntry[]>) => {
            if (e.detail) {
                console.log("The uploaded file event is: ", e)
                const uploadedFiles: any = [...e.detail]
                setFiles(uploadedFiles)
                onChange({ files: uploadedFiles })
            }
        }

        ctxProviderRef.current?.addEventListener("data-output", handleUploadEvent as EventListener)
        return () => {
            ctxProviderRef.current?.removeEventListener("data-output", handleUploadEvent as EventListener)
        }
    }, [setFiles, onChange])

    return (
        <div>
            <FileUploaderRegular
                pubkey="c22201d199b2c9210ca1"
                maxLocalFileSizeBytes={10000000}
                multipleMax={10}
                multiple={preview}
                imgOnly={true}
                sourceList="local, url, camera"
                confirmUpload={false}
                removeCopyright={true}
                classNameUploader="my-config uc-light"
                onChange={handleChangeEvent}
                apiRef={ctxProviderRef}
            />

            {preview ? 
                (<div className="grid grid-cols-2 gap-4 mt-8">
                    {files.map((file) => (
                        <div key={file.uuid} className="relative">
                            <img
                                key={file.uuid}
                                src={`${file.cdnUrl}/-/format/webp/-/quality/smart/-/stretch/fill/`}
                                alt={file.fileInfo?.originalFilename || ''}
                                title={file.fileInfo?.originalFilename || ''}
                            />
    
                            {/* close button */}
                            <div className="size-5 flex justify-center items-center absolute -right-1.5 -top-1.5 bg-white border-[1px] border-slate-800 cursor-pointer rounded-full">
                                <button
                                    type="button"
                                    className="text-slate-800 text-center"
                                    onClick={() => handleRemoveClick(file.uuid)}
                                >
                                    ×
                                </button>
                            </div>
                        </div>
                    ))}
                </div>)

                : <></>
            }
            
        </div>
    )
}

export default FileUploader
