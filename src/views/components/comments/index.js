import React, { useEffect, useState } from "react";
import { CommentSection } from "react-comments-section";
import "react-comments-section/dist/index.css";
import AuthUser from "../../wasfaty/services/AuthService";
import "./style.scss";
import { PusherService, TaskService } from "../../wasfaty/services";
import sortBy from "lodash/sortBy";
import uniqBy from "lodash/uniqBy";

const CommentsComponent = ({ id, comments }) => {
  const [data, setData] = useState(() => comments);
  //   const data = [
  // {
  //   userId: "02b",
  //   comId: "017",
  //   fullName: "Lily",
  //   text: "I think you have a point🤔",
  //   avatarUrl: "https://ui-avatars.com/api/name=Lily&background=random",
  //   replies: [],
  // },
  //   ];

  useEffect(() => {
    const listner = PusherService.subscribe(id, (res) => {
      setData((old) =>
        sortBy(
          uniqBy([...old, res], (coment) => coment.comId),
          (dateObj) => new Date(dateObj.created_at)
        )
      );
    });

    return () => {
      listner.unsubscribe();
    };
  }, []);

  const sendMessage = (data) => {
    data.task_id = id;
    TaskService.sendComment(data);
  };

  const deleteMessage = (data) => {
    TaskService.deleteComment(data);
  };

  const updateComment = (data) => {
    TaskService.updateComment(data);
  };

  return (
    <CommentSection
      currentUser={{
        currentUserId: AuthUser.user._id,
        currentUserImg: `https://ui-avatars.com/api/name=${AuthUser.user.name}`,
        // currentUserProfile: "https://www.linkedin.com/in/riya-negi-8879631a9/",
        currentUserFullName: AuthUser.user.name,
      }}
      commentData={data.map((com) => {
        com.avatarUrl = "https://ui-avatars.com/api/name=" + com.fullName;
        return com;
      })}
      onSubmitAction={(data) => sendMessage(data)}
      currentData={(data) => {
        console.log("curent data", data);
      }}
      submitBtnStyle={{
        fontSize: 12,
      }}
      removeEmoji={true}
      titleStyle={{ fontSize: 14 }}
      hrStyle={{ color: "#07bc0c" }}
      onDeleteAction={deleteMessage}
      onEditAction={updateComment}
    />
  );
};

export default CommentsComponent;
