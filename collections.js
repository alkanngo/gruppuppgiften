import Database from './lib/db';
import Cat from './Classes/Cat';
import Dog from './Classes/Dog';
import Pokemon from './Classes/Pokemon';

// Setup the database
const db = new Database();
db.addCollection('cats', [
  new Cat('Missan', 'Black', 10),
  new Cat('Peter', 'Orange', 10),
  new Cat('Nisse', 'Green', 10),
]);
db.addCollection('dogs', [
  new Dog('Quinse', 'Black', 10),
  new Dog('Kira', 'Orange', 10),
  new Dog('Luke', 'Green', 10),
]);
db.addCollection('pokemons', [
  new Pokemon('Pikachu', 'Black', 10),
  new Pokemon('Bulbasour', 'Orange', 10),
  new Pokemon('Charizard', 'Green', 10),
]);

export default db;
