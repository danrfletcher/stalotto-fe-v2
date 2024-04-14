import { useState } from "react";
import { PostComment } from "./PostComment";

const CompetitionComments = (props) => {
    const [postCommentReply, setPostCommentReply] = useState(false);
    const { username, comment, replies, userProfileImg, nestingLevel } = props;

    return (
        <>
            <li>
                <div className="user_info">
                    <div className="nesting_container">
                        {nestingLevel > 0 ? <div className="nested_comment_divider" style={{ marginRight: `${nestingLevel * 50}px` }} /> : null}
                        <img src={userProfileImg} alt="user-img" />
                    </div>
                    <div>
                        <h4>{username}</h4>
                        <p className="user_review">{comment}</p>
                       <div className="user_ratings">
                            <span className="date">posted_on_date</span>
                            <button onClick={() => setPostCommentReply(!postCommentReply)}>
                                <span className="date"><strong>Reply</strong></span>
                            </button>
                            <span className="rating_star">likes_here</span>
                        </div>
                    </div>
                </div>
                    <ul className="nested_comments">
                        {postCommentReply ? (
                            <PostComment buttonType="canHide" nestingLevel={nestingLevel + 1} />
                        ) : null}
                        {replies && replies.length > 0 ? (
                            replies.map(reply => (
                                <CompetitionComments key={reply.commentId} {...reply} nestingLevel={nestingLevel + 1} />
                            ))
                        ) : null}
                    </ul>
            </li>
        </>
    );
};

export default CompetitionComments;