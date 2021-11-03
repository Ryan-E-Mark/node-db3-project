const db = require('../../data/db-config')

async function find() { // EXERCISE A
  const result = await db('schemes as sc')
    .leftJoin('steps as s', 'sc.scheme_id', 's.scheme_id')
    .select('sc.scheme_id', 'sc.scheme_name', 's.step_id as number_of_steps')
    .count('s.step_id as number_of_steps')
    .groupBy('sc.scheme_id')
    .orderBy('sc.scheme_id', 'asc')

  return result
}

async function findById(scheme_id) { // EXERCISE B
  const result = await db('schemes as sc')
    .leftJoin('steps as s', 'sc.scheme_id', 's.scheme_id')
    .select('sc.scheme_name', 's.step_id', 's.step_number', 'instructions', 'sc.scheme_id')
    .where('sc.scheme_id', scheme_id)
    .orderBy('s.step_number', 'asc')

  const data = { steps: [] };

  result.map(scheme => {
    data.scheme_id = scheme.scheme_id
    data.scheme_name = scheme.scheme_name
    if (scheme.step_id) {
      data.steps.push({
        step_id: scheme.step_id,
        step_number: scheme.step_number,
        instructions: scheme.instructions
      })
    }
  })
  return data
}

async function findSteps(scheme_id) { // EXERCISE C
  const result = await db('schemes as sc')
    .leftJoin('steps as s', 'sc.scheme_id', 's.scheme_id')
    .select('s.step_id', 's.step_number', 'instructions', 'sc.scheme_name')
    .where('sc.scheme_id', scheme_id)
    .orderBy('s.step_number')
  return result

  /*
    1C- Build a query in Knex that returns the following data.
    The steps should be sorted by step_number, and the array
    should be empty if there are no steps for the scheme:

      [
        {
          "step_id": 5,
          "step_number": 1,
          "instructions": "collect all the sheep in Scotland",
          "scheme_name": "Get Rich Quick"
        },
        {
          "step_id": 4,
          "step_number": 2,
          "instructions": "profit",
          "scheme_name": "Get Rich Quick"
        }
      ]
  */
}

async function add(scheme) { // EXERCISE D
  const result = await db('schemes')
    .insert(scheme)
  const newScheme = await db('schemes').where('scheme_id', result)
  return newScheme[0]

  /*
    1D- This function creates a new scheme and resolves to _the newly created scheme_.
  */
}

function addStep(scheme_id, step) { // EXERCISE E
  /*
    1E- This function adds a step to the scheme with the given `scheme_id`
    and resolves to _all the steps_ belonging to the given `scheme_id`,
    including the newly created one.
  */
}

module.exports = {
  find,
  findById,
  findSteps,
  add,
  addStep,
}
