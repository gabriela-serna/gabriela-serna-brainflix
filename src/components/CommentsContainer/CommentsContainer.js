import Comment from "../Comment/Comment";
import "./CommentsContainer.scss";
import avatar from "../../assets/Images/Mohan-muruge.jpg";
import addComment from "../../assets/Icons/add_comment.svg";
import axios from "axios";
import { useEffect, useState } from "react";

function CommentsContainer({ videoSelectedId, baseUrl, ApiKey }) {
    // const commentCount = videoInfo[videoIndex].comments.length;
    const [video, setVideo] = useState(null);
    useEffect(() => {
        if (videoSelectedId === null) {
            return;
        }
        axios
            .get(`${baseUrl}/videos/${videoSelectedId}${ApiKey}`)
            .then((response) => {
                setVideo(response.data.comments);
            });
    }, [videoSelectedId]);
    console.log(video);

    if (video === null) {
        return <div>Loading!!</div>;
    }

    const {comment, name, timestamp} = video;

    console.log(video[0].timestamp);


    return (
        <div className="commentsContainer">
            <p className="commentsContainer__count">Comments</p>
            <div className="commentsContainer__details">
                <img
                    className="commentsContainer__avatar"
                    src={avatar}
                    alt="Side photo of a fan"
                ></img>
                <form className="commentsContainer__form">
                    <div className="commentsContainer__formInput">
                        <label className="commentsContainer__title" htmlFor="comment">
                            JOIN THE CONVERSATION
                        </label>
                        <input
                            required
                            type="text"
                            className="commentsContainer__newComment"
                            id="newComment"
                            name="comment"
                            placeholder="Add a new comment"
                        ></input>
                    </div>
                    <button className="commentsContainer__button">
                        <img src={addComment}></img>
                        <span className="commentsContainer__button-text">COMMENT</span>
                    </button>
                </form>
            </div>
            {video.map((userComment) => (
                <Comment
                    className="commentsContainer__comment"
                    key={userComment.id}
                    userComment={userComment}

                />
            ))}
        </div>
    );
}

export default CommentsContainer;
