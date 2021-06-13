export default {
  common: {
    validationError: {
      statusCode: 400,
      code: 100,
      message: 'fields_required'
    },
    notFound: {
      statusCode: 404,
      code: 101,
      message: 'item_not_found'
    },
    unauthorized: {
      statusCode: 401,
      code: 102,
      message: 'unauthorized'
    }
  },
   user: {
    alreadyExist:{
      statusCode: 400,
      code: 201,
      message: 'user_already_exist'
    }
   }
}