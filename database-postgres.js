import { randomUUID } from "node:crypto"

import sql from './db.js';

export class databasePostgres {


    async list(search) {
        let videos;
    
        if (search) {
            videos = await sql`
                SELECT * 
                FROM videos 
                WHERE title ILIKE ${'%' + search + '%'}
            `;
        } else {
            videos = await sql`
                SELECT * 
                FROM videos
            `;
        }
    
        return videos;
    }

   async create(video) {

        const videoId = randomUUID()

        const {title, description, duration} = video 

        await sql` insert into videos (id, title, description, duration) VALUES (${videoId},${title},${description},${duration})`
      
    }

    update = async (id, video) => {
        const { title, description, duration } = video;
    
        // Atualizar somente os campos que foram enviados
        await sql`
            UPDATE videos
            SET 
                title = COALESCE(${title}, title),
                description = COALESCE(${description}, description),
                duration = COALESCE(${duration}, duration)
            WHERE id = ${id}
        `;
    }

    delete = async (id) => {
        await sql`
            DELETE FROM videos
            WHERE id = ${id}
        `;
    };
    
}
