import "../App.css";
import { psContent } from "../data/gifts";

export default function PsScreen({ onDone }) {
    return (
        <div className="screen ps-screen">
            <div className="glass ps-glass">
                <div className="ps-gallery">
                    {psContent.images.map((src, index) => (
                        <div
                            key={src}
                            className="image-container ps-gallery-item"
                        >
                            <img src={src} alt={`${psContent.title} ${index + 1}`} />
                        </div>
                    ))}
                </div>

                <div className="opened-content">
                    <h2>{psContent.title}</h2>
                    <p>{psContent.description}</p>
                </div>

                <button onClick={onDone}>
                    Поздравляю! ❤️
                </button>
            </div>
        </div>
    );
}
