import { FastifyInstance, HookHandlerDoneFunction } from 'fastify';
import fp from 'fastify-plugin';
import sqlite3 from 'sqlite3';

// plugin options
export interface SqlitePluginOptions {
  filename: string;
  tablename: string;
}

// extend fastify interface
declare module 'fastify' {
  interface FastifyInstance {
    sqlite: sqlite3.Database;
  }
}

// eslint-disable-next-line max-len
function sqlitePlugin(fastify: FastifyInstance, options: SqlitePluginOptions, done: HookHandlerDoneFunction) {
  // create a new SQLite database connection
  if (!fastify.sqlite) {
    const db = new sqlite3.Database(options.filename);
    fastify.decorate('sqlite', db);

    // create the new table if it doesn't exist
    fastify.addHook('onReady', () => {
      db.run(`CREATE TABLE IF NOT EXISTS ${options.tablename} (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        original_url TEXT NOT NULL,
        slug TEXT NOT NULL UNIQUE
      )`);
    });

    // Close the database connection when the plugin is done
    fastify.addHook('onClose', () => {
      if (fastify.sqlite === db) {
        db.close((err) => {
          if (err) {
            fastify.log.error(err);
          }
        });
      }
    });
  }

  done();
}

export default fp(sqlitePlugin, { name: 'fastify-sqlite' });
