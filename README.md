# Convert JSON into SQL

Simple Node script that takes in JSON from a `.json` file and converts them into `INSERT INTO...` SQL queries, outputting the result into a specified `.sql` file.

__Features:__

* Run `node convert.js <jsonfile.json> <converted.sql>` to use -- ensure you've created an empty `converted.sql` file
* Escapes `'` characters in output SQL by replacing with double `''`

Note: This is not a general purpose script. It's merely a template that you'll have to modify code in order to adapt to different use cases.
