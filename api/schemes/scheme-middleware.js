const Scheme = require('./scheme-model')

async function checkSchemeId(req, res, next) {
  try {
    const existingScheme = await Scheme.findById(req.params)
    if (!existingScheme) {
      next({ status: 404, message: `scheme with scheme_id ${req.params} not found`})
    } else {
      next()
    }
  } catch (err) {
    next(err)
  }
}

/*
  If `scheme_name` is missing, empty string or not a string:

  status 400
  {
    "message": "invalid scheme_name"
  }
*/
function validateScheme(req, res, next) {
  const { scheme_name } = req.body

  if (!scheme_name || scheme_name === '' || typeof scheme_name !== 'string') {
    next({ status: 400, message: "invalid scheme_name"})
  } else {
    next()
  }
}

/*
  If `instructions` is missing, empty string or not a string, or
  if `step_number` is not a number or is smaller than one:

  status 400
  {
    "message": "invalid step"
  }
*/
function validateStep(req, res, next) {
  const { instructions, step_number } = req.body

  if (!instructions || instructions === '' || typeof instructions !== 'string' 
  || typeof step_number !== 'number' || step_number < 1) {
    next({ status: 400, message: "invalid step"})
  } else {
    next()
  }
}

module.exports = {
  checkSchemeId,
  validateScheme,
  validateStep,
}
