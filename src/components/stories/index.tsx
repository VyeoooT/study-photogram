import images from "@/assets/images"

function Stories() {
    return (
        <div className="flex justify-between">
            <img 
                className="size-20 border-4 border-slate-800 rounded-full object-cover"
                src={images.img1}
                alt={images.img1}
            />
            <img 
                className="size-20 border-4 border-slate-800 rounded-full object-cover"
                src={images.img2}
                alt={images.img2}
            />
            <img 
                className="size-20 border-4 border-slate-800 rounded-full object-cover"
                src={images.img3}
                alt={images.img3}
            />
            <img 
                className="size-20 border-4 border-slate-800 rounded-full object-cover"
                src={images.img4}
                alt={images.img4}
            />
            <img 
                className="size-20 border-4 border-slate-800 rounded-full object-cover"
                src={images.img5}
                alt={images.img5}
            />
            <img 
                className="size-20 border-4 border-slate-800 rounded-full object-cover"
                src={images.img6}
                alt={images.img6}
            />
            <img 
                className="size-20 border-4 border-slate-800 rounded-full object-cover"
                src={images.img7}
                alt={images.img7}
            />
        </div>
    )
}

export default Stories
