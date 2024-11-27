import sql from './db.js';

//sql`DROP TABLE IF EXISTS videos;`.then(()=>{

 // console.log("tabela excluída")})


sql`
  CREATE TABLE IF NOT EXISTS videos (
    id UUID PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    duration INTEGER
);
`
  .then(() => {
    console.log("Tabela 'videos' criada com sucesso!");
  })
  .catch((err) => {
    console.error("Erro ao criar a tabela:", err);
  });