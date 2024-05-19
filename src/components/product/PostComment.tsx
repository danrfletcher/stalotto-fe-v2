import { useEffect, useState } from 'react';

export const PostComment = ({ buttonType, nestingLevel }) => {
    //State variables
    const [input, setInput] = useState('');
    const [formFocus, setFormFocus] = useState(false);
    const [valid, setValid] = useState(false);

    //Form validation regex
    const regex = /^[\S]{1}/i;

    //Update state when form is/is not in focus
    const handleFocus = () => {
        setFormFocus(true);
    };
    const handleBlur = () => {
        if (input === '') {
            setValid(false);
            setFormFocus(false);
        }
    };

    //Update state when form is valid/invalid
    useEffect(() => {
        if (regex.test(input)) {
            setValid(true);
        }
        if (input === '') setValid(false);
    }, [input]);

    const updateInput = (event) => {
        setInput(event.target.value);
        if (!valid) setValid(true);
    };

    const handlePostComment = (event) => {
        event.preventDefault();
        //if (Object.keys(user).length === 0) {
        //     navigate('../../login')
        //} else {
        //     setComments((prev) => [{
        //         author: user.username,
        //         body: input,
        //         votes: 0
        //     }, ...prev])
        setFormFocus(false);
        //     postComment(article.article_id, input, user.username, user.accessToken)
        // }
        setInput('');
    };

    const handleCancel = () => {
        if (buttonType === 'fixed') {
            setInput('');
            setFormFocus(false);
        } else {
        }
    };

    return (
        <li className="post_comment">
            <div className="user_info">
                <div className="nesting_container">
                    {nestingLevel > 0 ? (
                        <div
                            className="nested_comment_divider"
                            style={{ marginRight: `${nestingLevel * 50}px` }}
                        />
                    ) : null}
                    <img src="src" alt="user-img" />
                </div>
                <form className="form_wrap" onFocus={handleFocus}>
                    <input
                        className="comment_input"
                        type="text"
                        id="comment"
                        onChange={updateInput}
                        required
                        value={input}
                        pattern={regex.toString()}
                        onBlur={handleBlur}
                    />
                    <label
                        className={`form_label${input === '' ? '' : ' with_input'}`}
                        htmlFor="comment"
                    >
                        Add a comment...
                    </label>
                    {formFocus ? (
                        <div className="comment_controls">
                            {valid ? (
                                <button
                                    className="tabs_item comment_button"
                                    onClick={handlePostComment}
                                >
                                    Comment
                                </button>
                            ) : null}
                            <button
                                className="tabs_item cancel_button"
                                onClick={handleCancel}
                            >
                                Cancel
                            </button>
                        </div>
                    ) : null}
                </form>
            </div>
        </li>
    );
};
