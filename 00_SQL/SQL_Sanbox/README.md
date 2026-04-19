# SQL Sandbox => SQL Posgres with Javascript: Employee Tracker

## 🤔 Expectations:
* ✅ Build an **Employer Tracker App** with **Javascript**
* ✅ Properly have a database running.
* ✅ Ability to CREATE, READ, UPDATE, DELETE (see examples below)
	
	
	* ➕ Create (add)
	```
	</> SQL
	INSERT INTO bugs (title, status)
	VALUES ('Login broken', 'open');
	```
	* 🔍 Read (query)
	```
	</> SQL
	SELECT * FROM bugs;
	```

	* 🖊️ Update (modify)

	```
	</> SQL
	UPDATE bugs
	SET status = 'closed'
	WHERE id = 1
	```

	* 🗑️ Delete (remove)
	```
	</> SQL
	DELETE FROM bugs
	WHERE id = 1;
	```

	* 🧠 BONUS ADDITION: Define structure (DDL)
		* CREATE TABLE
		* ALTER TABLE
		* DROP TABLE
		* *This is separate from CRUD. It's about building the database itself and not just utilizing it*
	* 🤪 **Simple mental model:**
	```
	Structure => CREATE TABLE (schema.sql)

	Data =>
	INSERT (create)
	SELECT (read)
	UPDATE (modify)
	DELETE (remove)
	```

* ✅ Must have schema and seeds.
	* When we build the app:
		* schema.sql => handles the structure
		* queries/whateverName.js => handles CRUD
---
### 💼 SQL Expectations:
* 👉 db/schema.sql folder should **define the structure of your database**
	* Tables
	* Columns
	* Primary Keys
	* Foreign Keys
	* Constraints

	#### 📝 Example db/schema.sql:
	```
	</> SQL
	DROP TABLE IF EXISTS bugs;

	CREATE TABLE bugs (
		id SERIAL PRIMARY KEY,
		title TEXT NOT NULL,
		description TEXT
		status TEXT NOT NULL DEFAULT 'open',
		priority text not null default 'medium',
		created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
	);
	```
	---
	#### 📝 Example queries/bugs.js
	```
	</> Javascript
	const pool = require('../db');

	async function viewBugs() {
		const res = await pool.query('SELECT * FROM bugs IRDER BY id');
		console.table(res.rows);
	}

	async function addBug(title, description, status = 'open', priority = 'medium') {
		`
		INSERT INTO bugs (title, description, status, priority)
		VALUES ($1, $2, $3, $4)
		RETURNING *
		`,
		[title, description, status, priority]
	}

	return res. rows[0];

	module.exports = {
		viewBugs,
		addBug,
	};
	```

	---
	* ☠️ Clean rule to remember (minimum):
		* schema.sql = build database
		* seeds.sql = fill it with starter data
		* queries/bugs.js = let your app read/write data
* ☑️ For the SQL part, you must have at least:
	* a db folder
	* schema.sql
	* seeds.sql