const jsonfile = require('jsonfile');
const fs = require('fs');

/**
 * ===========================
 * Command line interface
 * ===========================
 */

// Extract command line arguments
console.log('process.argv:');
console.log(process.argv);
const action = process.argv[2];
const input = process.argv.splice(3);

// Map valid command line inputs to the correct functions
const actionMapper = {
  'convert': convert
};

// Execute
const output = actionMapper[action](input);
console.log(output);

/**
 * ===========================
 * Implementation
 * ===========================
 */
function convert(input) {
  const [jsonFilename, sqlFilename] = input;

  // exit if json or sql files are not specified
  if (!jsonFilename || !sqlFilename) return 'Error';

  // use jsonfile module to read json file
  jsonfile.readFile(jsonFilename, (err, data) => {
    if (err) return console.error(err);

    const pokemons = data.pokemon;
    const sqlArray = [];
    const fields = ['name', 'num', 'img', 'weight', 'height'];

    for (let i = 0; i < pokemons.length; i++) {
      const pkm = pokemons[i];

      // map pokemon data from object into array
      const values = fields.map((field) => {
        let value = pkm[field];

        if (typeof field === 'string') {
          value = value.replace(/'/i, "''");
        }
        return `'${value}'`;
      });

      // construct single SQL query
      const formattedSql = `
INSERT INTO pokemons
(name, num, img, weight, height)
VALUES
(${values})`;

      // add constructed SQL query into an accumulating array
      sqlArray.push(formattedSql);
    }

    // convert array of SQL queries into a single string separated by `;`
    const combinedSql = sqlArray.join(`;
    `) + ';';

    console.log('Converted! Output SQL file looks like this:');
    console.log(combinedSql);

    // use fs module to write text file
    fs.writeFile(sqlFilename, combinedSql, (err2) => {
      if (err2) return console.error(err2);

      console.log('Done.');
    });
  });
}
