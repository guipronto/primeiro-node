import { fastify } from 'fastify';

import { databaseMemory } from './database-memory.js';

import { databasePostgres } from './database-postgres.js';

const server = fastify();
const database = new databasePostgres();

server.post("/videos", async (request, reply) => {
    const { title, description, duration } = request.body;

    console.log("Dados recebidos no corpo da requisição:", { title, description, duration });

    const video = { title, description, duration };

    await database.create(video); 

    return reply.status(201).send({ message: "Vídeo criado com sucesso!" });
});

server.get("/videos", async (request, reply) => {
    const search = request.query.search;

    console.log(search);

    const videos = await database.list(search); 
    return reply.status(200).send(videos);
});

server.put("/videos/:id", async (request, reply) => {
    const videoId = request.params.id;

    const { title, description, duration } = request.body;

    await database.update(videoId, { 
        title,
        description,
        duration
    });

    return reply.status(204).send();
});

server.delete("/videos/:id", async (request, reply) => {
    const videoId = request.params.id;

    await database.delete(videoId);

    return reply.status(204).send();
});

server.listen({
    host : "0.0.0.0",
    port: process.env.PORT ?? 3333
});

console.log('http://localhost:3333/');
