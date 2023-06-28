import { HandsClapping, ThumbsUp, Trash } from 'phosphor-react'
import styles from './Comment.module.css'
import { Avatar } from './Avatar'
import { useState } from 'react'

interface CommentPorps{
    content:string;
    onDeleteComment:(comment:string) => void;
}

export function Comment({content , onDeleteComment}:CommentPorps){
    const [likeCount , setLikeCount] = useState(0)


    function handleDeleteComment(){
        onDeleteComment(content)

    }

    function handleLikeComment(){
        setLikeCount((state)=>{
            return state + 1
        })
    }
    
    return(
        <div className={styles.comment}>
            <Avatar hasBorder={false} src="https://www.github.com/diego3g.png" />
           
            <div className={styles.commentBox}>
                
                <div className={styles.commentContent}>
                    <header>
                        <div className={styles.authorAndTime}>
                            <strong>Diego @Rocketseat</strong>
                            <time title="2 de junho às 14:02h" dateTime="" >Cerca de 1h atrás</time>                 
                        </div>
                        <button onClick={handleDeleteComment} title='Deletar comentário'>
                            <Trash size={24}/>
                        </button>
                    </header>

                    <p>{content}</p>
                </div>
                
                <footer>
                    <button onClick={handleLikeComment}>
                        <HandsClapping size={16}/>
                        Aplaudir <span>{likeCount}</span>
                    </button>
                </footer>
            
            </div>
        
        </div>
    )
}