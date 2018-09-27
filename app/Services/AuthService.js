const InvalidAccessException = use('App/Exceptions/InvalidAccessException');
const ResourceNotExistException = use('App/Exceptions/InvalidResourceException');

class AuthService {
  verifyPermission(resource, user) {
    if (!resource) {
      throw new InvalidResourceException
    }

    if (resource.user_id !== user.id) {
      throw new InvalidAccessException
    }
  }
}

module.exports = new AuthService