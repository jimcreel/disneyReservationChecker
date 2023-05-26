export default function Marquee ({resort}) { 
    return (
        <div >
            <div className="flex flex-wrap justify-center">
                <img className='h-[200px]' src = {resort === 'DLR' ? 
                'https://heroku-magic-res.s3.us-west-1.amazonaws.com/magicRes/Disneyland.webp' : 
                'https://heroku-magic-res.s3.us-west-1.amazonaws.com/magicRes/DisneyWorld.png'} />
            </div>
        </div>
    )
}