import { format , formatDistanceToNow} from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import styles from './post.module.css';

import { Comment } from './Comment';

import { Avatar } from './Avatar';

import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react';

interface Author{
    name:string;
    role:string;
    avatarUrl:string;
}

interface Content{
    type: 'paragraph'| 'link';
    content:string;
}

interface PostProps{
    author:Author;
    publishedAt:Date;
    content:Content[];
    dateFormat: string
}

export function Post({author , publishedAt , content}:PostProps)
{
    const [comments , setComments] = useState([
        "Post bem feito , parabéns !"
    ])

    const [newCommentText , setNewCommentText] = useState('')

    const dateFormat = format(publishedAt , "d 'de' LLLL 'às' HH:mm'h'", {locale:ptBR,})

    const dateFormatRelativeNow = formatDistanceToNow(publishedAt ,{
        locale:ptBR, 
        addSuffix:true,
    })

    function handleCreateNewComment(event:FormEvent){
        event.preventDefault()


        setComments([...comments , newCommentText]);
        setNewCommentText('');

    }

    function handleNewCommentChange(event: ChangeEvent <HTMLTextAreaElement>){
        event.target.setCustomValidity('')
        setNewCommentText(event.target.value)
    }

    function handleNewCommentInvalid(event :InvalidEvent <HTMLTextAreaElement>){
        event.target.setCustomValidity('Esse campo é obrigatório!')
    }
    

    function deleteComment(commentToDelete: string) {
        const commentsWithoutDeleteOne = comments.filter(comments =>{
            return comments !== commentToDelete;
        })
        setComments(commentsWithoutDeleteOne);
    }
    const isNewCommentEmpty = newCommentText.length === 0;

    return (
        <article className= {styles.post} >
            <header>
                <div className={styles.author}>
                    <Avatar src={author.avatarUrl}/>
                        <div className={styles.authorInfo}>
                            <strong>{author.name}</strong>
                            <span>{author.role}</span> 
                        </div>
                </div>    

              <time title={publishedAt.toString(dateFormat)} dateTime={publishedAt.toISOString()} >
                {dateFormatRelativeNow}
                </time>             
                
            </header>

            <div className={styles.content}>
                {content.map(line => {
                    if (line.type === 'paragraph')
                    {
                        return <p key={line.content}>{line.content}</p>;
                    } else if (line.type ==='line')
                    {
                        return <p key={line.content}><a>{line.content}</a></p>
                    };
                  }
                 )
                }
            </div>

            <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
                <strong>Deixe seu comentário</strong>

                <textarea name='comment' placeholder='Escreva seu comentário...'
                onChange={handleNewCommentChange}
                value={newCommentText}
                onInvalid={handleNewCommentInvalid}
                required
                />

                <footer>
                    <button type='submit' disabled={isNewCommentEmpty}>Comentar</button>
                </footer>
            </form>

            <div className={styles.commentList}>
                {comments.map(comment =>{
                    return <Comment 
                    key={comment}
                    content={comment}
                    onDeleteComment={deleteComment}
                    />
                })}
            </div>
            
        </article>
    )
}
