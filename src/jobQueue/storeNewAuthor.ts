import queue from 'bull'
import { redisClient } from '../redis'
import { storeAuthor } from './backgroundJob/storeAuthor'

export interface newAuthor {
    userId : string,
    boardId: string
}

export class storeNewAuthor {

    static storeAuthorQueue : queue.Queue<any>

    constructor (){}

    public getJobQueue (){
        if(!storeNewAuthor.storeAuthorQueue){
            const uri = new redisClient().getUrl() || 'redis://127.0.0.1:6379';
            storeNewAuthor.storeAuthorQueue = new queue('store-new-author',uri)
            storeNewAuthor.storeAuthorQueue.process(async(job,done)=>{
                const {userId,boardId} = job.data
                await storeAuthor(userId,boardId)
                done();
            })
        }
        return storeNewAuthor.storeAuthorQueue;
    }

    public addJob(author : newAuthor){
        storeNewAuthor.storeAuthorQueue.add(author)
    }
}