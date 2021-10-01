import { React, useState } from 'react'
import { Launcher } from 'react-chat-window'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { chatt, updateService } from '../../../Redux/actions/serviceactions'
const Chat1 = (props) => {
    const Upload = (file) => {
        const data = new FormData();
        data.append("file", file[0])
        data.append("upload_preset", "upload")
        data.append("cloud_name", "drjuymvy4")
        console.log(file[0], "file")
        fetch("https://api.cloudinary.com/v1_1/drjuymvy4/image/upload", {
            method: "post",
            body: data
        })
            .then(resp => resp.json())
            .then(data => {
                console.log(data.url, "nnnnnnnnnnnnnnnnnnnnn")
                dispatch(updateService(ser[0]?._id, user, {
                    ...ser[0], chat: [...ser[0]?.chat, {
                        author: user.name,
                        type: 'text',
                        data: {
                            text: data.url
                        }
                    }]
                }))

            })
            .catch(err => console.log(err))
    }

    const dispatch = useDispatch()
    const user = useSelector(state => state.userReducer.user);
    const service = useSelector(state => state.serviceReducer.service)
    const serv = useSelector(state => state.serviceReducer?.chat)
    var ser = service?.filter((el) => el._id === serv.chat._id)
    if (ser === undefined) {
        ser = [{
            author: user.name,
            type: 'text',
            data: {
                text: 'hi'
            }
        }]
    }

    return (
        <div className="cha" >
            <Launcher
                agentProfile={{
                    teamName: user.Role === "technician" ? ser[0]?.ClientId?.name : ser[0]?.TechnicientId?.name,
                    imageUrl: 'https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png'
                }}

                messageList={ser[0]?.chat?.map((el) => el.author === user.name ? { ...el, author: "me" } : el) || [{
                    author: user.name,
                    type: 'text',
                    data: {
                        text: 'hi'
                    }
                }]}
                isOpen={serv.show}
                handleClick={() => dispatch(chatt(!serv.show, serv.chat))}
                showEmoji
                onMessageWasSent={(message) => { dispatch(updateService(ser[0]?._id, user, { ...ser[0], chat: [...ser[0]?.chat, { ...message, author: user.name }] })) }}
                onFilesSelected={(fileList) => Upload(fileList)}
            />
        </div>
    )

}

export default Chat1
