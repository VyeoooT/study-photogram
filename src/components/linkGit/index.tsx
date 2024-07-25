import { Github } from "lucide-react"
import { Tooltip } from 'react-tooltip'

function LinkGithub() {
    return (
        <>
            <div id="tooltip-element" className="fixed bottom-10 left-10 z-[41] size-14 flex justify-center items-center bg-black/50 shadow-gray-300/30 shadow-sm rounded-full animate-bounce">
                <a href="https://github.com/VyeoooT/study-photogram" target="_blank" rel="noopener noreferrer">
                    <Github size={40} color="#ffffff" />
                </a>
            </div>

            <Tooltip anchorSelect="#tooltip-element" place="top-start" variant="info">
                Link source code
            </Tooltip>
        </>
    )
}

export default LinkGithub
