import React from "react"
import videoBg from "../assets/flower_bg.mp4"
import MicVisualizer from "./audio"

const Main = () => {
    return (
        <div className = 'main'>
            <video src = {videoBg} autoPlay loop muted />
            <div className = 'content'>
                <h1>Welcome</h1>
                <p>To My Radio</p>
                <MicVisualizer />
            </div>
        </div>
    )

}

export default Main